import { Phone, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const WHATSAPP = 'https://wa.me/9779854040984';
const PHONE = 'tel:071537300';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61574377058578';
const INSTAGRAM = 'https://www.instagram.com/unique.dental_clinic?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';
const TIKTOK = 'https://www.tiktok.com/@unique.dental.imp?is_from_webapp=1&sender_device=pc';

const WaIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
  </svg>
);

export default function FloatingContact() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const btnBase = "w-44 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95";

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-stretch gap-3">

      {/* Connect with us — fades out when scrolled */}
      <div
        className="flex flex-col items-stretch gap-2 transition-all duration-300 overflow-hidden"
        style={{
          opacity: scrolled ? 0 : 1,
          maxHeight: scrolled ? '0px' : '300px',
          pointerEvents: scrolled ? 'none' : 'auto',
          transform: scrolled ? 'translateY(10px)' : 'translateY(0)',
        }}
      >
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-right pr-1">Connect with us</span>

        <a
          href={FACEBOOK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Facebook"
          className={`${btnBase} bg-[#1877F2] hover:bg-[#0d6fde] text-white shadow-xl shadow-blue-500/30`}
        >
          <FacebookIcon />
          <span className="text-sm font-bold whitespace-nowrap">Facebook</span>
        </a>

        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
          className={`${btnBase} text-white shadow-xl shadow-pink-500/30`}
          style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
        >
          <InstagramIcon />
          <span className="text-sm font-bold whitespace-nowrap">Instagram</span>
        </a>

        <a
          href={TIKTOK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on TikTok"
          className={`${btnBase} bg-[#010101] hover:bg-[#1a1a1a] text-white shadow-xl shadow-black/30`}
        >
          <TikTokIcon />
          <span className="text-sm font-bold whitespace-nowrap">TikTok</span>
        </a>
      </div>

      {/* Divider — also hides on scroll */}
      <div
        className="h-px bg-gray-200 rounded-full transition-all duration-300"
        style={{ opacity: scrolled ? 0 : 0.6, maxHeight: scrolled ? '0px' : '1px' }}
      />

      {/* Chat with us — shrinks to icon on scroll */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="self-end flex items-center bg-[#25D366] hover:bg-[#1db954] text-white shadow-2xl shadow-green-500/40 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        style={{
          width: scrolled ? '2.75rem' : '11rem',
          height: scrolled ? '2.75rem' : '3rem',
          padding: scrolled ? '0' : '0 1.25rem 0 1rem',
          justifyContent: scrolled ? 'center' : 'flex-start',
          gap: scrolled ? '0' : '0.625rem',
        }}
      >
        <WaIcon />
        <span
          className="text-sm font-bold whitespace-nowrap transition-all duration-300 overflow-hidden"
          style={{ opacity: scrolled ? 0 : 1, maxWidth: scrolled ? '0px' : '8rem' }}
        >
          Chat with us
        </span>
      </a>

      {/* Call us — shrinks to icon on scroll */}
      <a
        href={PHONE}
        aria-label="Call us"
        className="self-end flex items-center bg-white hover:bg-primary-50 text-primary-800 border border-primary-200 hover:border-primary-400 shadow-xl rounded-full transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        style={{
          width: scrolled ? '2.75rem' : '11rem',
          height: scrolled ? '2.75rem' : '3rem',
          padding: scrolled ? '0' : '0 1.25rem 0 1rem',
          justifyContent: scrolled ? 'center' : 'flex-start',
          gap: scrolled ? '0' : '0.625rem',
        }}
      >
        <Phone className="h-4 w-4 flex-shrink-0" />
        <span
          className="text-sm font-bold whitespace-nowrap transition-all duration-300 overflow-hidden"
          style={{ opacity: scrolled ? 0 : 1, maxWidth: scrolled ? '0px' : '8rem' }}
        >
          071-537300
        </span>
      </a>

      {/* Go to Top — icon only, appears on scroll */}
      <button
        onClick={scrollToTop}
        aria-label="Go to top"
        className="self-end w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-lg hover:bg-gray-50 hover:text-primary-700 hover:border-primary-300 hover:scale-110 active:scale-95 transition-all duration-300"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.8)',
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
}


