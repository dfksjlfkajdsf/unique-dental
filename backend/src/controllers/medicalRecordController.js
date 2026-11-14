const MedicalRecord = require('../models/MedicalRecord');
const User = require('../models/User');
const { ApiResponse, ApiError } = require('../utils/apiResponse');
const { getPagination, buildPaginationMeta } = require('../utils/pagination');
const { ROLES } = require('../utils/constants');

// ─── Admin: Create Medical Record ────────────────────────────────────────────
// POST /api/v1/admin/medical-records
const createMedicalRecord = async (req, res, next) => {
  try {
    const { patientId } = req.body;

    const patient = await User.findOne({ _id: patientId, role: ROLES.PATIENT });
    if (!patient) return next(ApiError.notFound('Patient not found'));

    const record = await MedicalRecord.create({ ...req.body, createdBy: req.user._id });
    await record.populate('patientId', 'name email');

    ApiResponse.created(res, { record }, 'Medical record created');
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Get All Medical Records ──────────────────────────────────────────
// GET /api/v1/admin/medical-records
const getAllMedicalRecords = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};
    if (req.query.patientId) filter.patientId = req.query.patientId;

    const [records, total] = await Promise.all([
      MedicalRecord.find(filter)
        .populate('patientId', 'name email phone')
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MedicalRecord.countDocuments(filter),
    ]);

    ApiResponse.paginated(res, { records }, buildPaginationMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Update Medical Record ────────────────────────────────────────────
// PATCH /api/v1/admin/medical-records/:id
const updateMedicalRecord = async (req, res, next) => {
  try {
    const allowedFields = ['diagnosis', 'prescription', 'treatmentNotes', 'attachmentUrl'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const record = await MedicalRecord.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('patientId', 'name email');

    if (!record) return next(ApiError.notFound('Medical record not found'));

    ApiResponse.success(res, { record }, 'Medical record updated');
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Delete Medical Record ────────────────────────────────────────────
// DELETE /api/v1/admin/medical-records/:id
const deleteMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!record) return next(ApiError.notFound('Medical record not found'));
    ApiResponse.success(res, null, 'Medical record deleted');
  } catch (error) {
    next(error);
  }
};

// ─── Patient: View Own Medical Records ───────────────────────────────────────
// GET /api/v1/medical-records/my
const getMyMedicalRecords = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = { patientId: req.user._id };

    const [records, total] = await Promise.all([
      MedicalRecord.find(filter)
        .populate('appointmentId', 'appointmentDate appointmentTime treatmentType')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MedicalRecord.countDocuments(filter),
    ]);

    ApiResponse.paginated(res, { records }, buildPaginationMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

// ─── Patient: View Single Own Medical Record ──────────────────────────────────
// GET /api/v1/medical-records/:id
const getMedicalRecordById = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patientId', 'name email phone')
      .populate('appointmentId', 'appointmentDate appointmentTime treatmentType');

    if (!record) return next(ApiError.notFound('Medical record not found'));

    if (
      req.user.role === ROLES.PATIENT &&
      record.patientId._id.toString() !== req.user._id.toString()
    ) {
      return next(ApiError.forbidden('Access denied'));
    }

    ApiResponse.success(res, { record });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMyMedicalRecords,
  getMedicalRecordById,
};
