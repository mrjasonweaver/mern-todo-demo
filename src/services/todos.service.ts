import { Todo, TodoChecked } from '~/models/todo.model';

const url = 'https://mern-todo-demo.herokuapp.com/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${url}`);
  return await res.json();
}

export const postTodo = async (postData: Todo): Promise<Object> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  return await fetch(`${url}/create`, requestOptions);
}

export const deleteTodo = async (id: String): Promise<Object> => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  return await fetch(`${url}/${id}/delete`, requestOptions);
}

export const checkTodo = async (id: String, postData: TodoChecked): Promise<Object> => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  return await fetch(`${url}/${id}/update`, requestOptions);
}

export const updateTodo = async (id: String, postData: Todo): Promise<Object> => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  return await fetch(`${url}/${id}/update`, requestOptions);
}