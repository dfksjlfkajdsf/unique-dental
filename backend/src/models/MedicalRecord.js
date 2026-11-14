const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalRecord:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         patientId: { type: string }
 *         appointmentId: { type: string }
 *         diagnosis: { type: string }
 *         prescription: { type: string }
 *         treatmentNotes: { type: string }
 *         attachmentUrl: { type: string }
 *         createdAt: { type: string, format: date-time }
 */
const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Patient ID is required'],
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    diagnosis: {
      type: String,
      required: [true, 'Diagnosis is required'],
      trim: true,
      maxlength: [1000, 'Diagnosis cannot exceed 1000 characters'],
    },
    prescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Prescription cannot exceed 2000 characters'],
    },
    treatmentNotes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Treatment notes cannot exceed 2000 characters'],
    },
    attachmentUrl: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

medicalRecordSchema.index({ patientId: 1, createdAt: -1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
