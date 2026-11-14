import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppointments } from '../../hooks/useAppointments';
import StatusBadge from '../../components/ui/StatusBadge';
import Spinner from '../../components/ui/Spinner';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import {
  CalendarDays, Check, CheckCircle2, X, Phone, Mail, User,
  Clock, Stethoscope, FileText, Sparkles, ChevronRight, AlertCircle
} from 'lucide-react';
import { format, isToday, isYesterday, differenceInHours } from 'date-fns';
import toast from 'react-hot-toast';

const STATUSES = ['', 'pending', 'confirmed', 'completed', 'cancelled'];

const STATUS_STYLES = {
  pending:   'bg-amber-50 border-l-amber-400',
  confirmed: 'bg-blue-50 border-l-blue-400',
  completed: 'bg-green-50 border-l-green-400',
  cancelled: 'bg-red-50 border-l-red-300 opacity-70',
};

function isNew(apt) {
  return apt.status === 'pending' && differenceInHours(new Date(), new Date(apt.createdAt)) < 24;
}

function formatDate(d) {
  const date = new Date(d);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d, yyyy');
}

export default function AdminAppointments() {
  const { appointments, pagination, loading, fetch, updateStatus } = useAppointments(true);
  const [filters, setFilters]   = useState({ status: '', date: '', page: 1 });
  const [busy, setBusy]         = useState(null);
  const [selected, setSelected] = useState(null); // detail modal

  const applyFilter = (updates) => {
    const next = { ...filters, ...updates, page: 1 };
    setFilters(next);
    fetch({ status: next.status || undefined, date: next.date || undefined, page: next.page });
  };

  const handle = async (id, status, reason = '') => {
    setBusy(id + status);
    try {
      await updateStatus(id, status, reason);
      // refresh selected if it's the same one
      if (selected && selected._id === id) {
        setSelected((prev) => ({ ...prev, status }));
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'Action failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Appointments</h1>
        <span className="text-xs text-gray-400 font-medium">Newest first · click any row for full details</span>
      </div>

      {/* ── Filters ── */}
      <div className="card p-4 flex flex-wrap gap-3 items-center">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s || 'all'}
              onClick={() => applyFilter({ status: s })}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors capitalize ${
                filters.status === s
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
        <input
          type="date"
          className="input w-auto text-sm"
          value={filters.date}
          onChange={(e) => applyFilter({ date: e.target.value })}
        />
        {filters.date && (
          <button className="text-sm text-gray-400 hover:text-gray-600" onClick={() => applyFilter({ date: '' })}>
            Clear date
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : appointments.length === 0 ? (
          <EmptyState icon={CalendarDays} title="No appointments found" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    <th className="px-4 py-3 font-semibold">Patient</th>
                    <th className="px-4 py-3 font-semibold">Date &amp; Time</th>
                    <th className="px-4 py-3 font-semibold">Treatment</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((apt) => {
                    const fresh = isNew(apt);
                    return (
                      <tr
                        key={apt._id}
                        onClick={() => setSelected(apt)}
                        className={`cursor-pointer border-l-4 transition-colors hover:bg-primary-50/50 ${
                          STATUS_STYLES[apt.status] || 'border-l-gray-200'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary-700 font-bold text-xs">
                                {(apt.patientId?.name || '?').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold text-gray-900">{apt.patientId?.name || '—'}</p>
                                {fresh && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-extrabold uppercase tracking-widest border border-amber-200">
                                    <Sparkles className="h-2.5 w-2.5" /> NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">{apt.patientId?.phone || '—'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          <p className="font-semibold">{formatDate(apt.appointmentDate)}</p>
                          <p className="text-xs text-gray-400">{apt.appointmentTime}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-700 max-w-[160px]">
                          <p className="truncate font-medium">{apt.treatmentType}</p>
                          {apt.notes && (
                            <p className="text-xs text-gray-400 truncate">{apt.notes}</p>
                          )}
                        </td>
                        <td className="px-4 py-3"><StatusBadge status={apt.status} /></td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Quick call */}
                            {apt.patientId?.phone && (
                              <a
                                href={`tel:${apt.patientId.phone}`}
                                title={`Call ${apt.patientId.phone}`}
                                className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                              >
                                <Phone className="h-4 w-4" />
                              </a>
                            )}
                            {apt.status === 'pending' && (
                              <button
                                title="Confirm"
                                className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                                disabled={!!busy}
                                onClick={() => handle(apt._id, 'confirmed')}
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            {apt.status === 'confirmed' && (
                              <button
                                title="Mark Completed"
                                className="p-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                                disabled={!!busy}
                                onClick={() => handle(apt._id, 'completed')}
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                            )}
                            {['pending', 'confirmed'].includes(apt.status) && (
                              <button
                                title="Cancel"
                                className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                                disabled={!!busy}
                                onClick={() => handle(apt._id, 'cancelled', 'Cancelled by admin')}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              title="View Details"
                              className="p-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                              onClick={() => setSelected(apt)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <Pagination
                pagination={pagination}
                onPageChange={(p) => {
                  setFilters({ ...filters, page: p });
                  fetch({ ...filters, page: p });
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selected && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-5 flex items-center justify-between border-b border-gray-100 ${
              isNew(selected) ? 'bg-amber-50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-extrabold text-base">
                    {(selected.patientId?.name || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-gray-900 text-base">{selected.patientId?.name || '—'}</h3>
                    {isNew(selected) && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-extrabold uppercase tracking-widest border border-amber-200">
                        <Sparkles className="h-2.5 w-2.5" /> NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Booked {format(new Date(selected.createdAt), 'MMM d, yyyy · h:mm a')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Status</span>
                <StatusBadge status={selected.status} />
              </div>

              {/* Patient Contact Info */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 border border-gray-100">
                <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Patient Info</p>
                <div className="flex items-center gap-2.5">
                  <User className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{selected.patientId?.name || '—'}</span>
                </div>
                {selected.patientId?.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <a
                      href={`tel:${selected.patientId.phone}`}
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      {selected.patientId.phone}
                    </a>
                    <a
                      href={`tel:${selected.patientId.phone}`}
                      className="ml-auto inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full transition-colors shadow-sm"
                    >
                      <Phone className="h-3 w-3" /> Call Now
                    </a>
                  </div>
                )}
                {selected.patientId?.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <a
                      href={`mailto:${selected.patientId.email}`}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      {selected.patientId.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Appointment Details */}
              <div className="bg-primary-50/60 rounded-2xl p-4 space-y-2.5 border border-primary-100">
                <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">Appointment Details</p>
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">
                    {format(new Date(selected.appointmentDate), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{selected.appointmentTime}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Stethoscope className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-800">{selected.treatmentType}</span>
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="h-4 w-4 text-amber-600" />
                    <p className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Patient Notes</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.notes}</p>
                </div>
              )}

              {/* Cancellation reason */}
              {selected.status === 'cancelled' && selected.cancellationReason && (
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-0.5">Cancellation Reason</p>
                    <p className="text-sm text-red-700">{selected.cancellationReason}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 pb-6 flex flex-wrap gap-2">
              {selected.patientId?.phone && (
                <a
                  href={`tel:${selected.patientId.phone}`}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-2xl transition-colors shadow-sm"
                >
                  <Phone className="h-4 w-4" /> Call Patient
                </a>
              )}
              {selected.status === 'pending' && (
                <button
                  type="button"
                  disabled={!!busy}
                  onClick={() => handle(selected._id, 'confirmed')}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl transition-colors disabled:opacity-50"
                >
                  <Check className="h-4 w-4" /> Confirm
                </button>
              )}
              {selected.status === 'confirmed' && (
                <button
                  type="button"
                  disabled={!!busy}
                  onClick={() => handle(selected._id, 'completed')}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-2xl transition-colors disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" /> Mark Completed
                </button>
              )}
              {['pending', 'confirmed'].includes(selected.status) && (
                <button
                  type="button"
                  disabled={!!busy}
                  onClick={() => {
                    handle(selected._id, 'cancelled', 'Cancelled by admin');
                    setSelected((prev) => ({ ...prev, status: 'cancelled', cancellationReason: 'Cancelled by admin' }));
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-bold rounded-2xl transition-colors border border-red-200 disabled:opacity-50"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="ml-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-2xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
