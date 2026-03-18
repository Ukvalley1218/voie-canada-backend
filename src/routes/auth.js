import express from 'express';
import {
  login,
  getCurrentUser,
  register,
  updateProfile,
  changePassword,
  getUsers,
  toggleUserStatus,
  registerAdmin
} from '../controllers/authController.js';
import { protect,adminOnly,optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);

// Admin only routes
router.post('/register-admin',optionalAuth, registerAdmin);
router.post('/register', protect, adminOnly, register);

router.get('/users', protect, adminOnly, getUsers);
router.put('/users/:id/status', protect, adminOnly, toggleUserStatus);

export default router;