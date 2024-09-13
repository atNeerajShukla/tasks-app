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
    } else {
      // Reset form if no taskId is passed (create mode)
      setTitle('');
      setDescription('');
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="mb-4 font-semibold text-gray-700 text-xl">{taskId ? 'Edit Task' : 'Create a New Task'}</h2>
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-gray-300 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task description"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-white transition duration-300"
        >
          {taskId ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
