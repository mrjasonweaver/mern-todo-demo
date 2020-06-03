import * as React from 'react';
import { Header } from '~/components/Header';
import { TodoList } from '~/components/TodoList';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <TodoList />
      </div>
    )
  }
}