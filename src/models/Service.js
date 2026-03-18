import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  longDescription: {
    type: String
  },
  category: {
    type: String,
    enum: ['immigration', 'education'],
    required: [true, 'Category is required']
  },
  subcategory: {
    type: String
  },
  icon: {
    type: String
  },
  image: {
    type: String
  },
  benefits: [{
    type: String
  }],
  processSteps: [{
    step: Number,
    title: String,
    description: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
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
  },
  seoKeywords: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create slug from title before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
 
});

export default mongoose.model('Service', serviceSchema);