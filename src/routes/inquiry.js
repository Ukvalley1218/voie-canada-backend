import express from 'express';
import {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatus,
  addNote
} from '../controllers/inquiryController.js';

const router = express.Router();

router.get('/', getInquiries);
router.get('/:id', getInquiryById);
router.post('/', createInquiry);
router.put('/:id/status', updateInquiryStatus);
router.post('/:id/notes', addNote);

export default router;