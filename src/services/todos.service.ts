const url = 'http://localhost:5000';

export const fetchTodos = () => {
  return fetch(`${url}/todos`).then(res => res.json())
}