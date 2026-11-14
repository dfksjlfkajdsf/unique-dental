import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Star, CheckCircle } from 'lucide-react';
import Animate from '../../components/ui/Animate';

const SIDE_BG = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80';

export default function Login() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const np = lang === 'np';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user?.role !== 'admin') {
        logout();
        toast.error(np ? 'पहुँच अस्वीकृत: एडमिन खाता मात्र साइन इन गर्न सक्नुहुन्छ' : 'Access denied: Only Admin accounts can log in');
        return;
      }
      toast.success(np ? `स्वागत छ, ${user.name}!` : `Welcome back, ${user.name}!`);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || (np ? 'लगइन असफल भयो' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const perks = np
    ? ['२४/७ अनलाइन अपोइन्टमेन्ट बुक गर्नुहोस्', 'जहिले पनि आफ्नो डेन्टल रेकर्ड हेर्नुहोस्', 'अपोइन्टमेन्ट स्मरण प्राप्त गर्नुहोस्', 'आफ्नो पूरा डेन्टल इतिहास व्यवस्थापन गर्नुहोस्']
    : ['Book appointments online 24/7', 'View your dental records anytime', 'Receive appointment reminders', 'Manage your full dental history'];

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col">
        <img src={SIDE_BG} alt="Unique Dental" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/90 via-primary-900/80 to-primary-800/70" />

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
                {np ? <>तपाईंको मुस्कान यात्रा<br /><span className="text-accent-400">यहाँबाट सुरु हुन्छ।</span></> : <>Your smile journey<br /><span className="text-accent-400">starts right here.</span></>}
              </h2>
              <p className="text-primary-200 text-lg leading-relaxed mb-10 max-w-sm">
                {np
                  ? 'आफ्नो अपोइन्टमेन्ट व्यवस्थापन गर्न, मेडिकल रेकर्ड हेर्न र आफ्नो दाँतको स्वास्थ्य नियन्त्रण गर्न साइन इन गर्नुहोस्।'
                  : 'Sign in to manage your appointments, view medical records, and take control of your dental health.'
                }
              </p>
              <ul className="space-y-3">
                {perks.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 text-accent-400 fill-accent-400" />)}
              </div>
              <p className="text-white/80 text-sm italic leading-relaxed mb-3">
                {np
                  ? '"अनलाइन बुकिङ प्रणाली अद्भुत छ। युनिक डेन्टलमा मेरो इम्प्लान्ट अनुभव विश्वस्तरीय थियो।"'
                  : '"The online booking system is amazing. My implant experience at Unique Dental was world-class."'
                }
              </p>
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80"
                  alt="" className="h-8 w-8 rounded-full object-cover border-2 border-white/30" />
                <div>
                  <p className="text-white text-xs font-bold">Sarah Tamang</p>
                  <p className="text-primary-300 text-[10px]">{np ? 'इम्प्लान्ट बिरामी' : 'Implant Patient'}</p>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-12 bg-white">
        <Animate variant="fade-left" className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center font-black text-white text-lg">U</div>
            <div>
              <div className="font-extrabold text-gray-900 text-base leading-none">Unique Dental</div>
              <div className="text-primary-600 text-[10px] font-medium leading-none mt-0.5">& Implant Centre</div>
            </div>
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{np ? 'एडमिन पोर्टल' : 'Admin Portal Login'}</h1>
          <p className="text-gray-500 mb-8">{np ? 'क्लिनिक व्यवस्थापनको लागि साइन इन गर्नुहोस्' : 'Sign in to access clinic management'}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">{np ? 'इमेल ठेगाना' : 'Email Address'}</label>
              <input type="email" className="input h-11" placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required autoFocus />
            </div>

            <div>
              <label className="label">{np ? 'पासवर्ड' : 'Password'}</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="input h-11 pr-11"
                  placeholder="••••••••"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required />
                <button type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full h-12 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-600/20 text-base"
              disabled={loading}>
              {loading ? (np ? 'साइन इन हुँदैछ…' : 'Signing in…') : (np ? 'साइन इन' : 'Sign In')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {np ? 'खाता छैन?' : "Don't have an account?"}{' '}
            <Link to="/contact" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
              {np ? 'खाता बनाउनुहोस्' : 'Create one'}
            </Link>
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
