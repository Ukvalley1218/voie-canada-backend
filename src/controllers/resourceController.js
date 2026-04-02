import Resource from '../models/Resource.js';

// @route   GET /api/resources
// @desc    Get all active resources (public) or all resources (admin)
// @access  Public
export const getResources = async (req, res) => {
  try {
    const { category, type, featured, limit, all } = req.query;

    // Build query - if 'all' param is true, get all resources (for admin)
    // Otherwise, only get active resources (for public)
    const query = all === 'true' ? {} : { isActive: true };
    if (category) query.category = category;
    if (type) query.type = type;
    if (featured) query.isFeatured = featured === 'true';

    let resourcesQuery = Resource.find(query).sort({ order: 1, createdAt: -1 });

    if (limit) {
      resourcesQuery = resourcesQuery.limit(parseInt(limit));
    }

    const resources = await resourcesQuery;

    res.json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/resources/:slug
// @desc    Get single resource by slug
// @access  Public
export const getResourceBySlug = async (req, res) => {
  try {
    const resource = await Resource.findOne({
      slug: req.params.slug,
      isActive: true
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/resources
// @desc    Create new resource (admin)
// @access  Private
export const createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/resources/:id
// @desc    Update resource (admin)
// @access  Private
export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PATCH /api/resources/:id/toggle-status
// @desc    Toggle resource active status (activate/deactivate)
// @access  Private
export const toggleResourceStatus = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Toggle the isActive status
    resource.isActive = !resource.isActive;
    await resource.save();

    res.json({
      success: true,
      data: resource,
      message: `Resource ${resource.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/resources/:id
// @desc    Delete resource (admin)
// @access  Private
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/resources/:id/download
// @desc    Track download and return file URL
// @access  Public
export const trackDownload = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Increment download count
    resource.downloadCount += 1;
    await resource.save();

    res.json({
      success: true,
      data: {
        url: resource.fileUrl,
        title: resource.title
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PATCH /api/resources/:id/toggle-featured
// @desc    Toggle featured status
// @access  Private
export const toggleFeatured = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    resource.isFeatured = !resource.isFeatured;
    await resource.save();

    res.json({
      success: true,
      message: `Resource ${resource.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};