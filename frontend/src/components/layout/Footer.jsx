import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WHATSAPP = 'https://wa.me/9779854040984';
const INSTAGRAM = 'https://www.instagram.com/unique.dental_clinic?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61574377058578';
const TIKTOK = 'https://www.tiktok.com/@unique.dental.imp?is_from_webapp=1&sender_device=pc';

const WaIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.42c0 1.94-.48 3.91-1.63 5.48-1.57 2.16-4.27 3.32-6.95 2.92-2.8-.41-5.18-2.48-5.94-5.22-.84-3.01.29-6.38 2.82-8.15 1.51-1.06 3.4-1.51 5.22-1.29v4.22c-.93-.31-2-.22-2.83.27-.88.52-1.44 1.49-1.49 2.52-.06 1.25.66 2.45 1.77 2.97 1.05.49 2.37.37 3.31-.31.69-.51 1.09-1.33 1.11-2.19l.05-18.07z" />
  </svg>
);

function FooterLogo() {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <Link to="/" className="flex items-center gap-3.5 mb-5 group">
      {!imgFailed ? (
        <img
          src="/logo.png"
          alt="Unique Dental and Implant Center"
          className="w-14 h-14 rounded-full object-cover bg-white p-0.5 shadow-md ring-2 ring-accent-400 group-hover:scale-105 transition-transform duration-200"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-primary-700 flex items-center justify-center font-black text-white text-xl ring-2 ring-accent-400">U</div>
      )}
      <div>
        <div className="font-extrabold text-white text-lg leading-none group-hover:text-accent-300 transition-colors">Unique Dental</div>
        <div className="text-accent-300 text-xs font-semibold leading-none mt-1.5">& Implant Center Pvt. Ltd.</div>
      </div>
    </Link>
  );
}

export default function Footer() {
  const { lang } = useLanguage();
  const np = lang === 'np';

  const navItems = [
    { to: '/', l: np ? 'गृहपृष्ठ' : 'Home' },
    { to: '/about', l: np ? 'हाम्रो बारेमा' : 'About Us' },
    { to: '/services', l: np ? 'सेवाहरू' : 'Services' },
    { to: '/dentists', l: np ? 'चिकित्सकहरू' : 'Dentists & Doctors' },
    { to: '/contact', l: np ? 'सम्पर्क' : 'Contact' },
  ];

  const services = np
    ? ['सामान्य जाँच', 'डेन्टल इम्प्लान्ट', 'दाँत मिलाउने उपचार', 'दाँत सेतो पार्ने', 'रुट क्यानाल', 'क्राउन र ब्रिज', 'आपतकालीन सेवा', 'स्केलिङ र पोलिसिङ']
    : ['General Checkup', 'Dental Implants', 'Orthodontics', 'Teeth Whitening', 'Root Canal', 'Crown & Bridge', 'Emergency Care', 'Scale & Polish'];

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="h-1 bg-gradient-to-r from-primary-700 via-accent-500 to-primary-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="text-sm text-gray-500 leading-relaxed mb-2">
              <span className="text-gray-400 font-medium">आधुनिक प्रविधि, गुणस्तरीय उपचार</span>
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {np ? '२००९ देखि बुटवलमा उत्कृष्ट डेन्टल र इम्प्लान्ट सेवा।' : 'Exceptional dental and implant care in Butwal since 2009.'}
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1db954] text-white text-sm font-bold rounded-xl transition-colors">
              <WaIcon /> {np ? 'व्हाट्सएपमा च्याट' : 'Chat on WhatsApp'}
            </a>

            <div className="mt-5 pt-4 border-t border-gray-800/80">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2.5">
                {np ? 'हाम्रा सामाजिक सञ्जाल:' : 'Connect with us:'}
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 hover:border-pink-500 text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 hover:border-blue-500 text-gray-400 hover:text-white hover:bg-[#1877F2] flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={TIKTOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok"
                  className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 hover:border-cyan-400 text-gray-400 hover:text-white hover:bg-black flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-extrabold mb-5 text-sm uppercase tracking-widest">{np ? 'नेभिगेसन' : 'Navigation'}</h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.map(({ to, l }) => (
                <li key={to}><Link to={to} className="text-gray-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold mb-5 text-sm uppercase tracking-widest">{np ? 'हाम्रा सेवाहरू' : 'Our Services'}</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {services.map((s) => <li key={s} className="hover:text-gray-300 transition-colors cursor-default">{s}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold mb-5 text-sm uppercase tracking-widest">{np ? 'सम्पर्क' : 'Contact'}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span>{np ? 'पुष्पलाल पार्क, बुटवल,\nरूपन्देही, नेपाल' : 'Puspalal Park, Butwal,\nRupandehi, Nepal'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:071537300" className="block hover:text-white transition-colors">071-537300</a>
                  <a href="tel:9854040984" className="block hover:text-white transition-colors">9854040984</a>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-900 rounded-2xl border border-gray-800 text-xs">
              <p className="font-bold text-white mb-3 text-sm">{np ? 'खुल्ने समय' : 'Opening Hours'}</p>
              <div className="space-y-1.5 text-gray-500">
                <div className="flex justify-between">
                  <span>{np ? 'आइत – शुक्र' : 'Sun – Fri'}</span>
                  <span className="text-gray-300 font-medium">{np ? 'बि.८ – सा.६' : '8am – 6pm'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{np ? 'शनिबार' : 'Saturday'}</span>
                  <span className="text-gray-300 font-medium">{np ? 'बि.९ – दि.४' : '9am – 4pm'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/70 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Unique Dental and Implant Center Pvt. Ltd. {np ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <p className="text-gray-700">{np ? 'पुष्पलाल पार्क, बुटवल, रूपन्देही' : 'Puspalal Park, Butwal, Rupandehi'}</p>
        </div>
      </div>
    </footer>
  );
}
