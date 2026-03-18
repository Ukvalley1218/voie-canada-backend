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
    }
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