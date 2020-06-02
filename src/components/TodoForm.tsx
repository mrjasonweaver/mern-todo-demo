import * as React from 'react';
import { useInput } from '~/hooks/inputHook';

export const TodoForm = () => {
  const { value:Name, bind:bindName, reset:resetName } = useInput('');
  const { value:Description, bind:bindDescription, reset:resetDescription } = useInput('');
  const { value:DueDate, bind:bindDueDate, reset:resetDueDate } = useInput('');

  const handleSubmit = evt => {
      evt.preventDefault();
      alert(`Submitting Todo ${Name} ${Description} ${DueDate}`);
      resetName();
      resetDescription();
      resetDueDate();
  }
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