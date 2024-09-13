import React from 'react';
import { deleteTask } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

const TaskList = ({ tasks, refreshTasks }) => {
  const { token } = useAuth();

  const handleDelete = async (taskId) => {
    await deleteTask(taskId, token);
    refreshTasks();
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
