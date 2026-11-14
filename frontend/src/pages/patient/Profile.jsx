import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { User, Save } from 'lucide-react';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch('/auth/profile', form);
      await refreshUser();
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      {/* Avatar + info */}
      <div className="card flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <User className="h-7 w-7 text-primary-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="badge bg-primary-100 text-primary-700 capitalize mt-1">{user?.role}</span>
        </div>
      </div>

      {/* Edit form */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Edit Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              type="tel"
              className="input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input bg-gray-50" value={user?.email} disabled />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Save className="h-4 w-4" />
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
