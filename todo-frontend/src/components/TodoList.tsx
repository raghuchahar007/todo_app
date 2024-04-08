import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/v1/todo`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await axios.put(`${backendUrl}/v1/todo/${updatedTodo._id}`, updatedTodo);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === updatedTodo._id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`${backendUrl}/v1/todo/${todoId}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
