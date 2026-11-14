import { useEffect, useState } from 'react';
import api from '../../lib/api';
import {
  CalendarDays, Users, Clock, CheckCircle, ChevronRight,
  ArrowRight, Stethoscope, TrendingUp, ShieldCheck, Phone, Sparkles,
} from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Spinner from '../../components/ui/Spinner';
import { format, differenceInHours } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isNew = (apt) =>
    apt.status === 'pending' && apt.createdAt && differenceInHours(new Date(), new Date(apt.createdAt)) < 24;
  const [data, setData] = useState({
    appointments: [],
    counts: { total: 0, patients: 0, pending: 0, confirmed: 0, completed: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/appointments/admin/all', { params: { limit: 6 } }).catch(() => null),
      api.get('/admin/patients',          { params: { limit: 1 } }).catch(() => null),
      api.get('/appointments/admin/all',  { params: { status: 'pending',   limit: 1 } }).catch(() => null),
      api.get('/appointments/admin/all',  { params: { status: 'confirmed', limit: 1 } }).catch(() => null),
      api.get('/appointments/admin/all',  { params: { status: 'completed', limit: 1 } }).catch(() => null),
    ]).then(([aptRes, patientsRes, pendingRes, confirmedRes, completedRes]) => {
      setData({
        appointments: aptRes?.data?.data?.appointments || [],
        counts: {
          total:     aptRes?.data?.pagination?.total     || 0,
          patients:  patientsRes?.data?.pagination?.total || 0,
          pending:   pendingRes?.data?.pagination?.total  || 0,
          confirmed: confirmedRes?.data?.pagination?.total || 0,
          completed: completedRes?.data?.pagination?.total || 0,
        },
      });
    }).catch((err) => {
      console.error('Error fetching admin dashboard data:', err);
    }).finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Appointments', value: data.counts.total ?? 0,    icon: CalendarDays, bg: 'bg-blue-50',    iconColor: 'text-blue-500',    border: 'border-blue-100',    num: 'text-blue-600' },
    { label: 'Total Patients',     value: data.counts.patients ?? 0, icon: Users,        bg: 'bg-purple-50',  iconColor: 'text-purple-500',  border: 'border-purple-100',  num: 'text-purple-600' },
    { label: 'Pending',            value: data.counts.pending ?? 0,  icon: Clock,        bg: 'bg-amber-50',   iconColor: 'text-amber-500',   border: 'border-amber-100',   num: 'text-amber-600' },
    { label: 'Confirmed',          value: data.counts.confirmed ?? 0,icon: CheckCircle,  bg: 'bg-emerald-50', iconColor: 'text-emerald-500', border: 'border-emerald-100', num: 'text-emerald-600' },
  ];

  const quickLinks = [
    { label: 'Manage Appointments', desc: 'Confirm, complete or cancel bookings', icon: CalendarDays, to: '/admin/appointments', style: 'bg-primary-700 hover:bg-primary-800 text-white', iconBg: 'bg-white/20' },
    { label: 'Patients',            desc: 'Search, view and manage accounts',     icon: Users,        to: '/admin/patients',      style: 'bg-white hover:shadow-lg text-gray-900 border border-gray-200', iconBg: 'bg-purple-50' },
    { label: 'Medical Records',     desc: 'Create, view and delete records',      icon: Stethoscope,  to: '/admin/medical-records', style: 'bg-white hover:shadow-lg text-gray-900 border border-gray-200', iconBg: 'bg-blue-50' },
    { label: 'Analytics',           desc: `${data.counts.completed} completed visits`, icon: TrendingUp, to: '/admin/appointments', style: 'bg-white hover:shadow-lg text-gray-900 border border-gray-200', iconBg: 'bg-emerald-50' },
  ];

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="space-y-6">

      {/* ── HERO BANNER ── */}
      <div className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 rounded-3xl px-7 pt-8 pb-10 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-primary-700/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-semibold mb-4">
              <ShieldCheck className="h-3 w-3" />
              Admin Panel
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Welcome back,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                {user?.name}
              </span>
            </h1>
            <p className="text-primary-300 mt-2 text-sm">
              Unique Dental &amp; Implant Centre · Clinic Management
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
            <Link
              to="/admin/appointments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-accent-600/30 text-sm"
            >
              <CalendarDays className="h-4 w-4" /> Manage Appointments
            </Link>
            <div className="flex gap-2">
              <Link to="/admin/patients" className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-xl transition-colors">
                <Users className="h-3.5 w-3.5" /> Patients
              </Link>
              <Link to="/admin/medical-records" className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-xl transition-colors">
                <Stethoscope className="h-3.5 w-3.5" /> Records
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, bg, iconColor, border, num }) => (
          <div key={label} className={`bg-white rounded-2xl p-5 border ${border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
            <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-3`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <p className={`text-3xl font-extrabold ${num}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* ── QUICK LINKS ── */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Manage</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map(({ label, desc, icon: Icon, to, style, iconBg }) => (
            <Link
              key={to + label}
              to={to}
              className={`group rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 ${style}`}
            >
              <div className={`inline-flex p-2.5 rounded-xl w-fit ${iconBg}`}>
                <Icon className={`h-5 w-5 ${style.includes('text-white') ? 'text-white' : 'text-primary-600'}`} />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">{label}</p>
                <p className={`text-xs mt-0.5 ${style.includes('text-white') ? 'text-primary-200' : 'text-gray-400'}`}>{desc}</p>
              </div>
              <ChevronRight className={`h-4 w-4 mt-auto self-end opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all ${style.includes('text-white') ? 'text-white' : 'text-primary-600'}`} />
            </Link>
          ))}
        </div>
      </div>

      {/* ── PENDING ALERT ── */}
      {data.counts.pending > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm">
                {data.counts.pending} appointment{data.counts.pending > 1 ? 's' : ''} awaiting confirmation
              </p>
              <p className="text-amber-700 text-xs">Review and confirm pending bookings promptly.</p>
            </div>
          </div>
          <Link
            to="/admin/appointments"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-colors flex-shrink-0"
          >
            Review now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* ── RECENT APPOINTMENTS ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Recent Appointments</h2>
          <Link to="/admin/appointments" className="text-sm font-semibold text-primary-700 hover:text-primary-900 flex items-center gap-1 transition-colors">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Date &amp; Time</th>
                  <th className="px-5 py-3 font-semibold">Treatment</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">No appointments yet</td>
                  </tr>
                ) : data.appointments.map((apt) => {
                  const fresh = isNew(apt);
                  return (
                    <tr
                      key={apt._id}
                      onClick={() => navigate('/admin/appointments')}
                      className={`cursor-pointer transition-colors border-l-4 ${
                        fresh
                          ? 'border-l-amber-400 bg-amber-50/40 hover:bg-amber-50'
                          : apt.status === 'confirmed'  ? 'border-l-blue-400 hover:bg-blue-50/30'
                          : apt.status === 'completed'  ? 'border-l-emerald-400 hover:bg-emerald-50/30'
                          : apt.status === 'cancelled'  ? 'border-l-red-400 hover:bg-red-50/30'
                          : 'border-l-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {/* Patient */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-semibold text-gray-900">{apt.patientId?.name || apt.patientName || '—'}</p>
                              {fresh && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold leading-none">
                                  <Sparkles className="h-2.5 w-2.5" /> NEW
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">{apt.patientId?.email || apt.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Date & Time */}
                      <td className="px-5 py-3.5 text-gray-600">
                        <p>{format(new Date(apt.appointmentDate), 'MMM d, yyyy')}</p>
                        <p className="text-xs text-gray-400">{apt.appointmentTime}</p>
                      </td>
                      {/* Treatment */}
                      <td className="px-5 py-3.5 text-gray-700">{apt.treatmentType}</td>
                      {/* Status */}
                      <td className="px-5 py-3.5"><StatusBadge status={apt.status} /></td>
                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {(apt.patientId?.phone || apt.phone) && (
                            <a
                              href={`tel:${apt.patientId?.phone || apt.phone}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors"
                              title="Call patient"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              Call
                            </a>
                          )}
                          <Link
                            to="/admin/appointments"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                          >
                            Manage <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── COMPLETED STRIP ── */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-white font-extrabold text-base">
            {data.counts.completed} completed visits so far 🎉
          </p>
          <p className="text-emerald-300 text-sm mt-0.5">
            Keep delivering exceptional care to every patient.
          </p>
        </div>
        <Link
          to="/admin/medical-records"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-sm font-bold rounded-xl transition-colors flex-shrink-0"
        >
          <Stethoscope className="h-4 w-4" /> View Records
        </Link>
      </div>

    </div>
  );
}
