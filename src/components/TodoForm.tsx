import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInput } from '~/hooks/inputHook';

export const TodoForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { value:Name, bind:bindName, reset:resetName } = useInput('');
  const { value:Description, bind:bindDescription, reset:resetDescription } = useInput('');
  const { value:DueDate, bind:bindDueDate, reset:resetDueDate } = useInput('');

  const handleSubmit = evt => {
    setIsSubmitted(true);
    evt.preventDefault();
  }

  useEffect(() => {
    if (isSubmitted) {
      const postData = {
        name: Name,
        description: Description,
        target_completion_date: DueDate
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
      };
      fetch('http://localhost:5000/todos/create', requestOptions)
        .then(response => {
          resetName();
          resetDescription();
          resetDueDate();
          return response.json();
        })
        .catch(error => {
          console.error('There was an error!', error);
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