import * as React from 'react';
import { useEffect, useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos, deleteTodo, checkTodo } from '~/services/todos.service';
import { TodoForm } from '~/components/TodoForm';
import { Todo, TodoChecked } from '~/models/todo.model'; 

const formatDate = (date: Date): String => {
  const td = new Date(date);
  return date ? `${td.getMonth()}/${td.getDate()}/${td.getFullYear()}` : '';
}

export const TodoList: FunctionComponent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [checkId, setCheckedId] = useState(null);

  useEffect(() => {
    fetchTodos().then((result: Todo[]) => {
      const todos = result.filter(todo => !todo.completion_date);
      const completed = result.filter(todo => todo.completion_date);
      setIsLoaded(true);
      setTodos(todos);
      setCompleted(completed);
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
    if (isChecked) {
      const completion_date = new Date();
      const postData: TodoChecked = {
        completion_date
      };
      checkTodo(checkId, postData).then(() => {
        setCheckedId(null);
        setIsChecked(false);
      }, error => {
        console.log(error);
        setCheckedId(null);
        setIsChecked(false);
      });
    }
  }, [isSubmitted, isChecked, isDeleted]);

  const handleDelete = (id: String): void => {
    console.log('top of handleDelete');
    setDeleteId(id);
    setIsDeleted(true);
  }

  const handleCheck = (id: String): void => {
    setCheckedId(id);
    setIsChecked(true);
  }

  if (error) {
    return <section className="container">Error: {error.message}</section>;
  } else if (!isLoaded) {
    return <section className="container">Loading...</section>;
  } else {
    return (
      <section className="container">
        <p className="text-center">
          This is your todo list.<br/>
          <Link to="/create">Create</Link>, Edit, or complete a todo.
        </p>
        <TodoForm submit={isSubmitted => setIsSubmitted(isSubmitted)} isSubmitted={isSubmitted} />
        {todos.map((item: Todo, i: number) => (
          <div key={`${i}--${item._id}`} className="split">
            <span className="item-check" onClick={() => handleCheck(item._id)}>Check</span>&nbsp;
            <span className="item-name">{item.name}</span>&nbsp;
            <span className="item-description">{item.description}</span>&nbsp;
            <span className="item-duedate">{formatDate(item.target_completion_date)}</span>&nbsp;
            <span className="item-delete" onClick={() => handleDelete(item._id)}>delete</span>&nbsp;
            <span className="item-edit">edit</span>
          </div>
        ))}
        <h3>Completed</h3>
        {completed.map((doneItem: Todo, i: number) => (
          <div key={`${i}--${doneItem._id}`} className="split">
            <span className="item-check" onClick={() => handleCheck(doneItem._id)}>Check</span>&nbsp;
            <span className="item-name">{doneItem.name}</span>&nbsp;
            <span className="item-description">{doneItem.description}</span>&nbsp;
            <span className="item-duedate">{formatDate(doneItem.target_completion_date)}</span>&nbsp;
            <span className="item-delete" onClick={() => handleDelete(doneItem._id)}>delete</span>&nbsp;
            <span className="item-edit">edit</span>
          </div>
        ))} 
      </section>
    )
  }
}