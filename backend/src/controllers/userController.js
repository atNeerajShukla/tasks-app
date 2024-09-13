import User from '../models/userModel.js';

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: 'Admin access required' });
  }

  const users = await User.find();
  res.json(users);
};

export {
  getAllUsers,
};
