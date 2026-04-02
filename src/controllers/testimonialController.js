import Testimonial from '../models/Testimonial.js';

// @route   GET /api/testimonials
// @desc    Get testimonials (public gets active only, admin gets all)
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const { category, featured, limit, all } = req.query;

    // Build query - if 'all' param is true, get all testimonials (for admin)
    // Otherwise, only get active testimonials (for public)
    const query = all === 'true' ? {} : { isActive: true };
    if (category) query.category = category;
    if (featured) query.isFeatured = featured === 'true';

    let testimonialsQuery = Testimonial.find(query).sort({ order: 1, createdAt: -1 });

    if (limit) {
      testimonialsQuery = testimonialsQuery.limit(parseInt(limit));
    }

    const testimonials = await testimonialsQuery;

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial
// @access  Public
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/testimonials
// @desc    Create new testimonial (for admin later)
// @access  Public (will be protected)
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial (for admin later)
// @access  Public (will be protected)
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PATCH /api/testimonials/:id/toggle-status
// @desc    Toggle testimonial active status (activate/deactivate)
// @access  Public (will be protected)
export const toggleTestimonialStatus = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Toggle the isActive status
    testimonial.isActive = !testimonial.isActive;
    await testimonial.save();

    res.json({
      success: true,
      data: testimonial,
      message: `Testimonial ${testimonial.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial (for admin later)
// @access  Public (will be protected)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};