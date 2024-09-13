import { Router } from 'express';
import  protect  from '../middlewares/authMiddleware.js';
import { getAllUsers } from '../controllers/userController.js';
const router = Router();

router.get('/admin/users', protect, getAllUsers);  // Admin only

export default router;
