import User from '../models/User.js';
import Settings from '../models/Settings.js';
import BlogCategory from '../models/BlogCategory.js';
import BlogTag from '../models/BlogTag.js';
import Blog from '../models/Blog.js';

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

// Create default blog categories
export const createDefaultCategories = async () => {
  try {
    const existingCategories = await BlogCategory.find();

    if (existingCategories.length > 0) {
      console.log('Blog categories already exist');
      return;
    }

    const categories = await BlogCategory.insertMany([
      { name: 'Immigration', description: 'Immigration news, tips, and guides', order: 1 },
      { name: 'Education', description: 'Education news, tips, and guides', order: 2 },
      { name: 'Settlement', description: 'Settling in Canada guides and tips', order: 3 },
      { name: 'General', description: 'General updates and announcements', order: 4 }
    ]);

    console.log('Default blog categories created successfully');
    return categories;
  } catch (error) {
    console.error('Error creating default categories:', error);
  }
};

// Create default blog tags
export const createDefaultTags = async () => {
  try {
    const existingTags = await BlogTag.find();

    if (existingTags.length > 0) {
      console.log('Blog tags already exist');
      return;
    }

    const tags = await BlogTag.insertMany([
      { name: 'Express Entry', description: 'Express Entry immigration program' },
      { name: 'Provincial Nominee', description: 'Provincial Nominee Program (PNP)' },
      { name: 'Study Permit', description: 'Canadian study permits' },
      { name: 'Work Permit', description: 'Canadian work permits' },
      { name: 'PR Card', description: 'Permanent Resident Card' },
      { name: 'Citizenship', description: 'Canadian citizenship' },
      { name: 'Visa', description: 'Visa information' },
      { name: 'Career', description: 'Career tips and job search' },
      { name: 'Life in Canada', description: 'Life in Canada tips' },
      { name: 'News', description: 'Latest news and updates' }
    ]);

    console.log('Default blog tags created successfully');
    return tags;
  } catch (error) {
    console.error('Error creating default tags:', error);
  }
};

