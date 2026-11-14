const express = require('express');
const router = express.Router();

router.use('/auth',           require('./authRoutes'));
router.use('/appointments',   require('./appointmentRoutes'));
router.use('/medical-records',require('./medicalRecordRoutes'));
router.use('/admin/patients', require('./patientRoutes'));
router.use('/gallery',        require('./galleryRoutes'));

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Dental Booking System API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

module.exports = router;
