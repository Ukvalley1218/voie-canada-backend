import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus
} from '../controllers/blogController.js';

const router = express.Router();

// IMPORTANT: Place /toggle-status BEFORE /:slug routes
router.get('/', getBlogs);
router.post('/', createBlog);
router.patch('/:id/toggle-status', toggleBlogStatus);
router.get('/:slug', getBlogBySlug);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;