// Create default blog posts
export const createDefaultBlogs = async () => {
  try {
    const existingBlogs = await Blog.find();

    if (existingBlogs.length > 0) {
      console.log('Blog posts already exist');
      return;
    }

    // Get categories for reference
    const immigrationCategory = await BlogCategory.findOne({ name: 'Immigration' });
    const educationCategory = await BlogCategory.findOne({ name: 'Education' });
    const settlementCategory = await BlogCategory.findOne({ name: 'Settlement' });
    const generalCategory = await BlogCategory.findOne({ name: 'General' });

    const blogs = await Blog.insertMany([
      {
        title: 'Understanding Express Entry Draws in 2026',
        slug: 'express-entry-draws-2026',
        excerpt: 'Latest updates on Express Entry draws and what they mean for your application.',
        content: `<h2>What is Express Entry?</h2>
<p>Express Entry is Canada's flagship application management system for skilled workers. It manages applications for three federal economic immigration programs:</p>
<ul>
<li>Federal Skilled Worker Program</li>
<li>Canadian Experience Class</li>
<li>Federal Skilled Trades Program</li>
</ul>
<h2>Recent Draw Trends</h2>
<p>In 2026, we've seen significant changes in Express Entry draws. The CRS scores have stabilized, and IRCC has introduced category-based draws targeting specific occupations and French-speaking candidates.</p>
<h2>How to Improve Your CRS Score</h2>
<p>There are several ways to improve your Comprehensive Ranking System (CRS) score:</p>
<ul>
<li>Improve language test scores (IELTS/CELPIP for English, TEF/TCF for French)</li>
<li>Gain additional work experience</li>
<li>Complete higher education credentials</li>
<li>Obtain a provincial nomination (adds 600 points)</li>
<li>Secure a valid job offer from a Canadian employer</li>
</ul>
<h2>Next Steps</h2>
<p>If you're considering Express Entry as your immigration pathway, we recommend starting with a free assessment to evaluate your eligibility and identify areas for improvement.</p>`,
        category: 'Immigration',
        isPublished: true,
        publishedAt: new Date('2026-03-15'),
        seoTitle: 'Express Entry Draws 2026 | Voie Canada',
        seoDescription: 'Latest updates on Express Entry draws and CRS score trends for Canadian immigration.',
        seoKeywords: ['express entry', 'CRS score', 'immigration', 'Canada']
      },
      {
        title: 'Top Scholarships for International Students in Canada',
        slug: 'top-scholarships-canada',
        excerpt: 'Discover the best scholarship opportunities for international students.',
        content: `<h2>Why Study in Canada?</h2>
<p>Canada is one of the top destinations for international students, offering world-class education at globally ranked institutions. With over 800,000 international students, Canada provides a diverse and welcoming environment.</p>
<h2>Major Scholarship Programs</h2>
<p>There are numerous scholarship opportunities available for international students:</p>
<ul>
<li><strong>Vanier Canada Graduate Scholarships:</strong> $50,000 per year for doctoral students</li>
<li><strong>Ontario Graduate Scholarship:</strong> Up to $15,000 for graduate students</li>
<li><strong>University-specific scholarships:</strong> Most Canadian universities offer entrance scholarships</li>
<li><strong>Government-funded programs:</strong> Various provincial and federal programs</li>
</ul>
<h2>Eligibility Requirements</h2>
<p>Each scholarship has specific requirements, but common criteria include:</p>
<ul>
<li>Academic excellence (minimum GPA requirements)</li>
<li>Language proficiency (IELTS/TOEFL scores)</li>
<li>Leadership and community involvement</li>
<li>Research potential (for graduate scholarships)</li>
</ul>
<h2>How to Apply</h2>
<p>Start by researching scholarships that match your profile. Our education consultants can help you identify the best opportunities and guide you through the application process.</p>`,
        category: 'Education',
        isPublished: true,
        publishedAt: new Date('2026-03-10'),
        seoTitle: 'Scholarships for International Students | Voie Canada',
        seoDescription: 'Discover the best scholarship opportunities for international students in Canada.',
        seoKeywords: ['scholarships', 'international students', 'education', 'Canada']
      },
      {
        title: 'Schools Offering Learning Support in Canada',
        slug: 'schools-learning-support-canada',
        excerpt: 'A guide to Canadian institutions with excellent support services for students with learning challenges.',
        content: `<h2>Inclusive Education in Canada</h2>
<p>Canada is known for its inclusive education system. Many institutions offer specialized support for students with learning disabilities, ADHD, autism spectrum disorders, and other unique needs.</p>
<h2>Types of Support Available</h2>
<p>Canadian schools and universities provide various accommodations:</p>
<ul>
<li>Extended exam time</li>
<li>Note-taking services</li>
<li>Assistive technology</li>
<li>Learning support centers</li>
<li>Individualized education plans</li>
<li>Counselling services</li>
</ul>
<h2>Top Institutions for Learning Support</h2>
<p>Several Canadian institutions are known for exceptional support services:</p>
<ul>
<li>University of Toronto - Accessibility Services</li>
<li>University of British Columbia - Centre for Accessibility</li>
<li>McGill University - Office for Students with Disabilities</li>
<li>York University - Student Accessibility Services</li>
</ul>
<h2>How We Can Help</h2>
<p>Our education consultants specialize in finding the right fit for students with unique needs. We help families navigate the application process and connect with support services.</p>`,
        category: 'Education',
        isPublished: true,
        publishedAt: new Date('2026-03-05'),
        seoTitle: 'Learning Support Schools in Canada | Voie Canada',
        seoDescription: 'A guide to Canadian institutions with excellent support services for students with learning challenges.',
        seoKeywords: ['learning support', 'disabilities', 'education', 'Canada']
      },
      {
        title: 'Provincial Nominee Program Updates',
        slug: 'pnp-updates-2026',
        excerpt: 'Recent changes to PNP streams and how they affect your immigration strategy.',
        content: `<h2>What are Provincial Nominee Programs?</h2>
<p>Provincial Nominee Programs (PNPs) allow Canadian provinces and territories to nominate individuals for permanent residency based on local labor market needs.</p>
<h2>Recent Changes in 2026</h2>
<p>Several provinces have updated their PNP streams:</p>
<ul>
<li>Ontario has introduced new tech-specific streams</li>
<li>British Columbia has expanded healthcare worker pathways</li>
<li>Alberta has simplified their Alberta Opportunity Stream</li>
<li>Atlantic provinces have enhanced their Atlantic Immigration Program</li>
</ul>
<h2>How to Choose the Right Province</h2>
<p>Consider these factors when selecting a province:</p>
<ul>
<li>Your occupation and in-demand jobs in the province</li>
<li>Language requirements</li>
<li>Processing times</li>
<li>Job market and settlement opportunities</li>
</ul>
<h2>Getting Started</h2>
<p>Our immigration consultants can help you identify the best PNP stream for your profile and guide you through the application process.</p>`,
        category: 'Immigration',
        isPublished: true,
        publishedAt: new Date('2026-03-01'),
        seoTitle: 'PNP Updates 2026 | Voie Canada',
        seoDescription: 'Recent changes to Provincial Nominee Programs and how they affect your immigration strategy.',
        seoKeywords: ['PNP', 'provincial nominee', 'immigration', 'Canada']
      },
      {
        title: 'Settlement Tips for Newcomers',
        slug: 'settlement-tips-newcomers',
        excerpt: 'Essential advice for your first months in Canada.',
        content: `<h2>Your First Weeks in Canada</h2>
<p>Arriving in Canada is just the beginning. Here's what you need to do in your first weeks:</p>
<ul>
<li>Apply for your Social Insurance Number (SIN)</li>
<li>Open a Canadian bank account</li>
<li>Apply for provincial health insurance</li>
<li>Get a Canadian phone number</li>
<li>Find temporary accommodation</li>
</ul>
<h2>Housing in Canada</h2>
<p>Finding permanent housing can take time. Consider:</p>
<ul>
<li>Temporary furnished rentals while you search</li>
<li>Rental websites and platforms</li>
<li>Neighborhood research for schools, transit, amenities</li>
<li>Understanding tenant rights in your province</li>
</ul>
<h2>Employment</h2>
<p>Finding work in Canada may require:</p>
<ul>
<li>Canadian credential assessment</li>
<li>Resume formatting for Canadian employers</li>
<li>Networking and job search strategies</li>
<li>Understanding workplace culture</li>
</ul>
<h2>Building Your New Life</h2>
<p>Canada offers excellent quality of life. Take advantage of community centers, libraries, cultural events, and newcomer services to build your network.</p>`,
        category: 'Settlement',
        isPublished: true,
        publishedAt: new Date('2026-02-20'),
        seoTitle: 'Newcomer Settlement Tips | Voie Canada',
        seoDescription: 'Essential advice for your first months in Canada as a newcomer.',
        seoKeywords: ['settlement', 'newcomers', 'Canada', 'tips']
      }
    ]);

    console.log('Default blog posts created successfully');
    return blogs;
  } catch (error) {
    console.error('Error creating default blogs:', error);
  }
};

// Run all seed functions
export const runSeed = async () => {
  console.log('Running seed...');
  await createAdminUser();
  await createDefaultSettings();
  await createDefaultCategories();
  await createDefaultTags();
  await createDefaultBlogs();
  console.log('Seed completed');
};