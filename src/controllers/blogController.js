import Blog from '../models/Blog.js';

// @route   GET /api/blog
// @desc    Get all published blog posts (or all posts for admin)
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const { category, tag, status, page = 1, limit = 10, all } = req.query;

    // Build query - if 'all' param is true, get all blogs (for admin)
    // Otherwise, only get published blogs (for public)
    const query = all === 'true' ? {} : { isPublished: true };
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (status === 'published') query.isPublished = true;
    if (status === 'draft') query.isPublished = false;

    const blogs = await Blog.find(query)
      .populate('tags', 'name slug')
      .populate('author', 'name title')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
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

// @route   GET /api/blog/:slug
// @desc    Get single blog post by slug (published only for public)
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true
    }).populate('author tags');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Public (will be protected)
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      publishedAt: req.body.isPublished ? new Date() : null
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Public (will be protected)
export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.isPublished && !req.body.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PATCH /api/blog/:id/toggle-status
// @desc    Toggle blog publish status (publish/unpublish)
// @access  Public (will be protected)
export const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Toggle the isPublished status
    blog.isPublished = !blog.isPublished;

    // Set publishedAt date when publishing
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    res.json({
      success: true,
      data: blog,
      message: `Blog post ${blog.isPublished ? 'published' : 'unpublished'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Public (will be protected)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};