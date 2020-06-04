import * as React from 'react';
import { useEffect } from 'react';
import { useInput } from '~/hooks/inputHook';
import { postTodo, updateTodo } from '~/services/todos.service';
import { Todo } from '~/models/todo.model';

// it's a form!
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
              return data;
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
    <form className="todo-form" onSubmit={handleSubmit}>
      <label>
        <span className="label-display">Name</span>
        <input type="text" placeholder="Order coffee filters" {...bindName} />
      </label>
      <label>
        <span className="label-display">Description</span>
        <input type="text" placeholder="Get 100 count" {...bindDescription} />
      </label>
      <label>
        <span className="label-display">Due date</span>
        <input type="date" {...bindDueDate} />
      </label>
      {
      Name
        ? <input type="submit" className="btn" value="Add" />
        : <input type="submit" disabled className="btn" value="Add" /> 
      }
    </form>
  );
}