const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { getPagination, buildPaginationMeta } = require('../utils/pagination');
const { APPOINTMENT_STATUS, ROLES } = require('../utils/constants');
const {
  sendAppointmentBooked,
  sendAppointmentConfirmed,
  sendAppointmentCancelled,
  sendAdminNewBooking,
} = require('../services/emailService');

// ─── Patient: Create Appointment ─────────────────────────────────────────────
// POST /api/v1/appointments
const createAppointment = async (req, res, next) => {
  try {
    const { appointmentDate, appointmentTime, treatmentType, notes } = req.body;

    const date = new Date(appointmentDate);
    date.setHours(0, 0, 0, 0);

    // Prevent past bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return next(ApiError.badRequest('Cannot book appointments in the past'));

    // Prevent double booking (same slot)
    const conflict = await Appointment.findOne({
      appointmentDate: date,
      appointmentTime,
      status: { $nin: [APPOINTMENT_STATUS.CANCELLED] },
    });
    if (conflict) return next(ApiError.conflict('This time slot is already booked'));

    const appointment = await Appointment.create({
      patientId: req.user._id,
      appointmentDate: date,
      appointmentTime,
      treatmentType,
      notes,
    });

    try { sendAppointmentBooked(req.user, appointment); } catch (e) {}
    try { sendAdminNewBooking(req.user, appointment); } catch (e) {}

    ApiResponse.created(res, { appointment }, 'Appointment booked successfully');
  } catch (error) {
    next(error);
  }
};

// ─── Patient: Get My Appointments ────────────────────────────────────────────
// GET /api/v1/appointments/my
const getMyAppointments = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = { patientId: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.date) {
      const startOfDay = new Date(req.query.date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(req.query.date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }

    const [appointments, total] = await Promise.all([
      Appointment.find(filter).sort({ appointmentDate: -1 }).skip(skip).limit(limit),
      Appointment.countDocuments(filter),
    ]);

    ApiResponse.paginated(res, { appointments }, buildPaginationMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

// ─── Patient: Get Single Appointment ─────────────────────────────────────────
// GET /api/v1/appointments/:id
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patientId', 'name email phone');
    if (!appointment) return next(ApiError.notFound('Appointment not found'));

    // Patients can only view their own
    if (req.user.role === ROLES.PATIENT && appointment.patientId._id.toString() !== req.user._id.toString()) {
      return next(ApiError.forbidden('Access denied'));
    }

    ApiResponse.success(res, { appointment });
  } catch (error) {
    next(error);
  }
};

// ─── Patient: Cancel Own Appointment ─────────────────────────────────────────
// PATCH /api/v1/appointments/:id/cancel
const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return next(ApiError.notFound('Appointment not found'));

    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return next(ApiError.forbidden('Access denied'));
    }

    if (appointment.status === APPOINTMENT_STATUS.CANCELLED) {
      return next(ApiError.badRequest('Appointment is already cancelled'));
    }
    if (appointment.status === APPOINTMENT_STATUS.COMPLETED) {
      return next(ApiError.badRequest('Cannot cancel a completed appointment'));
    }

    appointment.status = APPOINTMENT_STATUS.CANCELLED;
    appointment.cancelledBy = req.user._id;
    appointment.cancellationReason = req.body.cancellationReason || 'Cancelled by patient';
    await appointment.save();

    try { sendAppointmentCancelled(req.user, appointment, appointment.cancellationReason); } catch (e) {}

    ApiResponse.success(res, { appointment }, 'Appointment cancelled');
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Get All Appointments ─────────────────────────────────────────────
// GET /api/v1/admin/appointments
const getAllAppointments = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.date) {
      const startOfDay = new Date(req.query.date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(req.query.date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }
    if (req.query.patientId) filter.patientId = req.query.patientId;

    const [appointments, total] = await Promise.all([
      Appointment.find(filter)
        .populate('patientId', 'name email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Appointment.countDocuments(filter),
    ]);

    ApiResponse.paginated(res, { appointments }, buildPaginationMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Update Appointment Status ────────────────────────────────────────
// PATCH /api/v1/admin/appointments/:id/status
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, cancellationReason } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return next(ApiError.notFound('Appointment not found'));

    if (appointment.status === APPOINTMENT_STATUS.COMPLETED) {
      return next(ApiError.badRequest('Cannot change status of a completed appointment'));
    }
    if (appointment.status === APPOINTMENT_STATUS.CANCELLED) {
      return next(ApiError.badRequest('Cannot change status of a cancelled appointment'));
    }

    const patient = await User.findById(appointment.patientId);

    appointment.status = status;
    if (status === APPOINTMENT_STATUS.CANCELLED) {
      appointment.cancelledBy = req.user._id;
      appointment.cancellationReason = cancellationReason || 'Cancelled by admin';
    }
    await appointment.save();

    if (patient) {
      if (status === APPOINTMENT_STATUS.CONFIRMED) try { sendAppointmentConfirmed(patient, appointment); } catch (e) {}
      if (status === APPOINTMENT_STATUS.CANCELLED)
        try { sendAppointmentCancelled(patient, appointment, appointment.cancellationReason); } catch (e) {}
    }

    ApiResponse.success(res, { appointment }, `Appointment ${status}`);
  } catch (error) {
    next(error);
  }
};

// ─── Public: Book Appointment ───────────────────────────────────────────────
// POST /api/v1/appointments/public
const createPublicAppointment = async (req, res, next) => {
  try {
    const { name, email, phone, appointmentDate, appointmentTime, treatmentType, notes } = req.body;

    if (!name || !email || !phone || !appointmentDate || !appointmentTime || !treatmentType) {
      return next(ApiError.badRequest('Please provide all required fields'));
    }

    const date = new Date(appointmentDate);
    date.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return next(ApiError.badRequest('Cannot book appointments in the past'));

    // Prevent double booking (same slot)
    const conflict = await Appointment.findOne({
      appointmentDate: date,
      appointmentTime,
      status: { $nin: [APPOINTMENT_STATUS.CANCELLED] },
    });
    if (conflict) return next(ApiError.conflict('This time slot is already booked'));

    // Find existing patient user or create a new patient account automatically
    let user = await User.findOne({ email });
    if (!user) {
      const randomPass = Math.random().toString(36).slice(-10) + 'A1!';
      user = await User.create({
        name,
        email,
        phone,
        password: randomPass,
        role: ROLES.PATIENT,
      });
    }

    const appointment = await Appointment.create({
      patientId: user._id,
      appointmentDate: date,
      appointmentTime,
      treatmentType,
      notes: notes || 'Booked via Website Pop-up',
    });

    try { sendAppointmentBooked(user, appointment); } catch (e) {}
    try { sendAdminNewBooking(user, appointment); } catch (e) {}

    ApiResponse.created(res, { appointment }, 'Appointment booked successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  createPublicAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus,
};
