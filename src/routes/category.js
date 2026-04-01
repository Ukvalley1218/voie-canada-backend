import express from 'express';
import {
  getCategories,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, adminOnly, editorAccess } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);

// Admin routes (protected)
router.get('/all', protect, editorAccess, getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', protect, editorAccess, createCategory);
router.put('/:id', protect, editorAccess, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;