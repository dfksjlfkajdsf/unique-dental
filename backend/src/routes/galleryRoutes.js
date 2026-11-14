const express = require('express');
const router  = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const upload  = require('../middleware/upload');
const { getGallery, uploadImage, deleteImage, updateImage } = require('../controllers/galleryController');
const { ROLES } = require('../utils/constants');

router.get('/',       getGallery);
router.post('/',      authenticate, authorize(ROLES.ADMIN), upload.single('image'), uploadImage);
router.put('/:id',    authenticate, authorize(ROLES.ADMIN), updateImage);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), deleteImage);

module.exports = router;
