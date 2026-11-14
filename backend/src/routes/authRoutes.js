const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerValidator, loginValidator, updateProfileValidator } = require('../validators/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new patient
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, phone]
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, example: john@example.com }
 *               password: { type: string, example: Password1 }
 *               phone: { type: string, example: "+1-555-0100" }
 *     responses:
 *       201: { description: Registration successful }
 *       400: { description: Validation error }
 *       409: { description: Email already exists }
 */
router.post('/register', authLimiter, registerValidator, validate, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login with email and password
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid credentials }
 */
router.post('/login', authLimiter, loginValidator, validate, login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags: [Authentication]
 *     summary: Get current user profile
 *     responses:
 *       200: { description: Profile data }
 *   patch:
 *     tags: [Authentication]
 *     summary: Update current user profile (name/phone only)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *     responses:
 *       200: { description: Profile updated }
 */
router.get('/profile', authenticate, getProfile);
router.patch('/profile', authenticate, updateProfileValidator, validate, updateProfile);

module.exports = router;
