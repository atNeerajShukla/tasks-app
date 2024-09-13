import { Router } from 'express';
import { createTask, deleteTask, getTask, getUserTasks, getUserTasksByUserId, updateTask } from '../controllers/taskController.js';
import protect from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/', protect, createTask);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);
router.get('/taskDetails/:taskId', protect, getTask);
router.get('/:userId', protect, getUserTasksByUserId);
router.get('/', protect, getUserTasks);

export default router;
