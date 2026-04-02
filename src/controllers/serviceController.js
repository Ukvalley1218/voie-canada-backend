import Service from '../models/Service.js';

// @route   GET /api/services
// @desc    Get all active services (public) or all services (admin)
// @access  Public
export const getServices = async (req, res) => {
  try {
    const { category, all } = req.query;

    // Build query - if 'all' param is true, get all services (for admin)
    // Otherwise, only get active services (for public)
    const query = all === 'true' ? {} : { isActive: true };
    if (category) query.category = category;

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/services/:slug
// @desc    Get single service by slug
// @access  Public
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isActive: true
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/services
// @desc    Create new service
// @access  Public (will be protected)
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Public (will be protected)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PATCH /api/services/:id/toggle-status
// @desc    Toggle service active status (activate/deactivate)
// @access  Public (will be protected)
export const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Toggle the isActive status
    service.isActive = !service.isActive;
    await service.save();

    res.json({
      success: true,
      data: service,
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Public (will be protected)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};