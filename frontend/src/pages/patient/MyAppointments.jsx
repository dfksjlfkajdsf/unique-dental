import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';
import StatusBadge from '../../components/ui/StatusBadge';
import Spinner from '../../components/ui/Spinner';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import { CalendarDays, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const STATUSES = ['', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function MyAppointments() {
  const { appointments, pagination, loading, fetch, cancel } = useAppointments(false);
  const [filters, setFilters] = useState({ status: '', page: 1 });
  const [cancelling, setCancelling] = useState(null);

  const applyFilter = (updates) => {
    const next = { ...filters, ...updates, page: 1 };
    setFilters(next);
    fetch({ status: next.status || undefined, page: next.page });
  };

  const handleCancel = async (id) => {
    setCancelling(id);
    try {
      await cancel(id, 'Cancelled by patient');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Cancel failed');
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <Link to="/appointments/book" className="btn-primary self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Book New
        </Link>
      </div>

      {/* Filter bar */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s || 'all'}
              onClick={() => applyFilter({ status: s })}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                filters.status === s
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : appointments.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No appointments found"
            description="Book your first appointment to get started"
            action={
              <Link to="/appointments/book" className="btn-primary mt-2">
                <Plus className="h-4 w-4" /> Book Appointment
              </Link>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-3 font-medium">Date & Time</th>
                    <th className="px-4 py-3 font-medium">Treatment</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{format(new Date(apt.appointmentDate), 'MMM d, yyyy')}</p>
                        <p className="text-gray-500 text-xs">{apt.appointmentTime}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{apt.treatmentType}</td>
                      <td className="px-4 py-3"><StatusBadge status={apt.status} /></td>
                      <td className="px-4 py-3 text-right">
                        {['pending', 'confirmed'].includes(apt.status) && (
                          <button
                            className="btn-danger text-xs px-2.5 py-1.5 gap-1"
                            onClick={() => handleCancel(apt._id)}
                            disabled={cancelling === apt._id}
                          >
                            <X className="h-3 w-3" />
                            {cancelling === apt._id ? '…' : 'Cancel'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <Pagination pagination={pagination} onPageChange={(p) => { setFilters({ ...filters, page: p }); fetch({ ...filters, page: p }); }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
