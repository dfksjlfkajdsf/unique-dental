import { useEffect, useState, useCallback } from 'react';
import api from '../../lib/api';
import Spinner from '../../components/ui/Spinner';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import { Stethoscope, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

function CreateForm({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ patientId: '', diagnosis: '', prescription: '', treatmentNotes: '', attachmentUrl: '' });
  const [loading, setLoading] = useState(false);

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/medical-records/admin', form);
      toast.success('Record created');
      setForm({ patientId: '', diagnosis: '', prescription: '', treatmentNotes: '', attachmentUrl: '' });
      setOpen(false);
      onCreated();
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.message || 'Failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <button className="flex items-center justify-between w-full" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-gray-900 flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary-600" /> Create Medical Record
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>

      {open && (
        <form onSubmit={submit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Patient ID</label>
              <input className="input" placeholder="MongoDB ObjectId" value={form.patientId} onChange={set('patientId')} required />
            </div>
            <div>
              <label className="label">Attachment URL <span className="text-gray-400 font-normal">(optional)</span></label>
              <input type="url" className="input" placeholder="https://…" value={form.attachmentUrl} onChange={set('attachmentUrl')} />
            </div>
          </div>
          <div>
            <label className="label">Diagnosis</label>
            <textarea className="input resize-none" rows={2} value={form.diagnosis} onChange={set('diagnosis')} required />
          </div>
          <div>
            <label className="label">Prescription <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea className="input resize-none" rows={2} value={form.prescription} onChange={set('prescription')} />
          </div>
          <div>
            <label className="label">Treatment Notes <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea className="input resize-none" rows={2} value={form.treatmentNotes} onChange={set('treatmentNotes')} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Save Record'}</button>
        </form>
      )}
    </div>
  );
}

export default function AdminMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(null);

  const load = useCallback((p = 1) => {
    setLoading(true);
    api.get('/medical-records/admin/all', { params: { page: p, limit: 15 } })
      .then((r) => { setRecords(r.data.data.records); setPagination(r.data.pagination); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(1); }, [load]);

  const deleteRecord = async (id) => {
    if (!window.confirm('Delete this medical record?')) return;
    setBusy(id);
    try {
      await api.delete(`/medical-records/admin/${id}`);
      toast.success('Record deleted');
      load(page);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
      <CreateForm onCreated={() => load(1)} />

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : records.length === 0 ? (
          <EmptyState icon={Stethoscope} title="No medical records found" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Diagnosis</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {records.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{r.patientId?.name || '—'}</p>
                        <p className="text-xs text-gray-400">{r.patientId?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs">
                        <p className="truncate">{r.diagnosis}</p>
                        {r.prescription && <p className="text-xs text-gray-400 truncate">Rx: {r.prescription}</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{format(new Date(r.createdAt), 'MMM d, yyyy')}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className="btn p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg"
                          onClick={() => deleteRecord(r._id)}
                          disabled={busy === r._id}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <Pagination pagination={pagination} onPageChange={(p) => { setPage(p); load(p); }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
