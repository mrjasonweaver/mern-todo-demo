import * as React from 'react';
import { Todo } from '~/models/todo.model';
import { TodoForm } from '~/components/TodoForm';

export const Todos = ({
  todos,
  deleteId, deleteTodo,
  checkId, checkTodo,
  editId, editTodo, theEditId,
  submit, isSubmitted}) => {

  const formatDate = (date: Date): String => {
    const td = new Date(date);
    return date ? `${td.getMonth()+1}/${td.getDate()+1}/${td.getFullYear()}` : '';
  }

  const handleDelete = (id: String): void => {
    deleteId(id);
    deleteTodo(true);
  }

  const handleCheck = (id: String): void => {
    checkId(id);
    checkTodo(true);
  }

  const handleEdit = (id: String): void => {
    editId(id);
    editTodo(true);
  }

  return (
    <div>
      <div className="todo-header">
        <span className="item-check">Status</span>
        <span className="item-name">Name</span>
        <span className="item-description">Description</span>
        <span className="">Due date</span>
        <span className="item-edit">Edit</span>
        <span className="item-delete">Delete</span>
      </div>
      {todos.map((item: Todo, i: number) => (
      item._id === theEditId
        ? <div key={`${i}--${item._id}`} className="edit-form">
            <TodoForm
              submit={(isSubmitted: boolean) => submit(isSubmitted)}
              isSubmitted={isSubmitted}
              isEdit={editTodo}
              currentEditTodo={item} />
          </div>
        : <div key={`${i}--${item._id}`} className="split">
            <span className="item-check" onClick={() => handleCheck(item._id)}>
              <i className="material-icons">
                { item.completion_date ? 'check_box' : 'check_box_outline_blank' }
              </i>
            </span>
            <span className="item-name">{item.name}</span>
            <span className="item-description">{item.description}</span>
            <span className="item-duedate">{formatDate(item.target_completion_date)}</span>
            <span className="item-edit" onClick={() => handleEdit(item._id)}>
              <i className="material-icons">edit</i>
            </span>
            <span className="item-delete" onClick={() => handleDelete(item._id)}>
              <i className="material-icons">delete</i>
            </span>
          </div>
      ))}
    </div>
  )
}