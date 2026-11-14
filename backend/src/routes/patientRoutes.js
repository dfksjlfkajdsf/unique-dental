const express = require('express');
const router = express.Router();
const { getAllPatients, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const { authenticate, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/constants');

/**
 * @swagger
 * tags:
 *   name: Patients (Admin)
 *   description: Admin patient management
 */

/**
 * @swagger
 * /admin/patients:
 *   get:
 *     tags: [Patients (Admin)]
 *     summary: Get all patients
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name, email or phone
 *       - in: query
 *         name: isActive
 *         schema: { type: boolean }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of patients }
 */
router.get('/', authenticate, authorize(ROLES.ADMIN), getAllPatients);

/**
 * @swagger
 * /admin/patients/{id}:
 *   get:
 *     tags: [Patients (Admin)]
 *     summary: Get patient by ID with recent history
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Patient details }
 *       404: { description: Not found }
 *   patch:
 *     tags: [Patients (Admin)]
 *     summary: Update patient information
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200: { description: Patient updated }
 *   delete:
 *     tags: [Patients (Admin)]
 *     summary: Deactivate patient account
 *     responses:
 *       200: { description: Account deactivated }
 */
router.get('/:id', authenticate, authorize(ROLES.ADMIN), getPatientById);
router.patch('/:id', authenticate, authorize(ROLES.ADMIN), updatePatient);
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), deletePatient);

module.exports = router;
