import cloudinary from '../config/cloudinary.js';
import pkg from 'cloudinary';

const {UploadApiResponse} = pkg;

export const uploadImage = async (file, folder = 'voie-canada') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto'
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return {
      success: true,
      result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const uploadMultipleImages = async (files, folder = 'voie-canada') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    const results = await Promise.all(uploadPromises);

    return {
      success: true,
      images: results.map(r => ({
        url: r.url,
        public_id: r.public_id
      }))
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};