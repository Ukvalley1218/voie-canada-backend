import express from 'express';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus
} from '../controllers/testimonialController.js';

const router = express.Router();

// IMPORTANT: Place /toggle-status BEFORE /:id routes
// Otherwise Express will match ':id' before 'toggle-status'
router.get('/', getTestimonials);
router.post('/', createTestimonial);
router.patch('/:id/toggle-status', toggleTestimonialStatus);
router.get('/:id', getTestimonialById);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;