const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { sendWelcome } = require('../services/emailService');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/v1/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return next(ApiError.conflict('Email already registered'));

    const user = await User.create({ name, email, password, phone });
    const token = signToken(user._id);

    sendWelcome(user); // non-blocking

    ApiResponse.created(res, { token, user: user.toSafeObject() }, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(ApiError.unauthorized('Invalid email or password'));
    }

    if (!user.isActive) return next(ApiError.unauthorized('Account is deactivated'));

    const token = signToken(user._id);
    ApiResponse.success(res, { token, user: user.toSafeObject() }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/auth/profile
const getProfile = async (req, res, next) => {
  try {
    ApiResponse.success(res, { user: req.user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'phone'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    ApiResponse.success(res, { user: user.toSafeObject() }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, updateProfile };
