import React, { useState } from 'react';
import axios from 'axios';
import './AddTodoForm.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/v1/todo`, { title, description, completed: false });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="add-todo-form">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
