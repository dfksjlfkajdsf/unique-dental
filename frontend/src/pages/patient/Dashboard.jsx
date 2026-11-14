import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import {
  CalendarDays, Clock, CheckCircle, XCircle, Plus, Stethoscope,
  User, ChevronRight, Sparkles, Phone, ArrowRight,
} from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Spinner from '../../components/ui/Spinner';
import { format } from 'date-fns';

const PHONE = 'tel:071537300';
const WHATSAPP = 'https://wa.me/9779854040984';

const WaIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/appointments/my', { params: { limit: 5 } })
      .then((r) => setAppointments(r.data.data.appointments))
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    pending:   appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  };

  const nextAppt = appointments.find((a) => ['pending', 'confirmed'].includes(a.status));

  const stats = [
    { label: 'Pending',   value: counts.pending,   icon: Clock,        bg: 'bg-amber-50',   iconColor: 'text-amber-500',  border: 'border-amber-100',  num: 'text-amber-600' },
    { label: 'Confirmed', value: counts.confirmed,  icon: CalendarDays, bg: 'bg-blue-50',    iconColor: 'text-blue-500',   border: 'border-blue-100',   num: 'text-blue-600' },
    { label: 'Completed', value: counts.completed,  icon: CheckCircle,  bg: 'bg-emerald-50', iconColor: 'text-emerald-500',border: 'border-emerald-100',num: 'text-emerald-600' },
    { label: 'Cancelled', value: counts.cancelled,  icon: XCircle,      bg: 'bg-red-50',     iconColor: 'text-red-400',    border: 'border-red-100',    num: 'text-red-500' },
  ];

  const quickActions = [
    { label: 'Book Appointment', desc: 'Schedule a new visit', icon: Plus,         to: '/appointments/book', style: 'bg-primary-700 hover:bg-primary-800 text-white', iconBg: 'bg-white/20' },
    { label: 'My Appointments',  desc: 'View all bookings',    icon: CalendarDays, to: '/appointments',      style: 'bg-white hover:shadow-lg text-gray-900 border border-gray-200', iconBg: 'bg-primary-50' },
    { label: 'Medical Records',  desc: 'Your health history',  icon: Stethoscope,  to: '/medical-records',   style: 'bg-white hover:shadow-lg text-gray-900 border border-gray-200', iconBg: 'bg-blue-50' },
    { label: 'My Profile',       desc: 'Edit your details',    icon: User,         to: '/profile',           style: 'bg-white hover:shadow-lg text-gray-900 border border-gray-200', iconBg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">

      {/* ── HERO BANNER ── */}
      <div className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 rounded-3xl px-7 pt-8 pb-10 overflow-hidden">
        {/* decorative */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-primary-700/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/30 border border-primary-400/30 text-primary-300 text-xs font-semibold mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse" />
              Patient Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Welcome back,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                {user?.name}
              </span>
            </h1>
            <p className="text-primary-300 mt-2 text-sm">
              Unique Dental &amp; Implant Centre Pvt. Ltd. · Puspalal Park, Butwal
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
            <Link
              to="/appointments/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-accent-600/30 text-sm"
            >
              <Plus className="h-4 w-4" /> Book Appointment
            </Link>
            <div className="flex gap-2">
              <a href={PHONE} className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-xl transition-colors">
                <Phone className="h-3.5 w-3.5" /> Call Us
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366]/80 hover:bg-[#25D366] text-white text-xs font-semibold rounded-xl transition-colors">
                <WaIcon /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">

        {/* ── NEXT APPOINTMENT HIGHLIGHT ── */}
        {nextAppt && (
          <div className="bg-white rounded-2xl border border-primary-100 shadow-xl shadow-primary-100/50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-600/30">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-0.5">Next Appointment</p>
                <p className="font-extrabold text-gray-900">{nextAppt.treatmentType}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(nextAppt.appointmentDate), 'EEEE, MMMM d, yyyy')} · {nextAppt.appointmentTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <StatusBadge status={nextAppt.status} />
              <Link to="/appointments" className="inline-flex items-center gap-1 text-primary-700 font-bold text-sm hover:text-primary-900 transition-colors">
                View <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

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

        {/* ── QUICK ACTIONS ── */}
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map(({ label, desc, icon: Icon, to, style, iconBg }) => (
              <Link
                key={to}
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

        {/* ── RECENT APPOINTMENTS ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Recent Appointments</h2>
            <Link to="/appointments" className="text-sm font-semibold text-primary-700 hover:text-primary-900 flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12 bg-white rounded-2xl border border-gray-100">
              <Spinner />
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
              <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-7 w-7 text-primary-400" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">No appointments yet</p>
              <p className="text-sm text-gray-400 mb-5">Book your first visit — we'd love to see you!</p>
              <Link to="/appointments/book" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-xl transition-colors text-sm">
                <Plus className="h-4 w-4" /> Book Appointment
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {appointments.map((apt) => (
                <div key={apt._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{apt.treatmentType}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {format(new Date(apt.appointmentDate), 'MMM d, yyyy')} · {apt.appointmentTime}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── CLINIC INFO STRIP ── */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="text-white font-extrabold text-base">Need help or have a question?</p>
            <p className="text-primary-300 text-sm mt-0.5">Our team at Puspalal Park, Butwal is always here for you.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a href={PHONE} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold rounded-xl transition-colors">
              <Phone className="h-4 w-4" /> 071-537300
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1db954] text-white text-sm font-bold rounded-xl transition-colors">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
