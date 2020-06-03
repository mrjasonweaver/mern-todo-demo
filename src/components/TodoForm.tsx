import * as React from 'react';
import { useEffect } from 'react';
import { useInput } from '~/hooks/inputHook';
import { postTodo, updateTodo } from '~/services/todos.service';
import { Todo } from '~/models/todo.model';

export const TodoForm = ({submit, isSubmitted, isEdit, currentEditTodo}) => {
  const {
    value:Name,
    bind:bindName,
    reset:resetName
  } = useInput(currentEditTodo ? currentEditTodo.name : '');
  const {
    value:Description,
    bind:bindDescription,
    reset:resetDescription
  } = useInput(currentEditTodo ? currentEditTodo.description : '');
  const {
    value:DueDate,
    bind:bindDueDate,
    reset:resetDueDate
  } = useInput(currentEditTodo ? currentEditTodo.target_completion_date.split('T')[0] : '');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit(true);
  }

  useEffect(() => {
    if (isSubmitted) {
      const postData: Todo = {
        name: Name,
        description: Description,
        target_completion_date: DueDate
      };
      if (isEdit) {
        if (currentEditTodo?._id) {    
          updateTodo(currentEditTodo._id, postData)
            .then(data => {
              console.log(data, currentEditTodo);
            }, error => {
              console.error(error);
            });
        }
      } else {
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