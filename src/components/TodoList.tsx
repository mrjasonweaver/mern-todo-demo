import * as React from 'react';
import { useEffect, useState, FunctionComponent } from 'react';
import { fetchTodos, deleteTodo, checkTodo } from '~/services/todos.service';
import { TodoForm } from '~/components/TodoForm';
import { Todos } from '~/components/Todos';
import { Todo, TodoChecked } from '~/models/todo.model';
import mapSort from 'mapsort'; 

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
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos().then((result: Todo[]) => {
      const sorted = mapSort(
        result,
        (element: Todo): number => {
          const theDate: any = element.target_completion_date;
          return Date.parse(theDate);
        },
        (a: number, b: number): number => a - b
      );
      const todos = sorted.filter(todo => !todo.completion_date);
      const completed = sorted.filter(todo => todo.completion_date);
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
    if (isSubmitted) {
      setEditId(null);
      setIsEdit(false);
      setIsSubmitted(false);
    }
  }, [isSubmitted, isChecked, isDeleted, isEdit]);

  if (error) {
    return <section className="container">Error: {error.message}</section>;
  } else if (!isLoaded) {
    return <section className="container">Loading...</section>;
  } else {
    return (
      <section className="container">
        <h3>Add Todo</h3>
        <TodoForm
          submit={(isSubmitted: boolean) => setIsSubmitted(isSubmitted)}
          isSubmitted={isSubmitted}
          isEdit={isEdit}
          currentEditTodo={null} />
        <Todos
          deleteId={(deleteId: String) => setDeleteId(deleteId)}
          checkId={(checkId: String) => setCheckedId(checkId)}
          editId={(editId: String) => setEditId(editId)}
          theEditId={editId}
          deleteTodo={(isDeleted: boolean) => setIsDeleted(isDeleted)}
          checkTodo={(isChecked: boolean) => setIsChecked(isChecked)}
          editTodo={(isEdit: boolean) => setIsEdit(isEdit)}
          submit={(isSubmitted: boolean) => setIsSubmitted(isSubmitted)}
          isSubmitted={isSubmitted}
          todos={todos} />
        <h3>Completed</h3>
        <Todos
          deleteId={(deleteId: String) => setDeleteId(deleteId)}
          checkId={(checkId: String) => setCheckedId(checkId)}
          editId={(editId: String) => setEditId(editId)}
          theEditId={editId}
          deleteTodo={(isDeleted: boolean) => setIsDeleted(isDeleted)}
          checkTodo={(isChecked: boolean) => setIsChecked(isChecked)}
          editTodo={(isEdit: boolean) => setIsEdit(isEdit)}
          submit={(isSubmitted: boolean) => setIsSubmitted(isSubmitted)}
          isSubmitted={isSubmitted}
          todos={completed} />
      </section>
    )
  }
}