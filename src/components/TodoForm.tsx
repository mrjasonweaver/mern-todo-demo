import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '~/hooks/inputHook';
import { postTodo } from '~/services/todos.service';
import { Todo } from '~/models/todo.model';

export const TodoForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { value:Name, bind:bindName, reset:resetName } = useInput('');
  const { value:Description, bind:bindDescription, reset:resetDescription } = useInput('');
  const { value:DueDate, bind:bindDueDate, reset:resetDueDate } = useInput('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true);
    evt.preventDefault();
  }

  useEffect(() => {
    if (isSubmitted) {
      const postData: Todo = {
        name: Name,
        description: Description,
        target_completion_date: DueDate
      };
      postTodo(postData)
        .then(() => {
          resetName();
          resetDescription();
          resetDueDate();
        }, error => {
          console.error(error);
          resetName();
          resetDescription();
          resetDueDate();
        });
    }
}, [isSubmitted]);


  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span className="hide-display">Name:</span>
        <input type="text" placeholder="Name" {...bindName} />
      </label>
      <label>
        <span className="hide-display">Description:</span>
        <input type="text" placeholder="Description" {...bindDescription} />
      </label>
      <label>
        <span className="hide-display">Due date:</span>
        <input type="date" placeholder="Due date" {...bindDueDate} />
      </label>    
      <input type="submit" value="Submit" />
    </form>
  );
}