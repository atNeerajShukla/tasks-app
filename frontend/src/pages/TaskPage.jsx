import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getUserTasks } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

const TaskPage = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    const fetchedTasks = await getUserTasks(token);
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, [token]);

  return (
    <div>
      <h1>Hello</h1>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList tasks={tasks} refreshTasks={refreshTasks} />
    </div>
  );
};

export default TaskPage;
