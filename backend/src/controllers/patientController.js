const User = require('../models/User');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { getPagination, buildPaginationMeta } = require('../utils/pagination');
const { ROLES } = require('../utils/constants');

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/v1/admin/patients
const getAllPatients = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = { role: ROLES.PATIENT };

    if (req.query.search) {
      const sanitized = escapeRegExp(req.query.search.trim());
      filter.$or = [
        { name: { $regex: sanitized, $options: 'i' } },
        { email: { $regex: sanitized, $options: 'i' } },
        { phone: { $regex: sanitized, $options: 'i' } },
      ];
    }

    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }

    const [patients, total] = await Promise.all([
      User.find(filter).select('-password -__v').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    ApiResponse.paginated(res, { patients }, buildPaginationMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/patients/:id
const getPatientById = async (req, res, next) => {
  try {
    const patient = await User.findOne({ _id: req.params.id, role: ROLES.PATIENT }).select('-password -__v');
    if (!patient) return next(ApiError.notFound('Patient not found'));

    const [appointments, medicalRecords] = await Promise.all([
      Appointment.find({ patientId: patient._id }).sort({ appointmentDate: -1 }).limit(5),
      MedicalRecord.find({ patientId: patient._id }).sort({ createdAt: -1 }).limit(5),
    ]);

    ApiResponse.success(res, { patient, recentAppointments: appointments, recentMedicalRecords: medicalRecords });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/admin/patients/:id
const updatePatient = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'phone', 'isActive'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const patient = await User.findOneAndUpdate(
      { _id: req.params.id, role: ROLES.PATIENT },
      updates,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!patient) return next(ApiError.notFound('Patient not found'));

    ApiResponse.success(res, { patient }, 'Patient updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/patients/:id
const deletePatient = async (req, res, next) => {
  try {
    const patient = await User.findOne({ _id: req.params.id, role: ROLES.PATIENT });
    if (!patient) return next(ApiError.notFound('Patient not found'));

    // Soft delete — deactivate rather than hard delete to preserve medical history
    patient.isActive = false;
    await patient.save();

    ApiResponse.success(res, null, 'Patient account deactivated');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPatients, getPatientById, updatePatient, deletePatient };
