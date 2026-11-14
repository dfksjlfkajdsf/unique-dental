const path    = require('path');
const fs      = require('fs');
const Gallery = require('../models/Gallery');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { getPagination, buildPaginationMeta } = require('../utils/pagination');
const { isCloudinaryConfigured, uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// GET /api/v1/gallery  — public
const getGallery = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const [items, total] = await Promise.all([
      Gallery.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Gallery.countDocuments(filter),
    ]);

    ApiResponse.paginated(res, { gallery: items, cloudinaryConfigured: isCloudinaryConfigured() }, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/gallery  — admin only (multipart/form-data)
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return next(ApiError.badRequest('Image file is required'));

    const { caption, captionNp, category } = req.body;
    if (!caption || !caption.trim()) {
      try { if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); } catch (e) {} // clean up orphaned file
      return next(ApiError.badRequest('Caption is required'));
    }

    let imageUrl;
    let cloudinaryPublicId = null;
    let source = 'local';

    if (isCloudinaryConfigured()) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.path, 'unique-dental/gallery');
        imageUrl = uploadResult.secure_url;
        cloudinaryPublicId = uploadResult.public_id;
        source = 'cloudinary';
      } finally {
        // Clean up temporary local file after Cloudinary upload
        try { if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); } catch (e) {}
      }
    } else {
      const host = req.get('host');
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      imageUrl = `${protocol}://${host}/uploads/gallery/${req.file.filename}`;
      source = 'local';
    }

    const item = await Gallery.create({
      imageUrl,
      filename: req.file.filename,
      cloudinaryPublicId,
      source,
      caption: caption.trim(),
      captionNp: captionNp ? captionNp.trim() : undefined,
      category: category || 'Our Clinic',
      uploadedBy: req.user._id,
    });

    ApiResponse.created(res, { image: item }, 'Image uploaded successfully');
  } catch (err) {
    if (req.file) { try { if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); } catch (e) {} }
    next(err);
  }
};

// DELETE /api/v1/gallery/:id  — admin only
const deleteImage = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return next(ApiError.notFound('Gallery image not found'));

    // If hosted on Cloudinary, delete from Cloudinary
    if (item.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(item.cloudinaryPublicId);
      } catch (cloudErr) {
        // Ignore remote delete error so database record is still removed
      }
    }

    // Delete file from disk safely if present
    if (item.filename) {
      const filePath = path.join(__dirname, '../../uploads/gallery', item.filename);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (fsErr) {
        // Ignore file deletion error so database record is still removed
      }
    }

    await item.deleteOne();
    ApiResponse.success(res, {}, 'Image deleted');
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/gallery/:id — admin only
const updateImage = async (req, res, next) => {
  try {
    const { caption, captionNp, category } = req.body;
    const item = await Gallery.findById(req.params.id);
    if (!item) return next(ApiError.notFound('Gallery image not found'));

    if (caption !== undefined) item.caption = caption.trim();
    if (captionNp !== undefined) item.captionNp = captionNp.trim();
    if (category !== undefined) item.category = category;

    await item.save();
    ApiResponse.success(res, { image: item }, 'Image updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { getGallery, uploadImage, deleteImage, updateImage };
