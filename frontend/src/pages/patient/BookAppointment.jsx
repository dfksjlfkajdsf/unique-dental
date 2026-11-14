import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { CalendarDays } from 'lucide-react';

const TREATMENT_TYPES = [
  'General Checkup','Teeth Cleaning','Tooth Extraction','Root Canal',
  'Dental Filling','Teeth Whitening','Braces/Orthodontics','Dental Implant',
  'Crown & Bridge','Emergency Dental Care','Other',
];

const TIMES = [
  '08:00','08:30','09:00','09:30','10:00','10:30',
  '11:00','11:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00',
];

const today = new Date().toISOString().split('T')[0];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ appointmentDate: '', appointmentTime: '', treatmentType: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/appointments', form);
      toast.success('Appointment booked successfully!');
      navigate('/appointments');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.message || 'Booking failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <CalendarDays className="h-6 w-6 text-primary-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-sm text-gray-500">Fill in the details below</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Appointment Date</label>
            <input
              type="date"
              className="input"
              min={today}
              value={form.appointmentDate}
              onChange={set('appointmentDate')}
              required
            />
          </div>

          <div>
            <label className="label">Time Slot</label>
            <select className="input" value={form.appointmentTime} onChange={set('appointmentTime')} required>
              <option value="">Select a time…</option>
              {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Treatment Type</label>
            <select className="input" value={form.treatmentType} onChange={set('treatmentType')} required>
              <option value="">Select treatment…</option>
              {TREATMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Notes <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Any additional information for the dentist…"
              value={form.notes}
              onChange={set('notes')}
              maxLength={500}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{form.notes.length}/500</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" className="btn-secondary flex-1" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={loading}>
              {loading ? 'Booking…' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
