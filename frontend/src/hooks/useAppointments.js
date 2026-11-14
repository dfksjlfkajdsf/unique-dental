import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export const useAppointments = (isAdmin = false) => {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const url = isAdmin ? '/appointments/admin/all' : '/appointments/my';
      const { data } = await api.get(url, { params });
      setAppointments(data.data.appointments);
      setPagination(data.pagination);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => { fetch(); }, [fetch]);

  const cancel = useCallback(async (id, reason = '') => {
    await api.patch(`/appointments/${id}/cancel`, { cancellationReason: reason });
    toast.success('Appointment cancelled');
    fetch();
  }, [fetch]);

  const updateStatus = useCallback(async (id, status, cancellationReason = '') => {
    await api.patch(`/appointments/${id}/status`, { status, cancellationReason });
    toast.success(`Appointment ${status}`);
    fetch();
  }, [fetch]);

  return { appointments, pagination, loading, fetch, cancel, updateStatus };
};
