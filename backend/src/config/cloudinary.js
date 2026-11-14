const cloudinary = require('cloudinary').v2;

const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_URL ||
    (process.env.CLOUDINARY_CLOUD_NAME &&
     process.env.CLOUDINARY_API_KEY &&
     process.env.CLOUDINARY_API_SECRET &&
     process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name')
  );
};

if (isCloudinaryConfigured()) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
    });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key:    process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure:     true,
    });
  }
}

/**
 * Upload a local file to Cloudinary
 * @param {string} filePath - Path to file on disk
 * @param {string} folder - Target folder in Cloudinary
 * @returns {Promise<{ secure_url: string, public_id: string, [key: string]: any }>}
 */
const uploadToCloudinary = async (filePath, folder = 'unique-dental/gallery') => {
  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'image',
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  });
};

/**
 * Delete an asset from Cloudinary by public_id
 * @param {string} publicId
 * @returns {Promise<any>}
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
};

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  uploadToCloudinary,
  deleteFromCloudinary,
};
