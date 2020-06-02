import { Todo } from '~/models/todo.model';

const url = 'http://localhost:5000/todos';

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
  const res = await fetch(`${url}/create`, requestOptions);
  return await res.json();
}

export const deleteTodo = async (id: String): Promise<Object> => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  console.log(id)
  const res = await fetch(`${url}/${id}/delete`, requestOptions);
  return await res.json();
}