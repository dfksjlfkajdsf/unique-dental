import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import Pagination from '../../components/ui/Pagination';
import { Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

function RecordRow({ record }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="font-medium text-sm text-gray-900">{record.diagnosis.slice(0, 60)}{record.diagnosis.length > 60 ? '…' : ''}</p>
          <p className="text-xs text-gray-500 mt-0.5">{format(new Date(record.createdAt), 'MMM d, yyyy')}</p>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50">
          <Detail label="Diagnosis" value={record.diagnosis} />
          {record.prescription && <Detail label="Prescription" value={record.prescription} />}
          {record.treatmentNotes && <Detail label="Treatment Notes" value={record.treatmentNotes} />}
          {record.appointmentId && (
            <Detail
              label="Related Appointment"
              value={`${format(new Date(record.appointmentId.appointmentDate), 'MMM d, yyyy')} · ${record.appointmentId.appointmentTime} · ${record.appointmentId.treatmentType}`}
            />
          )}
          {record.attachmentUrl && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Attachment</p>
              <a href={record.attachmentUrl} target="_blank" rel="noreferrer" className="text-primary-600 text-sm hover:underline break-all">
                View file
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default function MyMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const load = (p = 1) => {
    setLoading(true);
    api.get('/medical-records/my', { params: { page: p, limit: 10 } })
      .then((r) => { setRecords(r.data.data.records); setPagination(r.data.pagination); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Medical Records</h1>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : records.length === 0 ? (
          <EmptyState icon={Stethoscope} title="No medical records" description="Your records will appear here after your appointments." />
        ) : (
          <>
            {records.map((r) => <RecordRow key={r._id} record={r} />)}
            <div className="px-4 py-3 border-t border-gray-100">
              <Pagination pagination={pagination} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
