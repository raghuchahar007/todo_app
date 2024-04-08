import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import './TodoApp.css';

const TodoApp: React.FC = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};

export default TodoApp;
