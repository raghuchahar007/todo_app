import React, { useState } from 'react';
import axios from 'axios';
import './TodoItem.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleCheckboxChange = () => {
    if (editMode || deleteMode) {
      // Disable edit/delete mode if checkbox is clicked again
      setEditMode(false);
      setDeleteMode(false);
    } else {
      // Enable edit mode
      setEditMode(true);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedTodo = { ...todo, title: editedTitle };
      await axios.put(`${backendUrl}/v1/todo/${todo._id}`, updatedTodo);
      onUpdateTodo(updatedTodo);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("todo : ",todo);
      await axios.delete(`${backendUrl}/v1/todo/${todo._id}`);
      onDeleteTodo(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={handleCheckboxChange} />
      {editMode ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <button onClick={editMode ? handleEdit : () => setEditMode(true)}>
        {editMode ? 'Save' : 'Edit'}
      </button>
      {deleteMode ? (
        <button onClick={handleDelete}>Confirm Delete</button>
      ) : (
        <button onClick={() => setDeleteMode(true)}>Delete</button>
      )}
    </li>
  );
};

export default TodoItem;
