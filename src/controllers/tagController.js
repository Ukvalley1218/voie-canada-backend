import BlogTag from '../models/BlogTag.js';

// Get all tags (public)
export const getTags = async (req, res) => {
  try {
    const tags = await BlogTag.find({ isActive: true })
      .sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tags'
    });
  }
};

// Get all tags (admin - includes inactive)
export const getAllTags = async (req, res) => {
  try {
    const tags = await BlogTag.find()
      .sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tags'
    });
  }
};

// Get single tag by ID
export const getTagById = async (req, res) => {
  try {
    const tag = await BlogTag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }
    res.json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tag'
    });
  }
};

// Create new tag (admin only)
export const createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if tag already exists
    const existingTag = await BlogTag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: 'Tag with this name already exists'
      });
    }

    const tag = new BlogTag({
      name,
      description
    });

    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating tag'
    });
  }
};

// Update tag (admin only)
export const updateTag = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const tag = await BlogTag.findByIdAndUpdate(
      req.params.id,
      { name, description, isActive },
      { new: true, runValidators: true }
    );

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.json(tag);
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating tag'
    });
  }
};

// Delete tag (admin only)
export const deleteTag = async (req, res) => {
  try {
    const tag = await BlogTag.findByIdAndDelete(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.json({
      success: true,
      message: 'Tag deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tag'
    });
  }
};