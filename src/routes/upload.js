import express from 'express';
import { uploadImage as uploadMiddleware, uploadDocument as uploadDocumentMiddleware, uploadVideo as uploadVideoMiddleware } from '../middlewares/upload.js';
import { uploadImage, uploadDocument, uploadVideo } from '../utils/upload.js';

const router = express.Router();

// @route   POST /api/upload/image
// @desc    Upload single image to Cloudinary
// @access  Public (will be protected for admin later)
router.post('/image', uploadMiddleware.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await uploadImage(fileStr, 'voie-canada');

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image'
      });
    }

    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/upload/document
// @desc    Upload document (PDF, DOC, etc.) to Cloudinary
// @access  Public (will be protected for admin later)
router.post('/document', uploadDocumentMiddleware.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file received in request');
      return res.status(400).json({
        success: false,
        message: 'No document file provided'
      });
    }

    console.log('File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await uploadDocument(fileStr, 'voie-canada/documents');

    if (!result.success) {
      console.error('Cloudinary upload failed:', result.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload document: ' + result.error
      });
    }

    console.log('Upload successful:', result.url);

    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      original_filename: req.file.originalname
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/upload/video
// @desc    Upload video to Cloudinary
// @access  Public (will be protected for admin later)
router.post('/video', uploadVideoMiddleware.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided'
      });
    }

    console.log('Video received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await uploadVideo(fileStr, 'voie-canada/videos');

    if (!result.success) {
      console.error('Cloudinary video upload failed:', result.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload video: ' + result.error
      });
    }

    console.log('Video upload successful:', result.url);

    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      original_filename: req.file.originalname
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images to Cloudinary
// @access  Public (will be protected for admin later)
router.post('/multiple', uploadMiddleware.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    const uploadPromises = req.files.map(file => {
      const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      return uploadImage(fileStr, 'voie-canada');
    });

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      images: results.map(r => ({
        url: r.url,
        public_id: r.public_id
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;