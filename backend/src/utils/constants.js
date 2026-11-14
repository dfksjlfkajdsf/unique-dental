const ROLES = Object.freeze({ ADMIN: 'admin', PATIENT: 'patient' });

const APPOINTMENT_STATUS = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
});

const TREATMENT_TYPES = Object.freeze([
  'General Checkup',
  'Teeth Cleaning',
  'Tooth Extraction',
  'Root Canal',
  'Dental Filling',
  'Teeth Whitening',
  'Braces/Orthodontics',
  'Dental Implant',
  'Crown & Bridge',
  'Emergency Dental Care',
  'Other',
]);

const APPOINTMENT_TIMES = Object.freeze([
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
]);

module.exports = { ROLES, APPOINTMENT_STATUS, TREATMENT_TYPES, APPOINTMENT_TIMES };
