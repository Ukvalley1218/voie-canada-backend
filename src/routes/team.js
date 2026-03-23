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
router.get('/:id', getTeamMemberById);

// Protected routes (admin only)
router.post('/', protect, adminOnly, createTeamMember);
router.put('/:id', protect, adminOnly, updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);
router.put('/:id/toggle-active', protect, adminOnly, toggleActive);

export default router;