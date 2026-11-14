const express = require('express');
const router = express.Router();
const {
  createAppointment,
  createPublicAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createAppointmentValidator,
  updateAppointmentStatusValidator,
  filterAppointmentValidator,
} = require('../validators/appointmentValidator');
const { ROLES } = require('../utils/constants');

// Public route for appointment booking modal
router.post('/public', createPublicAppointment);

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

// ─── Patient Routes ───────────────────────────────────────────────────────────

/**
 * @swagger
 * /appointments:
 *   post:
 *     tags: [Appointments]
 *     summary: Book a new appointment (Patient)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [appointmentDate, appointmentTime, treatmentType]
 *             properties:
 *               appointmentDate: { type: string, format: date, example: "2026-07-15" }
 *               appointmentTime: { type: string, example: "09:00" }
 *               treatmentType: { type: string, example: "Teeth Cleaning" }
 *               notes: { type: string }
 *     responses:
 *       201: { description: Appointment booked }
 *       409: { description: Time slot already booked }
 */
router.post('/', authenticate, authorize(ROLES.PATIENT), createAppointmentValidator, validate, createAppointment);

/**
 * @swagger
 * /appointments/my:
 *   get:
 *     tags: [Appointments]
 *     summary: Get my appointments (Patient)
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, confirmed, completed, cancelled] }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of appointments }
 */
router.get('/my', authenticate, authorize(ROLES.PATIENT), filterAppointmentValidator, validate, getMyAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     tags: [Appointments]
 *     summary: Get appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Appointment details }
 *       403: { description: Access denied }
 *       404: { description: Not found }
 */
router.get('/:id', authenticate, getAppointmentById);

/**
 * @swagger
 * /appointments/{id}/cancel:
 *   patch:
 *     tags: [Appointments]
 *     summary: Cancel own appointment (Patient)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancellationReason: { type: string }
 *     responses:
 *       200: { description: Appointment cancelled }
 */
router.patch('/:id/cancel', authenticate, authorize(ROLES.PATIENT), cancelAppointment);

// ─── Admin Routes ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: Get all appointments (Admin)
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: patientId
 *         schema: { type: string }
 *     responses:
 *       200: { description: All appointments }
 */
router.get('/admin/all', authenticate, authorize(ROLES.ADMIN), filterAppointmentValidator, validate, getAllAppointments);

/**
 * @swagger
 * /admin/appointments/{id}/status:
 *   patch:
 *     tags: [Appointments]
 *     summary: Update appointment status (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [confirmed, completed, cancelled] }
 *               cancellationReason: { type: string }
 *     responses:
 *       200: { description: Status updated }
 */
router.patch('/:id/status', authenticate, authorize(ROLES.ADMIN), updateAppointmentStatusValidator, validate, updateAppointmentStatus);

module.exports = router;
