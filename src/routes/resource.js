import express from 'express';
import {
  getResources,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
  trackDownload,
  toggleFeatured,
  toggleActive
} from '../controllers/resourceController.js';
import { protect, adminOnly, editorAccess } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getResources);
router.get('/slug/:slug', getResourceBySlug);
router.post('/:id/download', trackDownload);

// Protected routes (admin/editor)
router.post('/', protect, editorAccess, createResource);
router.put('/:id', protect, editorAccess, updateResource);
router.delete('/:id', protect, adminOnly, deleteResource);
router.put('/:id/featured', protect, editorAccess, toggleFeatured);
router.put('/:id/active', protect, adminOnly, toggleActive);

export default router;