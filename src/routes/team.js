import express from 'express';
import {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleActive
} from '../controllers/teamController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getTeamMembers);

// Protected routes (admin only) - IMPORTANT: Place /toggle-status BEFORE /:id routes
router.post('/', protect, adminOnly, createTeamMember);
router.patch('/:id/toggle-status', protect, adminOnly, toggleActive);
router.get('/:id', getTeamMemberById);
router.put('/:id', protect, adminOnly, updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);

export default router;