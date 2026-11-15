import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import { Menu, X, Phone } from 'lucide-react';

const PHONE = 'tel:071537300';
const WHATSAPP = 'https://wa.me/9779854040984';

const WaIcon = ({ size = 4 }) => (
  <svg className={`h-${size} w-${size} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function Logo({ scrolled }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-w-0">
      {!imgFailed ? (
        <img
          src="/logo.png"
          alt="Unique Dental and Implant Center"
          className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover bg-white p-0.5 shadow-md ring-2 ring-accent-400 group-hover:ring-accent-300 group-hover:scale-105 transition-all duration-300 flex-shrink-0"
          style={{ maxWidth: '64px', maxHeight: '64px' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center font-black text-white text-base sm:text-xl flex-shrink-0 ring-2 ring-accent-400 bg-blue-900 transition-colors">U</div>
      )}
      <div className="leading-tight flex-shrink-0">
        <div className="font-black text-sm sm:text-lg xl:text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors leading-none">
          Unique Dental
        </div>
        <div className="text-[10px] sm:text-xs xl:text-[13px] font-bold text-sky-300 group-hover:text-accent-300 leading-none mt-1 sm:mt-1.5 transition-colors">
          & Implant Center Pvt. Ltd.
        </div>
      </div>
    </Link>
  );
}

export default function PublicNavbar() {
  const { openBookingModal } = useBookingModal();
  const { lang, toggle } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);
  const np = lang === 'np';

  const navLinks = [
    { to: '/', label: np ? 'गृहपृष्ठ' : 'Home' },
    { to: '/about', label: np ? 'हाम्रो बारेमा' : 'About Us' },
    { to: '/services', label: np ? 'सेवाहरू' : 'Services' },
    { to: '/dentists', label: np ? 'चिकित्सकहरू' : 'Dentists' },
    { to: '/gallery', label: np ? 'ग्यालरी' : 'Gallery' },
    { to: '/branches', label: np ? 'शाखाहरू' : 'Branches' },
    { to: '/contact', label: np ? 'सम्पर्क' : 'Contact' },
  ];

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    setScrolled(false);
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isHome]);

  const navBg = scrolled
    ? 'bg-[#0B1E38]/98 backdrop-blur-xl shadow-lg border-b border-blue-900/50'
    : 'bg-[#0B1E38]/85 backdrop-blur-md border-b border-white/10';
  const linkBase = 'text-blue-100/90 hover:text-white hover:bg-white/10 font-semibold';
  const linkActive = 'text-white bg-blue-600/40 font-bold border border-blue-400/50 shadow-sm shadow-blue-500/20';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Logo scrolled={scrolled} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-shrink-0">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm whitespace-nowrap transition-all duration-200 ${pathname === to ? linkActive : linkBase}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg border border-blue-400/30 hover:bg-white/10 text-blue-100 text-xs font-extrabold transition-all flex-shrink-0"
              title={np ? 'Switch to English' : 'नेपालीमा जानुहोस्'}
            >
              <span className={lang === 'en' ? 'text-accent-400 font-black' : 'text-blue-200/50'}>EN</span>
              <span className="text-blue-200/30">|</span>
              <span className={lang === 'np' ? 'text-accent-400 font-black' : 'text-blue-200/50'}>NP</span>
            </button>

            <a href={PHONE} className="flex items-center gap-1.5 text-xs xl:text-sm font-semibold text-blue-100 hover:text-white transition-colors flex-shrink-0">
              <Phone className="h-3.5 w-3.5 text-accent-400" />
              <span className="hidden xl:inline">071-537300</span>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1db954] text-white transition-all duration-200 hover:scale-105 flex-shrink-0 shadow-md shadow-green-500/20">
              <WaIcon size={4} />
            </a>
            <div className="w-px h-5 flex-shrink-0 bg-blue-800/60" />
            <button onClick={() => openBookingModal()} className="px-3.5 xl:px-5 py-2 xl:py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-xs xl:text-sm font-bold rounded-xl transition-colors shadow-lg shadow-accent-500/25 whitespace-nowrap flex-shrink-0">
                {np ? 'अहिले बुक गर्नुहोस्' : 'Book Now'}
              </button>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="px-2.5 py-1 rounded-lg border border-blue-400/30 text-blue-100 hover:bg-white/10 text-xs font-extrabold transition-colors"
              title={np ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}
            >
              {lang === 'en' ? 'नेपाली' : 'English'}
            </button>
            <button className="p-2 rounded-xl text-blue-100 hover:bg-white/10 transition-colors" onClick={() => setOpen(!open)}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0B1E38] border-t border-blue-900/60 px-4 py-4 space-y-1 shadow-2xl">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${pathname === to ? 'text-white bg-blue-600/40 font-bold border border-blue-400/50' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}>
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-blue-900/60 space-y-2">
            <a href={PHONE} className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-blue-700/60 text-blue-100 font-bold rounded-xl hover:bg-white/10 transition-colors">
              <Phone className="h-4 w-4 text-accent-500" /> 071-537300
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1db954] transition-colors">
              <WaIcon size={4} /> {np ? 'व्हाट्सएपमा च्याट' : 'Chat on WhatsApp'}
            </a>
            <button onClick={() => { setOpen(false); openBookingModal(); }} className="block w-full text-center px-4 py-3 bg-accent-500 text-white font-bold rounded-xl shadow-lg shadow-accent-500/25">
                {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment'}
              </button>
          </div>
        </div>
      )}
    </header>
  );
}
