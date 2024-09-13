import React, { useState, useEffect } from 'react';
import { createTask, updateTask, getTask } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

const TaskForm = ({ taskId, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (taskId) {
      // Fetch task data if taskId is passed (edit mode)
      const fetchTask = async () => {
        const task = await getTask(taskId, token);
        setTitle(task.title);
        setDescription(task.description);
      };
      fetchTask();
    }
  }, [taskId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description };

    if (taskId) {
      await updateTask(taskId, taskData, token);
    } else {
      await createTask(taskData, token);
    }

    setTitle('');
    setDescription('');
    refreshTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">{taskId ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
