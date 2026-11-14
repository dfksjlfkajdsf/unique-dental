const { body, query } = require('express-validator');
const { TREATMENT_TYPES, APPOINTMENT_TIMES, APPOINTMENT_STATUS } = require('../utils/constants');

const createAppointmentValidator = [
  body('appointmentDate')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Invalid date format (use YYYY-MM-DD)')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) throw new Error('Appointment date cannot be in the past');
      return true;
    }),

  body('appointmentTime')
    .notEmpty().withMessage('Appointment time is required')
    .isIn(APPOINTMENT_TIMES).withMessage(`Valid times: ${APPOINTMENT_TIMES.join(', ')}`),

  body('treatmentType')
    .notEmpty().withMessage('Treatment type is required')
    .isIn(TREATMENT_TYPES).withMessage('Invalid treatment type'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters'),
];

const updateAppointmentStatusValidator = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(Object.values(APPOINTMENT_STATUS)).withMessage('Invalid status'),

  body('cancellationReason')
    .if(body('status').equals('cancelled'))
    .optional()
    .trim()
    .isLength({ max: 300 }).withMessage('Cancellation reason cannot exceed 300 characters'),
];

const filterAppointmentValidator = [
  query('status')
    .optional()
    .isIn(Object.values(APPOINTMENT_STATUS)).withMessage('Invalid status filter'),

  query('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),

  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
];

module.exports = { createAppointmentValidator, updateAppointmentStatusValidator, filterAppointmentValidator };
