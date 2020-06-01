import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos } from '~/services/todos.service';

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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="section">
        <div className="grid grid-wide">
          <div className="sm-grid4">
            <div className="section">
              <div className="contain">
                <div className="profile-wrap">
                  <div className="profile-header">
                    <h1 className="alt-font alpha text-center">Todos</h1>
                    <p className="text-center">
                      This is your todo list.<br/>
                      <Link to="/create">Create</Link>, Edit, or complete a todo.
                    </p>
                    <div>
                    {items.map(item => (
                      <div key={item.name} className="split">
                        <span className="dt">{item.name}</span>
                        <span className="dd">{item.description}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    )
  }
}