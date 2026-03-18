import Inquiry from '../models/Inquiry.js';

// @route   GET /api/inquiries
// @desc    Get all inquiries (for admin later)
// @access  Public (will be protected)
export const getInquiries = async (req, res) => {
  try {
    const { status, serviceType, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Inquiry.countDocuments(query);

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry
// @access  Public (will be protected)
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/inquiries
// @desc    Create new inquiry (public form submission)
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status (for admin later)
// @access  Public (will be protected)
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/inquiries/:id/notes
// @desc    Add note to inquiry (for admin later)
// @access  Public (will be protected)
export const addNote = async (req, res) => {
  try {
    const { note } = req.body;

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    inquiry.notes.push({
      note,
      addedAt: new Date()
    });

    await inquiry.save();

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};