import express from 'express';
import {
  getSettings,
  getPublicSettings,
  updateSettings,
  updateHero,
  updateTrustStats,
  updateContact,
  updateSocialLinks,
  updateCTA,
  getPrivacyPolicy,
  updatePrivacyPolicy,
  getTermsOfService,
  updateTermsOfService
} from '../controllers/settingsController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicSettings);
router.get('/legal/privacy-policy', getPrivacyPolicy);
router.get('/legal/terms-of-service', getTermsOfService);

// Protected routes (admin only)
router.get('/', protect, adminOnly, getSettings);
router.put('/', protect, adminOnly, updateSettings);
router.put('/hero', protect, adminOnly, updateHero);
router.put('/trust-stats', protect, adminOnly, updateTrustStats);
router.put('/contact', protect, adminOnly, updateContact);
router.put('/social', protect, adminOnly, updateSocialLinks);
router.put('/cta', protect, adminOnly, updateCTA);
router.put('/legal/privacy-policy', protect, adminOnly, updatePrivacyPolicy);
router.put('/legal/terms-of-service', protect, adminOnly, updateTermsOfService);

export default router;