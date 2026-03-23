import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // Site Identity
  siteName: {
    type: String,
    default: 'Voie Canada'
  },
  siteTagline: {
    type: String,
    default: 'Your Pathway to Canada'
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },

  // Hero Section
  hero: {
    badge: {
      text: {
        type: String,
        default: 'IMMIGRATION CANADA'
      },
      icon: {
        type: String,
        default: 'flag'
      }
    },
    headline: {
      type: String,
      default: 'Your Pathway to Canada'
    },
    subheadline: {
      type: String,
      default: 'Immigration & Education Made Personal'
    },
    description: {
      type: String,
      default: 'Helping professionals, entrepreneurs, and students achieve their Canadian dream.'
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    overlayOpacity: {
      type: Number,
      default: 0.7,
      min: 0,
      max: 1
    },
    overlayDirection: {
      type: String,
      enum: ['left', 'right', 'bottom', 'full'],
      default: 'left'
    },
    textPosition: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'left'
    },
    primaryCTA: {
      text: {
        type: String,
        default: 'Explore Immigration Options'
      },
      link: {
        type: String,
        default: '/immigration'
      }
    },
    secondaryCTA: {
      text: {
        type: String,
        default: 'Discover Education Programs'
      },
      link: {
        type: String,
        default: '/education'
      }
    },
    showStats: {
      type: Boolean,
      default: true
    },
    stats: [{
      value: String,
      label: String
    }]
  },

  // Trust Stats
  trustStats: [{
    number: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    }
  }],

  // Differentiator
  differentiator: {
    title: {
      type: String,
      default: 'Why Choose Us'
    },
    headline: {
      type: String,
      default: 'Inclusive Education & Tailored Immigration Support'
    },
    description: {
      type: String,
      default: 'At Voie Canada, we specialize in inclusive education pathways and tailored entrepreneur immigration programs.'
    },
    image: {
      type: String,
      default: ''
    },
    points: [{
      title: String,
      description: String
    }]
  },

  // Contact Information
  contact: {
    email: {
      type: String,
      default: 'info@voiecanada.com'
    },
    phone: {
      type: String,
      default: ''
    },
    whatsapp: {
      type: String,
      default: ''
    },
    offices: [{
      country: String,
      city: String,
      address: String,
      phone: String,
      email: String,
      hours: String,
      mapLink: String
    }]
  },

  // Social Links
  socialLinks: {
    facebook: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: ''
    }
  },

  // SEO Defaults
  seoDefaults: {
    titleTemplate: {
      type: String,
      default: '%s | Voie Canada'
    },
    defaultDescription: {
      type: String,
      default: 'Trusted Canadian immigration and education consultancy.'
    },
    defaultKeywords: [{
      type: String
    }],
    ogImage: {
      type: String,
      default: ''
    }
  },

  // Certifications
  certifications: [{
    name: String,
    description: String,
    logo: String
  }],

  // Process Steps (How It Works)
  processSteps: [{
    number: Number,
    title: String,
    description: String
  }],

  // FAQs
  faqs: [{
    question: String,
    answer: String,
    category: String
  }],

  // CTA Section
  ctaSection: {
    headline: {
      type: String,
      default: 'Start Your Canadian Journey Today'
    },
    description: {
      type: String,
      default: 'Take the first step towards your Canadian dream.'
    },
    primaryButton: {
      text: {
        type: String,
        default: 'Free Assessment'
      },
      link: {
        type: String,
        default: '/assessment'
      }
    },
    secondaryButton: {
      text: {
        type: String,
        default: 'Book Consultation'
      },
      link: {
        type: String,
        default: '/contact'
      }
    }
  },

  // Footer
  footer: {
    aboutText: {
      type: String,
      default: 'Your trusted partner for Canadian immigration and education services.'
    },
    copyrightText: {
      type: String,
      default: '© {year} Voie Canada. All rights reserved.'
    }
  },

  // Homepage Sections (Dynamic Image + Content Sections)
  homepageSections: [{
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['image-content', 'content-image', 'stats', 'testimonials', 'cta'],
      default: 'image-content'
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    },
    points: [{
      title: String,
      description: String,
      icon: String
    }],
    cta: {
      primary: {
        text: String,
        link: String
      },
      secondary: {
        text: String,
        link: String
      }
    },
    backgroundColor: {
      type: String,
      enum: ['white', 'gray', 'blue', 'gradient'],
      default: 'white'
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],

  // Enhanced Stats Section
  statsSection: {
    title: {
      type: String,
      default: 'Trusted by Hundreds of Families'
    },
    subtitle: {
      type: String,
      default: 'Our track record speaks for itself'
    },
    stats: [{
      number: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      }
    }],
    backgroundColor: {
      type: String,
      enum: ['white', 'gray', 'gradient'],
      default: 'gray'
    }
  },

  // Testimonials Section Settings
  testimonialsSection: {
    title: {
      type: String,
      default: 'Success Stories'
    },
    subtitle: {
      type: String,
      default: 'Real Journeys. Real Success.'
    },
    description: {
      type: String,
      default: 'From visa approvals to inclusive education placements, we make every journey possible.'
    },
    backgroundColor: {
      type: String,
      enum: ['white', 'gray'],
      default: 'gray'
    }
  },

  // CTA Banner
  ctaBanner: {
    headline: {
      type: String,
      default: 'Start Your Canadian Journey Today'
    },
    description: {
      type: String,
      default: 'Take the first step towards your Canadian dream.'
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      enum: ['blue', 'gradient', 'image'],
      default: 'blue'
    },
    primaryButton: {
      text: {
        type: String,
        default: 'Free Assessment'
      },
      link: {
        type: String,
        default: '/assessment'
      }
    },
    secondaryButton: {
      text: {
        type: String,
        default: 'Book Consultation'
      },
      link: {
        type: String,
        default: '/contact'
      }
    }
  }
}, {
  timestamps: true
});

// Singleton pattern - only one settings document
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

export default mongoose.model('Settings', settingsSchema);