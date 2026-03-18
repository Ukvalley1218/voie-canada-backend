import User from '../models/User.js';
import Settings from '../models/Settings.js';

// Create initial admin user
export const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@voiecanada.com',
      password: 'admin123456',
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@voiecanada.com');
    console.log('Password: admin123456');
    console.log('Please change the password after first login!');

    return admin;
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Create default settings
export const createDefaultSettings = async () => {
  try {
    const existingSettings = await Settings.findOne();

    if (existingSettings) {
      console.log('Settings already exist');
      return;
    }

    const settings = await Settings.create({
      siteName: 'Voie Canada',
      siteTagline: 'Your Pathway to Canada',
      hero: {
        headline: 'Your Pathway to Canada',
        subheadline: 'Immigration & Education Made Personal',
        description: 'Helping professionals, entrepreneurs, and students achieve their Canadian dream.',
        primaryCTA: {
          text: 'Explore Immigration Options',
          link: '/immigration'
        },
        secondaryCTA: {
          text: 'Discover Education Programs',
          link: '/education'
        }
      },
      trustStats: [
        { number: '500+', label: 'Families Settled' },
        { number: '300+', label: 'Students Admitted' },
        { number: '95%', label: 'Success Rate' },
        { number: '50+', label: 'Countries Served' }
      ],
      differentiator: {
        title: 'Why Choose Us',
        headline: 'Inclusive Education & Tailored Immigration Support',
        description: 'At Voie Canada, we specialize in inclusive education pathways and tailored entrepreneur immigration programs.',
        points: [
          { title: 'Specialized Student Support', description: 'Expert guidance for students with learning challenges' },
          { title: 'Entrepreneur Immigration', description: 'Dedicated startup visa and business immigration programs' },
          { title: 'Personalized Approach', description: 'One-on-one guidance tailored to your unique journey' }
        ]
      },
      contact: {
        email: 'info@voiecanada.com',
        phone: '+1 (XXX) XXX-XXXX',
        whatsapp: '',
        offices: [
          {
            country: 'Canada',
            city: 'Toronto',
            address: '123 Main Street, Suite 400',
            phone: '+1 (416) XXX-XXXX',
            email: 'toronto@voiecanada.com',
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST'
          },
          {
            country: 'India',
            city: 'New Delhi',
            address: '456 Business Park, Floor 5',
            phone: '+91 XXX XXX XXXX',
            email: 'delhi@voiecanada.com',
            hours: 'Mon-Sat: 10:00 AM - 7:00 PM IST'
          }
        ]
      },
      socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com'
      },
      certifications: [
        { name: 'ICCRC', description: 'Immigration Consultants of Canada Regulatory Council', logo: '' },
        { name: 'CAPIC', description: 'Canadian Association of Professional Immigration Consultants', logo: '' }
      ],
      ctaSection: {
        headline: 'Start Your Canadian Journey Today',
        description: 'Take the first step towards your Canadian dream.',
        primaryButton: {
          text: 'Free Assessment',
          link: '/assessment'
        },
        secondaryButton: {
          text: 'Book Consultation',
          link: '/contact'
        }
      },
      footer: {
        aboutText: 'Your trusted partner for Canadian immigration and education services.',
        copyrightText: '© {year} Voie Canada. All rights reserved.'
      }
    });

    console.log('Default settings created successfully');
    return settings;
  } catch (error) {
    console.error('Error creating default settings:', error);
  }
};

// Run all seed functions
export const runSeed = async () => {
  console.log('Running seed...');
  await createAdminUser();
  await createDefaultSettings();
  console.log('Seed completed');
};