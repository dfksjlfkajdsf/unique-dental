const { body } = require('express-validator');

const createMedicalRecordValidator = [
  body('patientId')
    .notEmpty().withMessage('Patient ID is required')
    .isMongoId().withMessage('Invalid patient ID'),

  body('diagnosis')
    .trim()
    .notEmpty().withMessage('Diagnosis is required')
    .isLength({ max: 1000 }).withMessage('Diagnosis cannot exceed 1000 characters'),

  body('prescription')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Prescription cannot exceed 2000 characters'),

  body('treatmentNotes')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Treatment notes cannot exceed 2000 characters'),

  body('attachmentUrl')
    .optional()
    .custom((val) => {
      if (!val) return true;
      if (val.startsWith('/uploads/') || /^https?:\/\/.+/.test(val)) return true;
      throw new Error('Attachment must be a valid URL or upload path');
    }),

  body('appointmentId')
    .optional()
    .isMongoId().withMessage('Invalid appointment ID'),
];

const updateMedicalRecordValidator = [
  body('diagnosis')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 }).withMessage('Diagnosis must be between 1 and 1000 characters'),

  body('prescription')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Prescription cannot exceed 2000 characters'),

  body('treatmentNotes')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Treatment notes cannot exceed 2000 characters'),

  body('attachmentUrl')
    .optional()
    .custom((val) => {
      if (!val) return true;
      if (val.startsWith('/uploads/') || /^https?:\/\/.+/.test(val)) return true;
      throw new Error('Attachment must be a valid URL or upload path');
    }),

  body('patientId').not().exists().withMessage('Patient ID cannot be changed'),
];

module.exports = { createMedicalRecordValidator, updateMedicalRecordValidator };
