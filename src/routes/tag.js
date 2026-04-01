import express from 'express';
import {
  getTags,
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
} from '../controllers/tagController.js';
import { protect, adminOnly, editorAccess } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getTags);

// Admin routes (protected)
router.get('/all', protect, editorAccess, getAllTags);
router.get('/:id', getTagById);
router.post('/', protect, editorAccess, createTag);
router.put('/:id', protect, editorAccess, updateTag);
router.delete('/:id', protect, adminOnly, deleteTag);

export default router;