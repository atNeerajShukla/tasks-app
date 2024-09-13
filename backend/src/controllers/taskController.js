import Task from '../models/taskModel.js';

// Create a task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  res.json(updatedTask);
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await Task.findByIdAndDelete(taskId);
  res.json({ message: 'Task removed' });
};

// View a particular task
export const getTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

// List all tasks for a user
export const getUserTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Admin view all tasks for all users
export const getAllTasks = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: 'Admin access required' });
  }

  const tasks = await Task.find().populate('user');
  res.json(tasks);
};
