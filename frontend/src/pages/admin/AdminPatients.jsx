import { useEffect, useState, useCallback } from 'react';
import api from '../../lib/api';
import Spinner from '../../components/ui/Spinner';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import StatusBadge from '../../components/ui/StatusBadge';
import { Users, Search, UserX, UserCheck, Eye } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(null);

  const load = useCallback((p = 1, q = '') => {
    setLoading(true);
    api.get('/admin/patients', { params: { page: p, limit: 15, search: q || undefined } })
      .then((r) => { setPatients(r.data.data.patients); setPagination(r.data.pagination); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(1, search); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load(1, search);
  };

  const toggleActive = async (patient) => {
    setBusy(patient._id);
    try {
      if (patient.isActive) {
        await api.delete(`/admin/patients/${patient._id}`);
        toast.success('Patient deactivated');
      } else {
        await api.patch(`/admin/patients/${patient._id}`, { isActive: true });
        toast.success('Patient reactivated');
      }
      load(page, search);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Action failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Patients</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Search by name, email, or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary px-5">Search</button>
      </form>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : patients.length === 0 ? (
          <EmptyState icon={Users} title="No patients found" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {patients.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{p.name}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <p>{p.email}</p>
                        <p className="text-xs text-gray-400">{p.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{format(new Date(p.createdAt), 'MMM d, yyyy')}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className={`btn text-xs px-2.5 py-1.5 gap-1 ${p.isActive ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                          onClick={() => toggleActive(p)}
                          disabled={busy === p._id}
                        >
                          {p.isActive ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
                          {busy === p._id ? '…' : p.isActive ? 'Deactivate' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <Pagination pagination={pagination} onPageChange={(p) => { setPage(p); load(p, search); }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
