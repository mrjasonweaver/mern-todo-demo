import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos } from '~/services/todos.service';
import { TodoForm } from '~/components/TodoForm';

const formatDate = date => {
  const td = new Date(date);
  return date ? `${td.getMonth()}/${td.getDate()}/${td.getFullYear()}` : '';
}

export const TodoList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTodos()
      .then(
        result => {
          setIsLoaded(true);
          setItems(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [items])

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="container">Loading...</div>;
  } else {
    return (
      <div className="container">
        <p className="text-center">
          This is your todo list.<br/>
          <Link to="/create">Create</Link>, Edit, or complete a todo.
        </p>
      <TodoForm />
      {items.map((item, i) => (
        <div key={item.name ? `${item.name}-${i}` : i} className="split">
          <span className="item-check">Check</span>&nbsp;
          <span className="item-name">{item.name}</span>&nbsp;
          <span className="item-description">{item.description}</span>&nbsp;
          <span className="item-duedate">{formatDate(item.target_completion_date)}</span>&nbsp;
          <span className="item-delete">delete</span>&nbsp;
          <span className="item-edit">edit</span>
        </div>
      ))}
      </div>
    )
  }
}