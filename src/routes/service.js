import express from 'express';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus
} from '../controllers/serviceController.js';

const router = express.Router();

// IMPORTANT: Place /toggle-status BEFORE /:slug routes
router.get('/', getServices);
router.post('/', createService);
router.patch('/:id/toggle-status', toggleServiceStatus);
router.get('/:slug', getServiceBySlug);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;