const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    imageUrl:           { type: String, required: true },
    filename:           { type: String },
    cloudinaryPublicId: { type: String },
    source:             { type: String, enum: ['cloudinary', 'local', 'static'], default: 'local' },
    caption:            { type: String, required: true, trim: true, maxlength: 300 },
    captionNp:          { type: String, trim: true, maxlength: 400 },
    category:           { 
      type: String, 
      enum: [
        'Our Branches', 'Branches',
        'Our Clinic', 'Clinic',
        'Our Team', 'Team',
        'Dental Camps', 'Camps',
        'Treatments',
        'Happy Patients', 'Smiles'
      ], 
      default: 'Our Clinic' 
    },
    uploadedBy:         { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
