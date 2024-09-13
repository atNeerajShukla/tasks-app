import { Router } from 'express';
import { createTask, updateTask, deleteTask, getTask, getUserTasks, getAllTasks } from '../controllers/taskController.js';
import protect from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/', protect, createTask);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);
router.get('/:taskId', protect, getTask);
router.get('/', protect, getUserTasks);
router.get('/admin/all', protect, getAllTasks);  // Admin only

export default router;
