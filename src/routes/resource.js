import express from 'express';
import {
  getResources,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
  trackDownload,
  toggleFeatured,
  toggleResourceStatus
} from '../controllers/resourceController.js';

const router = express.Router();

// Public routes
router.get('/', getResources);
router.get('/slug/:slug', getResourceBySlug);
router.post('/:id/download', trackDownload);

// Admin routes - IMPORTANT: Place /toggle-status BEFORE /:id routes
router.post('/', createResource);
router.put('/:id', updateResource);
router.patch('/:id/toggle-status', toggleResourceStatus);
router.patch('/:id/toggle-featured', toggleFeatured);
router.delete('/:id', deleteResource);

export default router;