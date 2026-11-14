import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope, CheckCircle2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';

const TREATMENT_OPTIONS = [
  { value: 'General Checkup', labelEn: 'General Checkup & Consultation', labelNp: 'साधारण जाँच र परामर्श' },
  { value: 'Teeth Cleaning', labelEn: 'Teeth Cleaning & Scaling', labelNp: 'दाँत सफा गर्ने (स्केलिङ)' },
  { value: 'Dental Implant', labelEn: 'Dental Implants', labelNp: 'डेन्टल इम्प्लान्ट' },
  { value: 'Root Canal', labelEn: 'Root Canal Treatment (RCT)', labelNp: 'रुट क्यानाल उपचार' },
  { value: 'Teeth Whitening', labelEn: 'Teeth Whitening & Bleaching', labelNp: 'दाँत सेतो पार्ने' },
  { value: 'Braces/Orthodontics', labelEn: 'Braces & Orthodontics', labelNp: 'तार बाँध्ने (ब्रेसेस)' },
  { value: 'Crown & Bridge', labelEn: 'Crowns, Bridges & Veneers', labelNp: 'क्राउन र ब्रिज' },
  { value: 'Tooth Extraction', labelEn: 'Tooth Extraction / Surgery', labelNp: 'दाँत झिक्ने' },
  { value: 'Dental Filling', labelEn: 'Dental Fillings & Restoration', labelNp: 'दाँत भर्ने' },
  { value: 'Emergency Dental Care', labelEn: 'Emergency Dental Care', labelNp: 'आकस्मिक डेन्टल सेवा' },
  { value: 'Other', labelEn: 'Other Dental Service', labelNp: 'अन्य डेन्टल सेवा' },
];

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export default function BookingModal({ isOpen, onClose, initialService = '' }) {
  const { lang } = useLanguage();
  const np = lang === 'np';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    treatmentType: 'General Checkup',
    appointmentDate: '',
    appointmentTime: '10:00',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-select treatment based on initialService
  useEffect(() => {
    if (!initialService) return;
    const lower = initialService.toLowerCase();
    const match = TREATMENT_OPTIONS.find(opt =>
      lower.includes(opt.value.toLowerCase()) ||
      opt.value.toLowerCase().includes(lower) ||
      opt.labelEn.toLowerCase().includes(lower)
    );
    if (match) {
      setForm(prev => ({ ...prev, treatmentType: match.value }));
    } else {
      setForm(prev => ({ ...prev, treatmentType: 'General Checkup' }));
    }
  }, [initialService, isOpen]);

  // Set default min date to today
  const todayStr = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/appointments/public', form);
      setSuccess(true);
      toast.success(np ? 'अपोइन्टमेन्ट सफलतापूर्वक बुक भयो!' : 'Appointment booked successfully!');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || (np ? 'अपोइन्टमेन्ट बुक गर्न सकिएन' : 'Failed to book appointment'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Pop-up Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10 animate-scale-up border border-gray-100 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-xs font-bold mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            {np ? 'अनलाइन बुकिङ' : 'Online Appointment Booking'}
          </div>
          <h2 className="text-2xl font-extrabold leading-tight">
            {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Your Dental Visit'}
          </h2>
          <p className="text-primary-200 text-xs mt-1">
            {np ? 'युनिक डेन्टल एण्ड इम्प्लान्ट सेन्टरमा तुरुन्तै समय लिनुहोस्' : 'Schedule your appointment at Unique Dental & Implant Centre'}
          </p>
        </div>

        {/* Content Body */}
        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {np ? 'धन्यवाद! बुकिङ प्राप्त भयो' : 'Booking Received!'}
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              {np
                ? 'हाम्रो टोलीले तपाईंका विवरणहरू समीक्षा गर्नेछ र चाँडै पुष्टि गर्न सम्पर्क गर्नेछ।'
                : 'Our dental clinic team has received your request and will contact you shortly to confirm your appointment.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
            {/* Treatment Selector (Auto-selected if passed) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {np ? 'सेवा / उपचार चयन गर्नुहोस्' : 'Select Treatment / Service'} *
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600 pointer-events-none" />
                <select
                  className="input pl-10 pr-4 py-2.5 text-sm font-semibold bg-primary-50/50 border-primary-200 focus:border-primary-600"
                  value={form.treatmentType}
                  onChange={(e) => setForm({ ...form, treatmentType: e.target.value })}
                  required
                >
                  {TREATMENT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {np ? opt.labelNp : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {np ? 'पुरा नाम' : 'Full Name'} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    className="input pl-9 text-sm"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {np ? 'फोन नम्बर' : 'Phone Number'} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    className="input pl-9 text-sm"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {np ? 'इमेल ठेगाना' : 'Email Address'} *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  className="input pl-9 text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {np ? 'मिति' : 'Preferred Date'} *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    required
                    min={todayStr}
                    className="input pl-9 text-sm"
                    value={form.appointmentDate}
                    onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {np ? 'समय' : 'Preferred Time'} *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select
                    className="input pl-9 pr-4 text-sm"
                    value={form.appointmentTime}
                    onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
                    required
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t} {parseInt(t) < 12 ? 'AM' : 'PM'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {np ? 'अतिरिक्त टिप्पणी / समस्या' : 'Additional Message / Symptoms'}
              </label>
              <textarea
                rows={2}
                placeholder={np ? 'कुनै समस्या भए यहाँ लेख्नुहोस्...' : 'Describe any specific symptoms or preferences...'}
                className="input py-2 text-sm"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-2xl shadow-lg shadow-accent-500/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {np ? 'पठाउँदैछ...' : 'Submitting Booking...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Confirm & Book Appointment'}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
