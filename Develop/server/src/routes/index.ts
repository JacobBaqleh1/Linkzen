import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { createUser } from '../controllers/user-controller.js';

const router = Router();

// user createUser route
router.post('/auth/users', createUser);

// user authRoutes for login
router.use('/auth', authRoutes);

//user apiRoutes for routes that require authentication
router.use('/api', authenticateToken, apiRoutes);

export default router;
