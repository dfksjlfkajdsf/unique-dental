const mongoose = require('mongoose');
const { APPOINTMENT_STATUS, TREATMENT_TYPES, APPOINTMENT_TIMES } = require('../utils/constants');

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         patientId: { type: string }
 *         appointmentDate: { type: string, format: date }
 *         appointmentTime: { type: string, example: "09:00" }
 *         treatmentType: { type: string }
 *         notes: { type: string }
 *         status: { type: string, enum: [pending, confirmed, completed, cancelled] }
 *         createdAt: { type: string, format: date-time }
 */
const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Patient ID is required'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required'],
      enum: { values: APPOINTMENT_TIMES, message: 'Invalid appointment time slot' },
    },
    treatmentType: {
      type: String,
      required: [true, 'Treatment type is required'],
      enum: { values: TREATMENT_TYPES, message: 'Invalid treatment type' },
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(APPOINTMENT_STATUS),
      default: APPOINTMENT_STATUS.PENDING,
    },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cancellationReason: { type: String, trim: true },
  },
  { timestamps: true }
);

// Compound index to prevent double booking
appointmentSchema.index(
  { appointmentDate: 1, appointmentTime: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $nin: ['cancelled'] } },
  }
);
appointmentSchema.index({ patientId: 1, status: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
