import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, CalendarDays, Stethoscope, Users, LayoutDashboard, Images } from 'lucide-react';

const adminLinks = [
  { to: '/admin/dashboard',        label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/admin/appointments',     label: 'Appointments', icon: CalendarDays },
  { to: '/admin/patients',         label: 'Patients',     icon: Users },
  { to: '/admin/medical-records',  label: 'Records',      icon: Stethoscope },
  { to: '/admin/gallery',          label: 'Gallery',      icon: Images },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const links = adminLinks;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Unique Dental"
              className="w-11 h-11 rounded-full object-cover bg-white p-0.5 ring-2 ring-accent-400 shadow-sm group-hover:scale-105 transition-transform duration-200"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="font-bold text-base text-gray-900 leading-tight">
              Unique Dental<br />
              <span className="text-xs font-semibold text-amber-600">& Implant Centre</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(to)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary gap-1.5 text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-gray-100 px-4 py-2 flex gap-1 overflow-x-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              pathname.startsWith(to)
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
