import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['guide', 'ebook', 'checklist', 'template', 'other'],
    default: 'guide'
  },
  category: {
    type: String,
    enum: ['immigration', 'education', 'general'],
    default: 'general'
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  fileType: {
    type: String,
    default: 'pdf'
  },
  fileSize: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    default: ''
  },
  pages: {
    type: Number,
    default: 0
  },
  requiresEmail: {
    type: Boolean,
    default: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  seoTitle: {
    type: String,
    maxlength: 60
  },
  seoDescription: {
    type: String,
    maxlength: 160
  }
}, {
  timestamps: true
});

// Create slug from title before saving
resourceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

});

export default mongoose.model('Resource', resourceSchema);