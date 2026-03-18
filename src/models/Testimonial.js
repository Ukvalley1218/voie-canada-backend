import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true
  },
  videoUrl: {
    type: String
  },
  category: {
    type: String,
    enum: ['professional', 'entrepreneur', 'student', 'family'],
    default: 'professional'
  },
  journey: {
    type: String
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
  }
}, {
  timestamps: true
});

export default mongoose.model('Testimonial', testimonialSchema);