import axios from 'axios';

const API_URL = import.meta.env.VITE_BE_API_URL;

// Create a task
export const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/tasks`, taskData, config);
  return response.data;
};

// Get all tasks for the user
export const getUserTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/tasks`, config);
  return response.data;
};

// Get all tasks for the user
export const getUserTasksByUserId = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(userId);
  const response = await axios.get(`${API_URL}/tasks/${userId}`, config);
  return response.data;
};


// Get a particular task
export const getTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/tasks/taskDetails/${taskId}`, config);
  return response.data;
};

// Update a task
export const updateTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, config);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`, config);
  return response.data;
};

// Get all tasks (Admin)
export const getAllTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/tasks/admin/all`, config);
  return response.data;
};

// Get all users (Admin)
export const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/users/admin/users`, config);
  return response.data;
};
