import Settings from '../models/Settings.js';

// @route   GET /api/settings
// @desc    Get site settings (public)
// @access  Public
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/settings/public
// @desc    Get public settings (for website)
// @access  Public
export const getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    // Return only public fields
    const publicSettings = {
      siteName: settings.siteName,
      siteTagline: settings.siteTagline,
      logo: settings.logo,
      hero: settings.hero,
      trustStats: settings.trustStats,
      differentiator: settings.differentiator,
      contact: {
        email: settings.contact.email,
        phone: settings.contact.phone,
        whatsapp: settings.contact.whatsapp,
        offices: settings.contact.offices
      },
      socialLinks: settings.socialLinks,
      certifications: settings.certifications,
      ctaSection: settings.ctaSection,
      footer: settings.footer,
      seoDefaults: settings.seoDefaults,
      // Added missing fields for frontend
      processSteps: settings.processSteps,
      faqs: settings.faqs,
      homepageSections: settings.homepageSections,
      statsSection: settings.statsSection,
      testimonialsSection: settings.testimonialsSection,
      ctaBanner: settings.ctaBanner,
      aboutPage: settings.aboutPage
    };

    res.json({
      success: true,
      data: publicSettings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (admin only)
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate(
        {},
        { $set: req.body },
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/settings/hero
// @desc    Update hero section
// @access  Private (admin only)
export const updateHero = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    settings.hero = { ...settings.hero, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: 'Hero section updated successfully',
      data: settings.hero
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/settings/trust-stats
// @desc    Update trust stats
// @access  Private (admin only)
export const updateTrustStats = async (req, res) => {
  try {
    const { stats } = req.body;

    const settings = await Settings.getSettings();
    settings.trustStats = stats;
    await settings.save();

    res.json({
      success: true,
      message: 'Trust stats updated successfully',
      data: settings.trustStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/settings/contact
// @desc    Update contact information
// @access  Private (admin only)
export const updateContact = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    settings.contact = { ...settings.contact, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: 'Contact information updated successfully',
      data: settings.contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/settings/social
// @desc    Update social links
// @access  Private (admin only)
export const updateSocialLinks = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    settings.socialLinks = { ...settings.socialLinks, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: 'Social links updated successfully',
      data: settings.socialLinks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/settings/cta
// @desc    Update CTA section
// @access  Private (admin only)
export const updateCTA = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    settings.ctaSection = { ...settings.ctaSection, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: 'CTA section updated successfully',
      data: settings.ctaSection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};