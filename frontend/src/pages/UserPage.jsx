import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
import { getUserTasks } from '../services/taskService';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // To store the taskId for editing
  const navigate = useNavigate();

  const refreshTasks = async () => {
    const fetchedTasks = await getUserTasks(token);
    setTasks(fetchedTasks);
    setEditingTaskId(null); // Reset editing taskId after refresh
  };

  useEffect(() => {
    refreshTasks();
  }, [token]);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-white shadow p-4 md:p-6 rounded-lg">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center">
            <h2 className="mb-4 md:mb-0 font-bold text-center text-gray-800 text-xl md:text-2xl md:text-left">
              User Dashboard
            </h2>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full md:w-auto text-center text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Form Section */}
        <div className="mb-8">
          <TaskForm taskId={editingTaskId} refreshTasks={refreshTasks} />
        </div>

        {/* Task List Section */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-4 font-semibold text-gray-700 text-xl">Your Tasks</h3>
          <TaskList tasks={tasks} refreshTasks={refreshTasks} setEditingTask={setEditingTaskId} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
