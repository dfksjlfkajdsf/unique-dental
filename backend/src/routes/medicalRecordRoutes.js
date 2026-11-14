const express = require('express');
const router = express.Router();
const {
  createMedicalRecord,
  getAllMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMyMedicalRecords,
  getMedicalRecordById,
} = require('../controllers/medicalRecordController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createMedicalRecordValidator, updateMedicalRecordValidator } = require('../validators/medicalRecordValidator');
const { ROLES } = require('../utils/constants');

/**
 * @swagger
 * tags:
 *   name: Medical Records
 *   description: Medical record management
 */

// ─── Patient Routes ───────────────────────────────────────────────────────────

/**
 * @swagger
 * /medical-records/my:
 *   get:
 *     tags: [Medical Records]
 *     summary: Get my medical records (Patient)
 *     responses:
 *       200: { description: List of medical records }
 */
router.get('/my', authenticate, authorize(ROLES.PATIENT), getMyMedicalRecords);

/**
 * @swagger
 * /medical-records/{id}:
 *   get:
 *     tags: [Medical Records]
 *     summary: Get medical record by ID (own record for Patient, any for Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Medical record }
 *       403: { description: Access denied }
 *       404: { description: Not found }
 */
router.get('/:id', authenticate, getMedicalRecordById);

// ─── Admin Routes ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /admin/medical-records:
 *   post:
 *     tags: [Medical Records]
 *     summary: Create a medical record (Admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [patientId, diagnosis]
 *             properties:
 *               patientId: { type: string }
 *               appointmentId: { type: string }
 *               diagnosis: { type: string }
 *               prescription: { type: string }
 *               treatmentNotes: { type: string }
 *               attachmentUrl: { type: string }
 *     responses:
 *       201: { description: Record created }
 *   get:
 *     tags: [Medical Records]
 *     summary: Get all medical records (Admin)
 *     parameters:
 *       - in: query
 *         name: patientId
 *         schema: { type: string }
 *     responses:
 *       200: { description: All records }
 */
router.post('/admin', authenticate, authorize(ROLES.ADMIN), createMedicalRecordValidator, validate, createMedicalRecord);
router.get('/admin/all', authenticate, authorize(ROLES.ADMIN), getAllMedicalRecords);

/**
 * @swagger
 * /admin/medical-records/{id}:
 *   patch:
 *     tags: [Medical Records]
 *     summary: Update medical record (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Record updated }
 *   delete:
 *     tags: [Medical Records]
 *     summary: Delete medical record (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Record deleted }
 */
router.patch('/admin/:id', authenticate, authorize(ROLES.ADMIN), updateMedicalRecordValidator, validate, updateMedicalRecord);
router.delete('/admin/:id', authenticate, authorize(ROLES.ADMIN), deleteMedicalRecord);

module.exports = router;
