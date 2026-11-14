import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, CalendarDays, Stethoscope, ShieldCheck } from 'lucide-react';
import Animate from '../../components/ui/Animate';

const SIDE_BG = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const np = lang === 'np';

  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success(np ? 'खाता बनाइयो! युनिक डेन्टलमा स्वागत छ।' : 'Account created! Welcome to Unique Dental.');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.message || (np ? 'दर्ता असफल भयो' : 'Registration failed');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const perks = np
    ? [
        { icon: CalendarDays, title: 'जहिले पनि अनलाइन बुक गर्नुहोस्', desc: 'फोन नगरी २४/७ अपोइन्टमेन्ट मिलाउनुहोस्।' },
        { icon: Stethoscope, title: 'आफ्नो रेकर्ड हेर्नुहोस्', desc: 'डेन्टल इतिहास र प्रेस्क्रिप्सन सजिलैसँग हेर्नुहोस्।' },
        { icon: ShieldCheck, title: 'सुरक्षित र निजी', desc: 'तपाईंको स्वास्थ्य डेटा इन्क्रिप्ट र सुरक्षित छ।' },
      ]
    : [
        { icon: CalendarDays, title: 'Book Online Anytime', desc: 'Schedule appointments 24/7 without calling.' },
        { icon: Stethoscope, title: 'Track Your Records', desc: 'Access your dental history and prescriptions.' },
        { icon: ShieldCheck, title: 'Secure & Private', desc: 'Your health data is encrypted and protected.' },
      ];

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col">
        <img src={SIDE_BG} alt="Unique Dental" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/92 via-primary-900/85 to-primary-800/75" />

        <div className="relative flex flex-col h-full px-12 py-10">
          <Animate variant="fade-right" className="flex flex-col h-full justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-white text-lg">U</div>
              <div>
                <div className="font-extrabold text-white text-base leading-none">Unique Dental</div>
                <div className="text-primary-300 text-[10px] font-medium leading-none mt-0.5">& Implant Centre Pvt. Ltd.</div>
              </div>
            </Link>

            <div className="my-auto py-8">
              <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                {np ? <>हजारौं खुसी<br /><span className="text-accent-400">बिरामीहरूमा सामेल हुनुहोस्।</span></> : <>Join Thousands of<br /><span className="text-accent-400">Happy Patients.</span></>}
              </h2>
              <p className="text-primary-200 text-base leading-relaxed mb-10 max-w-xs">
                {np ? 'नि:शुल्क खाता बनाउनुहोस् र आफ्नो उत्कृष्ट मुस्कानतर्फ पहिलो कदम चाल्नुहोस्।' : 'Create your free account and take the first step towards your perfect smile.'}
              </p>

              <div className="space-y-5">
                {perks.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="p-2.5 bg-white/10 border border-white/15 rounded-xl flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary-300" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{title}</p>
                      <p className="text-primary-300 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-primary-400 text-xs">
              © 2024 Unique Dental and Implant Centre Pvt. Ltd.
            </p>
          </Animate>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <Animate variant="fade-left" className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center font-black text-white text-lg">U</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base leading-none">Unique Dental</div>
              <div className="text-primary-600 text-[10px] font-medium leading-none mt-0.5">& Implant Centre</div>
            </div>
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{np ? 'आफ्नो खाता बनाउनुहोस्' : 'Create your account'}</h1>
          <p className="text-gray-500 mb-8">{np ? 'नि:शुल्क। मिनेटमा अपोइन्टमेन्ट बुक गर्नुहोस्।' : 'Free to join. Book appointments in minutes.'}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{np ? 'पूरा नाम' : 'Full Name'}</label>
              <input className="input h-11" placeholder={np ? 'राम बहादुर' : 'John Doe'} value={form.name} onChange={set('name')} required />
            </div>

            <div>
              <label className="label">{np ? 'इमेल ठेगाना' : 'Email Address'}</label>
              <input type="email" className="input h-11" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
            </div>

            <div>
              <label className="label">{np ? 'फोन नम्बर' : 'Phone Number'}</label>
              <input type="tel" className="input h-11" placeholder="98XXXXXXXX" value={form.phone} onChange={set('phone')} required />
            </div>

            <div>
              <label className="label">{np ? 'पासवर्ड' : 'Password'}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} className="input h-11 pr-11"
                  placeholder={np ? 'कम्तिमा ८ अक्षर, १ ठूलो, १ नम्बर' : 'Min 8 chars, 1 uppercase, 1 number'}
                  value={form.password} onChange={set('password')} required
                />
                <button type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full h-12 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-600/20 text-base mt-2"
              disabled={loading}>
              {loading ? (np ? 'खाता बनाउँदैछ…' : 'Creating account…') : (np ? 'खाता बनाउनुहोस्' : 'Create Account')}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            {np
              ? <>दर्ता गरेर तपाईं हाम्रो <span className="text-primary-600 font-medium">सेवाका सर्तहरू</span> र <span className="text-primary-600 font-medium">गोपनीयता नीति</span>मा सहमत हुनुहुन्छ।</>
              : <>By registering you agree to our <span className="text-primary-600 font-medium">Terms of Service</span> and <span className="text-primary-600 font-medium">Privacy Policy</span>.</>
            }
          </p>

          <p className="text-center text-sm text-gray-500 mt-5">
            {np ? 'पहिले नै खाता छ?' : 'Already have an account?'}{' '}
            <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">{np ? 'साइन इन' : 'Sign In'}</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ← {np ? 'युनिक डेन्टलको वेबसाइटमा फर्कनुहोस्' : 'Back to Unique Dental website'}
            </Link>
          </div>
        </Animate>
      </div>
    </div>
  );
}
