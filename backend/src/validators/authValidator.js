const { body } = require('express-validator');

const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-()]{7,20}$/).withMessage('Invalid phone number format'),
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

const updateProfileValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[\d\s\-()]{7,20}$/).withMessage('Invalid phone number format'),

  body('email').not().exists().withMessage('Email cannot be updated through this endpoint'),
  body('password').not().exists().withMessage('Use the change-password endpoint'),
  body('role').not().exists().withMessage('Role cannot be updated'),
];

module.exports = { registerValidator, loginValidator, updateProfileValidator };
