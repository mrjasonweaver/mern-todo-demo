import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos, deleteTodo } from '~/services/todos.service';
import { TodoForm } from '~/components/TodoForm';
import { Todo } from '~/models/todo.model'; 

const formatDate = (date: Date): String => {
  const td = new Date(date);
  return date ? `${td.getMonth()}/${td.getDate()}/${td.getFullYear()}` : '';
}

export const TodoList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTodos().then((result: Todo[]) => {
      setIsLoaded(true);
      setItems(result);
    }, error => {
      setIsLoaded(true);
      setError(error);
    });
    if (isDeleted) {
      deleteTodo(deleteId).then(() => {
        setDeleteId(null);
        setIsDeleted(false);
      }, error => {
        console.log(error);
        setDeleteId(null);
        setIsDeleted(false);
      });
    }
  }, [items, isDeleted]);

  const handleDelete = (id: String): any => {
    setDeleteId(id);
    setIsDeleted(true);
  }

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
      {items.map((item: Todo, i: number) => (
        <div key={`${i}-${+item._id}`} className="split">
          <span className="item-check">Check</span>&nbsp;
          <span className="item-name">{item.name}</span>&nbsp;
          <span className="item-description">{item.description}</span>&nbsp;
          <span className="item-duedate">{formatDate(item.target_completion_date)}</span>&nbsp;
          <span className="item-delete" onClick={() => handleDelete(item._id)}>delete</span>&nbsp;
          <span className="item-edit">edit</span>
        </div>
      ))}
      </div>
    )
  }
}