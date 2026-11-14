import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Star, ChevronRight, ChevronLeft, Zap, Microscope, Activity,
  Smile, Users, Award, Phone, CheckCircle, MapPin, Sparkles, Navigation, Camera, Image,
  Shield, Wrench, Wand2, AlignCenter, Scissors, X, ZoomIn
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

const HERO = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1920&q=80';
const CLINIC = 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80';
const TREATMENT = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80';

const CLINIC_PHOTOS = [
  {
    id: 1,
    title: 'Main Branch — Puspalal Park, Butwal-6 (Head Office)',
    titleNp: 'मुख्य शाखा — पुष्पलाल पार्क, बुटवल-६ (प्रधान कार्यालय)',
    cat: 'Our Branches',
    catNp: 'शाखाहरू',
    span: 'col-span-2 md:col-span-2',
    pos: 'object-center',
    photo: '/branches/butwal-puspalal-park.jpg',
  },
  {
    id: 2,
    title: 'Kapilvastu Branch — Banganga-4, Charnumber',
    titleNp: 'कपिलवस्तु शाखा — बाणगंगा-४, चारनम्बर',
    cat: 'Our Branches',
    catNp: 'शाखाहरू',
    span: 'col-span-1',
    pos: 'object-center',
    photo: '/branches/badhganga-kapilbastu.jpg',
  },
  {
    id: 3,
    title: 'Manigram Branch — Tilottama, Rupandehi',
    titleNp: 'मनिग्राम शाखा — तिलोत्तमा, रुपन्देही',
    cat: 'Our Branches',
    catNp: 'शाखाहरू',
    span: 'col-span-1',
    pos: 'object-center',
    photo: '/branches/manigram.jpg',
  },
  {
    id: 4,
    title: 'Dr. Raju Shrestha — Consultant Orthodontist (BDS, MDS)',
    titleNp: 'डा. राजु श्रेष्ठ — कन्सल्टेन्ट अर्थोडन्टिस्ट',
    cat: 'Our Team',
    catNp: 'हाम्रो टोली',
    span: 'col-span-1',
    pos: 'object-top',
    photo: '/doctors/dr-raju-shrestha.webp',
  },
  {
    id: 5,
    title: 'Dr. Sita Bhushal — Periodontist & Oral Implantologist',
    titleNp: 'डा. सीता भुषाल — इम्प्लान्टोलोजिस्ट तथा गम सर्जन',
    cat: 'Our Team',
    catNp: 'हाम्रो टोली',
    span: 'col-span-1',
    pos: 'object-top',
    photo: '/doctors/dr-sita-bhushal.webp',
  },
  {
    id: 6,
    title: 'Free Oral Health Camp — Puspalal Park, Butwal-6',
    titleNp: 'निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर — पुष्पलाल पार्क, बुटवल-६',
    cat: 'Dental Camps',
    catNp: 'दन्त शिविरहरू',
    span: 'col-span-2 md:col-span-2',
    pos: 'object-center',
    photo: '/camps/free-dental-camp-puspalal-park.jpg',
  },
  {
    id: 7,
    title: 'School Dental Screening — Motherland Secondary School',
    titleNp: 'सामुदायिक विद्यालय दन्त परीक्षण तथा सचेतना शिविर',
    cat: 'Dental Camps',
    catNp: 'दन्त शिविरहरू',
    span: 'col-span-1',
    pos: 'object-center',
    photo: '/camps/school-oral-health-camp.jpg',
  },
  {
    id: 8,
    title: 'Dr. Aakash Karmacharya — Consultant Endodontist (BDS, MDS)',
    titleNp: 'डा. आकाश कर्माचार्य — कन्सल्टेन्ट एन्डोडन्टिस्ट',
    cat: 'Our Team',
    catNp: 'हाम्रो टोली',
    span: 'col-span-1',
    pos: 'object-top',
    photo: '/doctors/dr-aakash-karmacharya.webp',
  },
  {
    id: 9,
    title: 'Community Felicitation & Recognition Award',
    titleNp: 'समुदायद्वारा कदरपत्र तथा सम्मान',
    cat: 'Recognition',
    catNp: 'सम्मान',
    span: 'col-span-1',
    pos: 'object-center',
    photo: '/camps/community-award-felicitation.jpg',
  },
  {
    id: 10,
    title: 'Gentle Pediatric Care — Happy, Fear-Free Smiles',
    titleNp: 'डरमुक्त बाल दन्त चिकित्सा — सन्तुष्ट मुस्कान',
    cat: 'Happy Patients',
    catNp: 'सन्तुष्ट बिरामीहरू',
    span: 'col-span-1',
    pos: 'object-center',
    photo: '/patients/happy-child-patient-thumbs-up.jpg',
  },
  {
    id: 11,
    title: 'Unique Dental Family Gathering & Celebration',
    titleNp: 'युनिक डेन्टल परिवार — वार्षिक उत्सव तथा पुनर्मिलन',
    cat: 'Our Team',
    catNp: 'हाम्रो टोली',
    span: 'col-span-2 md:col-span-2',
    pos: 'object-center',
    photo: '/camps/team-celebration-clinic.jpg',
  },
  {
    id: 12,
    title: 'Modern Ergonomic Dental Chairs & Operatory Suite',
    titleNp: 'अत्याधुनिक डेन्टल कुर्सी तथा सुविधायुक्त उपचार कक्ष',
    cat: 'Our Clinic',
    catNp: 'क्लिनिक भित्र',
    span: 'col-span-2 md:col-span-2',
    pos: 'object-center',
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  },
];

const PHONE = 'tel:071537300';
const PHONE2 = 'tel:9854040984';
const WHATSAPP = 'https://wa.me/9779854040984';
const INSTAGRAM = 'https://www.instagram.com/unique.dental_clinic?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61574377058578';
const TIKTOK = 'https://www.tiktok.com/@unique.dental.imp?is_from_webapp=1&sender_device=pc';

const WaIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.42c0 1.94-.48 3.91-1.63 5.48-1.57 2.16-4.27 3.32-6.95 2.92-2.8-.41-5.18-2.48-5.94-5.22-.84-3.01.29-6.38 2.82-8.15 1.51-1.06 3.4-1.51 5.22-1.29v4.22c-.93-.31-2-.22-2.83.27-.88.52-1.44 1.49-1.49 2.52-.06 1.25.66 2.45 1.77 2.97 1.05.49 2.37.37 3.31-.31.69-.51 1.09-1.33 1.11-2.19l.05-18.07z" />
  </svg>
);

const BRANCHES = [
  {
    id: 'main',
    name: 'Unique Dental & Implant Centre Pvt. Ltd.',
    nameNp: 'युनिक डेन्टल र इम्प्लान्ट सेन्टर प्रा.लि. (मुख्य शाखा)',
    address: 'Puspalal Park, Butwal, Rupandehi',
    addressNp: 'पुष्पलाल पार्क, बुटवल, रूपन्देही',
    phone: '071-537300',
    phone2: '985-404-0984',
    hours: 'Sun–Fri 8am–6pm · Sat 9am–4pm',
    hoursNp: 'आइत–शुक्र बि.८–सा.६ · शनि बि.९–दि.४',
    tag: 'Main Branch',
    tagNp: 'मुख्य शाखा',
    tagColor: 'bg-primary-500/90 text-white border border-primary-400/40',
    mapsUrl: 'https://maps.app.goo.gl/EVbXgJAzc7AEAR556',
    color: 'border-primary-400/40 hover:border-primary-300',
    iconBg: 'bg-primary-500/30 text-primary-300 border border-primary-400/30',
    image: '/branches/butwal-puspalal-park.jpg',
  },
  {
    id: 'badhganga',
    name: 'Unique Dental Clinic',
    nameNp: 'युनिक डेन्टल क्लिनिक (बाणगंगा, कपिलवस्तु)',
    address: 'Banganga-04 Charnumber, Kapilvastu',
    addressNp: 'बाणगंगा-४, चार नं., कपिलवस्तु',
    phone: '076-550069',
    phone2: '984-704-0984',
    hours: 'Sun–Fri 8am–6pm · Sat 9am–4pm',
    hoursNp: 'आइत–शुक्र बि.८–सा.६ · शनि बि.९–दि.४',
    tag: 'Kapilvastu Branch',
    tagNp: 'कपिलवस्तु शाखा',
    tagColor: 'bg-accent-500/90 text-white border border-accent-400/40',
    mapsUrl: 'https://maps.app.goo.gl/M4AWq8d9vh2vUmxo9',
    color: 'border-accent-400/40 hover:border-accent-300',
    iconBg: 'bg-accent-500/30 text-accent-300 border border-accent-400/30',
    image: '/branches/badhganga-kapilbastu.jpg',
  },
  {
    id: 'manigram',
    name: 'Unique Dental',
    nameNp: 'युनिक डेन्टल (मणिग्राम)',
    address: 'Manigram, Rupandehi',
    addressNp: 'मणिग्राम, रूपन्देही',
    phone: '071-590200',
    phone2: '985-404-0984',
    hours: 'Sun–Fri 8am–6pm · Sat 9am–4pm',
    hoursNp: 'आइत–शुक्र बि.८–सा.६ · शनि बि.९–दि.४',
    tag: 'Manigram Branch',
    tagNp: 'मणिग्राम शाखा',
    tagColor: 'bg-emerald-500/90 text-white border border-emerald-400/40',
    mapsUrl: '#',
    color: 'border-emerald-400/40 hover:border-emerald-300',
    iconBg: 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/30',
    image: '/branches/manigram.jpg',
  },
];

export default function Home() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const np = lang === 'np';

  const homeCurrentIdx = lightboxPhoto ? CLINIC_PHOTOS.findIndex((p) => p.id === lightboxPhoto.id) : -1;

  const prevHome = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (homeCurrentIdx === -1) return;
    const prevIdx = (homeCurrentIdx - 1 + CLINIC_PHOTOS.length) % CLINIC_PHOTOS.length;
    setLightboxPhoto(CLINIC_PHOTOS[prevIdx]);
  };

  const nextHome = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (homeCurrentIdx === -1) return;
    const nextIdx = (homeCurrentIdx + 1) % CLINIC_PHOTOS.length;
    setLightboxPhoto(CLINIC_PHOTOS[nextIdx]);
  };

  useEffect(() => {
    if (lightboxPhoto) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setLightboxPhoto(null);
        if (e.key === 'ArrowLeft') prevHome(e);
        if (e.key === 'ArrowRight') nextHome(e);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxPhoto, homeCurrentIdx]);

  const serviceGroups = [
    {
      id: 'preventive',
      icon: Shield,
      label: np ? 'निवारक र स्वच्छता' : 'Preventive & Hygiene',
      tagline: np ? 'स्वस्थ दाँतको जग' : 'The foundation of a healthy smile',
      gradient: 'from-sky-500 to-blue-600',
      lightBg: 'bg-sky-950/20',
      border: 'border-sky-500/30',
      pill: 'bg-sky-500/20 text-sky-300 border border-sky-400/30',
      glow: 'shadow-sky-500/20',
      items: [
        { photo: '/services/general-checkup.webp', title: np ? 'सामान्य जाँच' : 'General Checkup', desc: np ? 'डिजिटल एक्स-रेसहित पूर्ण मुख परीक्षण।' : 'A full mouth exam with digital X-rays to catch any issues early.' },
        { photo: '/services/scale-and-polish.webp', title: np ? 'स्केलिङ र पोलिसिङ' : 'Scale & Polish', desc: np ? 'प्लाक र टार्टर हटाउने गहिरो व्यावसायिक सफाइ।' : 'A deep professional clean removing plaque & tartar.' },
        { photo: '/services/gum-treatment.webp', title: np ? 'गिजाको उपचार' : 'Gum Treatment', desc: np ? 'ब्लिडिङ गम र गम रोगको उपचार।' : 'Treatment for gum disease, bleeding gums, and recession.' },
      ],
    },
    {
      id: 'restorative',
      icon: Wrench,
      label: np ? 'पुनर्स्थापना' : 'Restorative',
      tagline: np ? 'दाँत बचाउनुहोस् र पुनर्निर्माण गर्नुहोस्' : 'Repair, rebuild, and restore',
      gradient: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-950/20',
      border: 'border-emerald-500/30',
      pill: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30',
      glow: 'shadow-emerald-500/20',
      items: [
        { photo: '/services/dental-implants.webp', title: np ? 'डेन्टल इम्प्लान्ट' : 'Dental Implants', desc: np ? 'हराएका दाँतको स्थायी समाधान।' : 'A permanent fix for missing teeth, looks & feels natural.' },
        { photo: '/services/root-canal.webp', title: np ? 'रुट क्यानाल' : 'Root Canal', desc: np ? 'संक्रमण हटाएर प्राकृतिक दाँत बचाइन्छ।' : 'Remove infection and save your natural tooth gently.' },
        { photo: '/services/crown-and-bridge.webp', title: np ? 'क्राउन र ब्रिज' : 'Crown & Bridge', desc: np ? 'कस्टम क्राउन र ब्रिज जुन मुस्कानसँग मिल्छ।' : 'Custom crowns and bridges that blend perfectly.' },
        { photo: '/services/dental-fillings.webp', title: np ? 'डेन्टल फिलिङ' : 'Dental Fillings', desc: np ? 'दाँतको खाल्डो भर्ने टोन-म्याचिङ सामग्री।' : 'Tooth-coloured fillings that restore cavities naturally.' },
      ],
    },
    {
      id: 'cosmetic',
      icon: Wand2,
      label: np ? 'कस्मेटिक' : 'Cosmetic',
      tagline: np ? 'तपाईंको मुस्कान रूपान्तरण गर्नुहोस्' : 'Transform your smile',
      gradient: 'from-amber-400 to-orange-500',
      lightBg: 'bg-amber-950/20',
      border: 'border-amber-500/30',
      pill: 'bg-amber-500/20 text-amber-300 border border-amber-400/30',
      glow: 'shadow-amber-500/20',
      items: [
        { photo: '/services/teeth-whitening.webp', title: np ? 'दाँत सेतो पार्ने' : 'Teeth Whitening', desc: np ? 'दाँत उल्लेखनीय रूपमा उज्यालो — सुरक्षित र छिटो।' : 'Professional whitening that brightens teeth safely & fast.' },
        { photo: '/services/veneers.webp', title: np ? 'भेनियर' : 'Veneers', desc: np ? 'पातलो पोर्सिलेन शेल — प्राकृतिक देखिने फिनिश।' : 'Thin porcelain shells for a flawless, natural finish.' },
        { photo: '/services/tooth-gems.webp', title: np ? 'टुथ जेम्स' : 'Tooth Gems', desc: np ? 'सुरक्षित र हटाउन मिल्ने दाँतको गहना।' : 'Safe, non-invasive sparkle — completely removable.' },
        { photo: '/services/smile-makeover.webp', title: np ? 'स्माइल मेकओभर' : 'Smile Makeover', desc: np ? 'सपनाको मुस्कानका लागि व्यक्तिगत उपचार।' : 'A personalised blend of treatments for your dream smile.' },
      ],
    },
    {
      id: 'orthodontics',
      icon: AlignCenter,
      label: np ? 'अर्थोडोन्टिक्स' : 'Orthodontics',
      tagline: np ? 'सिधा दाँत, आत्मविश्वास' : 'Straighter teeth, more confidence',
      gradient: 'from-violet-500 to-purple-600',
      lightBg: 'bg-violet-950/20',
      border: 'border-violet-500/30',
      pill: 'bg-violet-500/20 text-violet-300 border border-violet-400/30',
      glow: 'shadow-violet-500/20',
      items: [
        { photo: '/services/braces-and-aligners.webp', title: np ? 'ब्रेसेस र अलाइनर' : 'Braces & Aligners', desc: np ? 'धातु, सेरामिक वा क्लियर अलाइनर — तपाईंको रोजाइ।' : 'Metal, ceramic, or clear aligners — your choice, your timeline.' },
      ],
    },
    {
      id: 'surgery',
      icon: Scissors,
      label: np ? 'ओरल सर्जरी' : 'Oral Surgery',
      tagline: np ? 'विशेषज्ञ शल्यक्रिया, सुरक्षित हात' : 'Specialist surgery, safe hands',
      gradient: 'from-rose-500 to-red-600',
      lightBg: 'bg-rose-950/20',
      border: 'border-rose-500/30',
      pill: 'bg-rose-500/20 text-rose-300 border border-rose-400/30',
      glow: 'shadow-rose-500/20',
      items: [
        { photo: '/services/wisdom-tooth.webp', title: np ? 'अक्कल दाँत निकाल्ने' : 'Wisdom Tooth Removal', desc: np ? 'दुखाइलो अक्कल दाँत सुरक्षित रूपमा निकाल्ने।' : 'Safe removal of painful or impacted wisdom teeth.' },
        { photo: '/services/emergency-care.webp', title: np ? 'इमर्जेन्सी केयर' : 'Emergency Care', desc: np ? 'दाँतको आपतकालीन अवस्थामा तत्काल सेवा।' : 'Immediate care for dental emergencies — we\'re here for you.' },
      ],
    },
  ];

  const testimonials = np ? [
    { name: 'Sarah Tamang', role: '२०२१ देखि बिरामी', text: 'म सधैं डेन्टिस्टसँग डराउँथें, तर युनिक डेन्टलको टोलीले त्यो बदलिदियो। मेरो इम्प्लान्ट प्रक्रिया पीडारहित थियो र नतिजा अद्भुत छ!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80' },
    { name: 'Rajesh Shrestha', role: 'नियमित बिरामी', text: 'अनलाइन बुकिङ धेरै सुविधाजनक छ। एक मिनेटमा अपोइन्टमेन्ट बुक भयो, स्टाफ एकदमै राम्रो छन्। बुटवलका सबैलाई सिफारिस गर्छु!', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
    { name: 'Priya Karki', role: 'इम्प्लान्ट बिरामी', text: 'यहाँ डेन्टल इम्प्लान्ट गराएँ। प्रयोग गरिने प्रविधि विश्वस्तरको छ र डाक्टरहरू अत्यन्त दक्ष छन्। पूर्ण सन्तुष्ट छु।', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
  ] : [
    { name: 'Sarah Tamang', role: 'Patient since 2021', text: 'I was always afraid of dentists, but the team at Unique Dental completely changed that. My implant procedure was painless and the result is stunning!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80' },
    { name: 'Rajesh Shrestha', role: 'Regular Patient', text: 'The online booking is so convenient. I booked my cleaning in under a minute, and the staff is absolutely wonderful. Highly recommend to everyone in Butwal!', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
    { name: 'Priya Karki', role: 'Implant Patient', text: 'Got my dental implants done here. The technology they use is top-notch and the doctors are incredibly skilled. Worth every penny.', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
  ];

  const whyCards = np ? [
    { icon: Zap,        num: '01', title: 'आपतकालीन सेवा',         desc: 'दाँत दुखाइ वा चोट? हामी सोही दिन, सोम–शनि, तपाईंलाई हेर्छौं। एउटा फोन कल मात्र गर्नुस्।', glow: 'hover:shadow-primary-500/20', ring: 'border-primary-600/40 hover:border-primary-400/60', iconBg: 'bg-primary-500/20 group-hover:bg-primary-500/35' },
    { icon: ShieldCheck, num: '02', title: 'अनुभवी दन्त चिकित्सक',   desc: 'हाम्रा डाक्टरहरू पूर्ण प्रमाणित छन् र सबै उपचारमा वर्षौंको अनुभव छ।', glow: 'hover:shadow-accent-500/20', ring: 'border-accent-500/30 hover:border-accent-400/60', iconBg: 'bg-accent-500/20 group-hover:bg-accent-500/35' },
    { icon: Microscope,  num: '03', title: 'आधुनिक उपकरण',          desc: 'डिजिटल एक्स-रे र उन्नत इमेजिङले स्पष्ट तस्बिर दिन्छ र सटीक उपचार गर्न सहयोग गर्छ।', glow: 'hover:shadow-emerald-500/20', ring: 'border-emerald-500/30 hover:border-emerald-400/60', iconBg: 'bg-emerald-500/20 group-hover:bg-emerald-500/35' },
    { icon: Activity,    num: '04', title: 'डर लाग्छ? कुनै समस्या छैन!', desc: 'उपचारभर तपाईं शान्त र आरामदायी महसुस गर्नुहोस् भनेर हामी सेडेसन विकल्प प्रदान गर्छौं।', glow: 'hover:shadow-rose-500/20', ring: 'border-rose-500/30 hover:border-rose-400/60', iconBg: 'bg-rose-500/20 group-hover:bg-rose-500/35' },
  ] : [
    { icon: Zap,        num: '01', title: 'Emergency Care',     desc: 'Tooth pain or injury? We fit you in the same day, Mon–Sat. Just give us a call.', glow: 'hover:shadow-primary-500/20', ring: 'border-primary-600/40 hover:border-primary-400/60', iconBg: 'bg-primary-500/20 group-hover:bg-primary-500/35' },
    { icon: ShieldCheck, num: '02', title: 'Experienced Dentists', desc: 'Our dentists are fully certified with years of hands-on experience across all treatments.', glow: 'hover:shadow-accent-500/20', ring: 'border-accent-500/30 hover:border-accent-400/60', iconBg: 'bg-accent-500/20 group-hover:bg-accent-500/35' },
    { icon: Microscope,  num: '03', title: 'Modern Equipment',  desc: 'We use digital X-rays and advanced imaging to get a clear picture and treat you accurately.', glow: 'hover:shadow-emerald-500/20', ring: 'border-emerald-500/30 hover:border-emerald-400/60', iconBg: 'bg-emerald-500/20 group-hover:bg-emerald-500/35' },
    { icon: Activity,    num: '04', title: 'Nervous? No Problem', desc: 'We offer sedation options to help you stay calm and relaxed throughout your treatment.', glow: 'hover:shadow-rose-500/20', ring: 'border-rose-500/30 hover:border-rose-400/60', iconBg: 'bg-rose-500/20 group-hover:bg-rose-500/35' },
  ];

  const stats = np
    ? [{ v: '१०,०००+', l: 'उपचारित बिरामी' }, { v: '१५+', l: 'वर्षको उत्कृष्टता' }, { v: '९८%', l: 'सन्तुष्टि दर' }, { v: '५,०००+', l: 'राखिएका इम्प्लान्ट' }]
    : [{ v: '10,000+', l: 'Patients Treated' }, { v: '15+', l: 'Years of Excellence' }, { v: '98%', l: 'Satisfaction Rate' }, { v: '5,000+', l: 'Implants Placed' }];

  const aboutPoints = np
    ? ['डिजिटल एक्स-रे र ३डी इमेजिङ प्रविधि', 'सोही दिन आपतकालीन अपोइन्टमेन्ट उपलब्ध', 'लचिलो भुक्तानी योजना उपलब्ध', 'WHO मानकभन्दा उच्च स्टेरिलाइजेसन']
    : ['State-of-the-art digital X-ray & 3D imaging', 'Same-day emergency appointments available', 'Flexible payment plans available', 'Sterilisation standards exceeding WHO guidelines'];

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center">
        <img src={HERO} alt="Smiling patient at Unique Dental" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/80 to-gray-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <div className="max-w-2xl">

            <Animate variant="fade-down" delay={150} duration={800}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-5 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-primary-400" />
                {np ? 'पुष्पलाल पार्क, बुटवल, रूपन्देही' : 'Puspalal Park, Butwal, Rupandehi'}
              </div>
            </Animate>

            <Animate variant="fade-down" delay={300} duration={800}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/25 border border-primary-400/40 text-primary-300 text-sm font-semibold mb-8 ml-2">
                <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                {np ? 'नयाँ बिरामीहरूलाई स्वागत' : 'Now Accepting New Patients'}
              </div>
            </Animate>

            <Animate variant="fade-up" delay={450} duration={950}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
                {np ? <>तपाईंको मुस्कान,{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">परिपूर्ण।</span></> : <>Your Smile,{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">Perfected.</span></>}
              </h1>
            </Animate>

            <Animate variant="fade-up" delay={600} duration={900}>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                {np
                  ? <>युनिक डेन्टल र इम्प्लान्ट सेन्टर — जहाँ आधुनिक प्रविधि र सच्चा सहानुभूति मिल्छन्। <span className="text-primary-300 font-medium">आधुनिक प्रविधि, गुणस्तरीय उपचार।</span></>
                  : <>Unique Dental and Implant Center — where modern technology meets genuine compassion. <span className="text-primary-300 font-medium">आधुनिक प्रविधि, गुणस्तरीय उपचार।</span></>
                }
              </p>
            </Animate>

            <Animate variant="fade-up" delay={750} duration={850}>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button onClick={() => openBookingModal()} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-all duration-200 shadow-2xl shadow-accent-600/40 text-base hover:scale-[1.02] active:scale-[0.98]">
                  {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment'} <ChevronRight className="h-5 w-5" />
                </button>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366]/90 hover:bg-[#25D366] text-white font-bold rounded-2xl transition-all duration-200 text-base">
                  <WaIcon className="h-5 w-5" />
                  {np ? 'च्याट गर्नुहोस्' : 'Chat with us'}
                </a>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 mb-10">
                <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  {np ? 'हामीलाई पछ्याउनुहोस्:' : 'Follow Us:'}
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on Instagram"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on Facebook"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={TIKTOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on TikTok"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-black hover:border-pink-500/50 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <TikTokIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={900} duration={850}>
              <div className="flex flex-wrap items-center gap-6">
                {(np
                  ? [{ icon: Users, value: '१०,०००+', label: 'उपचारित बिरामी' }, { icon: Award, value: '१५+', label: 'वर्षको अनुभव' }, { icon: Star, value: '४.९★', label: 'रेटिङ' }]
                  : [{ icon: Users, value: '10,000+', label: 'Patients Treated' }, { icon: Award, value: '15+', label: 'Yrs Experience' }, { icon: Star, value: '4.9★', label: 'Rating' }]
                ).map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white/80">
                    <Icon className="h-4 w-4 text-accent-400" />
                    <span className="font-bold text-white">{value}</span>
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>

        {/* Floating hours card */}
        <Animate variant="fade-left" delay={950} duration={900} className="absolute bottom-10 right-6 lg:right-12 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white w-60 shadow-2xl">
            <p className="text-xs font-bold text-primary-300 uppercase tracking-widest mb-3">{np ? 'खुल्ने समय' : 'Opening Hours'}</p>
            <div className="space-y-1.5 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-white/70">{np ? 'आइत – शुक्र' : 'Sun – Fri'}</span>
                <span className="font-semibold">{np ? 'बि.८ – सा.६' : '8am – 6pm'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">{np ? 'शनिबार' : 'Saturday'}</span>
                <span className="font-semibold">{np ? 'बि.९ – दि.४' : '9am – 4pm'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <a href={PHONE} className="flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-600 text-white text-sm font-bold px-3 py-2.5 rounded-xl transition-colors w-full">
                <Phone className="h-3.5 w-3.5" /> 071-537300
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white text-sm font-bold px-3 py-2.5 rounded-xl transition-colors w-full">
                <WaIcon className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>

            {/* Social links */}
            <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-center gap-3">
              <span className="text-[11px] text-white/70 font-medium">{np ? 'सञ्जाल:' : 'Social:'}</span>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-white/80 hover:text-white transition-transform hover:scale-110">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" title="Facebook" className="text-white/80 hover:text-white transition-transform hover:scale-110">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href={TIKTOK} target="_blank" rel="noopener noreferrer" title="TikTok" className="text-white/80 hover:text-white transition-transform hover:scale-110">
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Animate>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/40 text-xs">
          <div className="w-0.5 h-8 bg-white/20 rounded-full" />
          <span>{np ? 'तल स्क्रोल गर्नुहोस्' : 'Scroll'}</span>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-700/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-accent-400 font-bold text-sm uppercase tracking-widest mb-4">
              <span className="inline-block h-px w-8 bg-accent-400" />
              {np ? 'हामीलाई किन छान्ने?' : 'Why Choose Us'}
              <span className="inline-block h-px w-8 bg-accent-400" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {np ? <>डेन्टल सेवा जुन{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">फरक छ</span></> : <>Dental Care Made{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">Different</span></>}
            </h2>
            <p className="mt-5 text-primary-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {np ? 'हामी अत्याधुनिक प्रविधि र बिरामी-प्रथम दृष्टिकोण मिलाउँछौं ताकि हर भ्रमण आरामदायी र चिन्तामुक्त होस्।' : 'We combine cutting-edge technology with a warm, patient-first approach so every visit is comfortable and stress-free.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map(({ icon: Icon, num, title, desc, glow, ring, iconBg }) => (
              <div key={num} className={`group relative bg-white/5 backdrop-blur-sm border ${ring} rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl ${glow} transition-all duration-300 overflow-hidden`}>
                <span className="absolute -bottom-2 -right-1 text-7xl font-black text-white/[0.04] group-hover:text-white/[0.07] transition-colors leading-none select-none pointer-events-none">
                  {num}
                </span>
                <div className={`inline-flex p-4 rounded-2xl mb-6 transition-colors ${iconBg}`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2.5 leading-snug">{title}</h3>
                <p className="text-primary-300 text-sm leading-relaxed group-hover:text-primary-200 transition-colors">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {stats.map(({ v, l }) => (
              <div key={l} className="bg-white/5 px-6 py-5 text-center hover:bg-white/10 transition-colors">
                <p className="text-2xl font-extrabold text-accent-400">{v}</p>
                <p className="text-primary-300 text-xs mt-1 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SPLIT ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-gray-100 bg-slate-100">
                <img
                  src={CLINIC}
                  alt={np ? 'युनिक डेन्टल क्लिनिक' : 'Unique Dental clinic interior'}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-accent-50 flex items-center justify-center">
                  <Award className="h-7 w-7 text-accent-600" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">{np ? '१५+' : '15+'}</p>
                  <p className="text-xs text-gray-500 font-medium">{np ? 'वर्षको उत्कृष्टता' : 'Years of Excellence'}</p>
                </div>
              </div>
              <div className="absolute -top-5 -left-5 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden lg:block bg-slate-100">
                <img
                  src={TREATMENT}
                  alt={np ? 'डेन्टल उपचार' : 'Dental treatment'}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            <div>
              <span className="inline-block text-primary-700 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'हाम्रो बारेमा' : 'About Us'}</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {np ? 'बुटवलको सबैभन्दा विश्वस्त डेन्टल सेन्टर' : "Butwal's Most Trusted Dental Center"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                {np
                  ? <>२००९ मा स्थापित, <strong>युनिक डेन्टल र इम्प्लान्ट सेन्टर प्रा.लि.</strong> करुणा, सटीकता र विश्वस्तरीय हेरचाहले मुस्कान परिवर्तन गर्न समर्पित छ — पुष्पलाल पार्क, बुटवलमा।</>
                  : <>Founded in 2009, <strong>Unique Dental and Implant Center Pvt. Ltd.</strong> has been dedicated to transforming smiles with compassion, precision, and world-class care — right here in Puspalal Park, Butwal.</>
                }
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                {np
                  ? 'नियमित जाँचदेखि जटिल इम्प्लान्ट शल्यक्रियासम्म, हाम्रो विशेषज्ञ टोली नवीनतम प्रविधि प्रयोग गरेर उत्कृष्ट नतिजा दिन्छ।'
                  : 'From routine checkups to complex implant surgeries, our team of specialists uses the latest technology to deliver outstanding results in a warm, welcoming environment.'
                }
              </p>
              <ul className="space-y-3 mb-8">
                {aboutPoints.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => openBookingModal()} className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-primary-700/25">
                  {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Now'} <ChevronRight className="h-5 w-5" />
                </button>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1db954] text-white font-bold rounded-2xl transition-colors">
                  <WaIcon className="h-5 w-5" /> {np ? 'प्रश्न सोध्नुहोस्' : 'Ask a Question'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GROUPED ── */}
      <section className="py-20 sm:py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative ambient background glows matching Inside Unique Dental */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle geometric micro-dot texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-accent-400 font-bold text-xs uppercase tracking-widest mb-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-accent-400 animate-pulse" />
                {np ? 'हामी के गर्छौं' : 'What We Offer'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {np ? 'हाम्रा सेवाहरू' : 'Our Services'}
              </h2>
              <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-xl">
                {np
                  ? 'हाम्रा सेवाहरू श्रेणीअनुसार — आफूलाई चाहिएको फेला पार्नुहोस्।'
                  : 'Browse all treatments organised by category — find exactly what you need.'}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all self-start sm:self-auto text-sm backdrop-blur-sm shadow-xl group"
            >
              <span>{np ? 'सबै हेर्नुहोस्' : 'View All'}</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Category Filter Pills with Effects */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-accent-500 hover:bg-accent-400 text-white shadow-lg shadow-accent-500/25 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 hover:text-white backdrop-blur-sm'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{np ? 'सबै सेवाहरू' : 'All Treatments'}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedCategory === 'all' ? 'bg-white/25 text-white' : 'bg-white/10 text-gray-400'
                }`}
              >
                {serviceGroups.reduce((acc, g) => acc + g.items.length, 0)}
              </span>
            </button>
            {serviceGroups.map((group) => {
              const Icon = group.icon;
              const isSelected = selectedCategory === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedCategory(group.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-r ${group.gradient} text-white shadow-lg scale-[1.02]`
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 hover:text-white backdrop-blur-sm'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{group.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {group.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category groups (compact layout) */}
          <div className="space-y-8 sm:space-y-10">
            {(selectedCategory === 'all'
              ? serviceGroups
              : serviceGroups.filter((g) => g.id === selectedCategory)
            ).map((group, gi) => {
              const GroupIcon = group.icon;
              return (
                <Animate key={group.label} variant="fade-up" delay={gi * 60}>
                  <div className={`rounded-2xl sm:rounded-3xl border ${group.border} overflow-hidden shadow-2xl bg-white/[0.03] backdrop-blur-md`}>
                    {/* Compact Group header band */}
                    <div className={`bg-gradient-to-r ${group.gradient} px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 shadow-inner`}>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xs">
                          <GroupIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-extrabold text-base sm:text-lg leading-tight">
                              {group.label}
                            </h3>
                            <span className="text-[10px] sm:text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                              {group.items.length} {np ? 'उपचार' : group.items.length === 1 ? 'treatment' : 'treatments'}
                            </span>
                          </div>
                          <p className="text-white/85 text-xs mt-0.5 hidden sm:block">{group.tagline}</p>
                        </div>
                      </div>
                      <p className="text-white/85 text-[11px] sm:hidden font-medium line-clamp-1">{group.tagline}</p>
                    </div>

                    {/* Service cards inside the group (compact size & effects) */}
                    <div className={`${group.lightBg} p-3 sm:p-4 bg-gray-950/40`}>
                      <div className={`grid gap-3 sm:gap-4 ${
                        group.items.length === 1
                          ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 max-w-sm sm:max-w-none'
                          : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                      }`}>
                        {group.items.map(({ photo, title, desc }) => (
                          <div
                            key={title}
                            onClick={() => openBookingModal(title)}
                            className="group relative bg-gray-950/80 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 before:z-20"
                          >
                            {/* Photo Container */}
                            <div className="h-32 sm:h-36 md:h-40 overflow-hidden relative bg-gray-900 flex-shrink-0">
                              <img
                                src={photo}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                loading="lazy"
                                decoding="async"
                              />
                              {/* Bottom gradient vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                              {/* Group hover color overlay */}
                              <div className={`absolute inset-0 bg-gradient-to-t ${group.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                              
                              {/* Floating Glassmorphism Tag */}
                              <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-semibold tracking-wide shadow-xs">
                                <GroupIcon className="h-2.5 w-2.5 text-white/90" />
                                <span className="line-clamp-1">{group.label.split(' ')[0]}</span>
                              </div>

                              {/* Hover micro sparkle badge */}
                              <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md text-accent-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-sm border border-white/20">
                                <Sparkles className="h-3 w-3" />
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-gray-950/90 relative z-10">
                              <div>
                                <h4 className="font-bold text-white text-xs sm:text-sm mb-1 group-hover:text-accent-300 transition-colors leading-snug line-clamp-1">
                                  {title}
                                </h4>
                                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2">
                                  {desc}
                                </p>
                              </div>

                              {/* Footer Action Row */}
                              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                                <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-400 transition-colors hidden sm:inline">
                                  {np ? 'पीडारहित सेवा' : 'Care & Comfort'}
                                </span>
                                <div className={`inline-flex items-center gap-1 font-bold ${group.pill} px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] group-hover:scale-105 transition-transform duration-200 shadow-2xs`}>
                                  <span>{np ? 'बुक' : 'Book'}</span>
                                  <ChevronRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                </div>
                              </div>
                            </div>

                            {/* Active bottom accent bar */}
                            <div className={`h-0.5 w-full bg-gradient-to-r ${group.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Animate>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section className="py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-700/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-accent-400 font-bold text-sm uppercase tracking-widest mb-4">
              <span className="inline-block h-px w-8 bg-accent-400" />
              {np ? 'हाम्रा शाखाहरू' : 'Our Locations'}
              <span className="inline-block h-px w-8 bg-accent-400" />
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {np ? <>बुटवलभर <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">३ शाखाहरू</span></> : <>3 Branches Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">Butwal</span></>}
            </h2>
            <p className="mt-4 text-primary-300 text-lg max-w-xl mx-auto">
              {np ? 'तपाईंको नजिकको शाखामा आउनुहोस् — उही उच्च गुणस्तरको सेवा, हरेक ठाउँमा।' : 'Visit the branch nearest to you — same premium care, every location.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANCHES.map((b) => (
              <div
                key={b.id}
                className={`group relative rounded-3xl border-2 ${b.color} p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[440px]`}
              >
                {/* Background Clinic Storefront Photo */}
                <img
                  src={b.image}
                  alt={b.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.72] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Multi-layered dark gradient overlay for optimal readability & atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/45 group-hover:via-gray-950/70 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

                {/* Card Top: Badges & Icon */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className={`inline-flex p-3.5 rounded-2xl backdrop-blur-md shadow-md ${b.iconBg}`}>
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md ${b.tagColor}`}>
                    {np ? b.tagNp : b.tag}
                  </span>
                </div>

                {/* Card Center: Titles & Details */}
                <div className="relative z-10 flex-1 flex flex-col justify-end">
                  <h3 className="font-extrabold text-white text-xl mb-1.5 leading-snug drop-shadow-sm group-hover:text-accent-300 transition-colors">
                    {np ? b.nameNp : b.name}
                  </h3>
                  <p className="text-primary-200 text-sm mb-4 drop-shadow-xs flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-400" />
                    {np ? b.addressNp : b.address}
                  </p>

                  <div className="space-y-2 mb-6 bg-black/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-inner">
                    <div className="flex items-center gap-2 text-sm text-white/95">
                      <Phone className="h-3.5 w-3.5 text-accent-400 flex-shrink-0" />
                      <a href={`tel:${b.phone.replace(/-/g, '')}`} className="font-semibold hover:text-accent-300 transition-colors">
                        {b.phone}
                      </a>
                      {b.phone2 && (
                        <>
                          <span className="text-white/40">·</span>
                          <a href={`tel:${b.phone2.replace(/-/g, '')}`} className="font-semibold hover:text-accent-300 transition-colors">
                            {b.phone2}
                          </a>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-primary-300 flex items-center gap-1.5 font-medium">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {np ? b.hoursNp : b.hours}
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-primary-200">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="h-3.5 w-3.5 text-accent-400" />
                        {np ? 'सबै विशेषज्ञ डाक्टरहरू उपलब्ध' : 'All Doctors & Services Available'}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-accent-300">
                        {np ? 'पूर्ण सेवाहरू' : 'Full Care'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openBookingModal(b.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-900/40 active:scale-[0.98] cursor-pointer"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      {np ? 'बुक गर्नुहोस्' : 'Book Here'}
                    </button>
                    {b.mapsUrl && b.mapsUrl !== '#' ? (
                      <a
                        href={b.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl text-xs transition-all backdrop-blur-md shadow-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 text-accent-400" />
                        {np ? 'नक्सा' : 'Get Directions'}
                      </a>
                    ) : (
                      <Link
                        to="/branches"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl text-xs transition-all backdrop-blur-md shadow-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 text-accent-400" />
                        {np ? 'शाखा विवरण' : 'Branch Info'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl transition-all shadow-2xl shadow-emerald-900/40 text-base hover:scale-[1.02] active:scale-[0.98]"
            >
              {np ? 'अहिले नै अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Your Appointment Now'}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 12-PHOTO AESTHETIC GALLERY SHOWCASE ── */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-accent-400 font-bold text-sm uppercase tracking-widest mb-3">
                <Camera className="h-4 w-4" /> {np ? 'हाम्रो ग्यालरी' : 'Visual Showcase'}
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                {np ? 'हाम्रा शाखाहरू, टोली र शिविरहरू' : 'Inside Unique Dental & Communities'}
              </h2>
              <p className="text-gray-400 text-base mt-3 max-w-xl">
                {np 
                  ? 'हाम्रा ३ वटा शाखाहरू, विशेषज्ञ चिकित्सकहरू, निःशुल्क दन्त शिविरहरू र सन्तुष्ट बिरामीहरूको वास्तविक झलक।'
                  : 'Authentic moments from our 3 branches, specialist doctors, community health camps, and happy patient smiles.'
                }
              </p>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all self-start md:self-auto text-sm backdrop-blur-sm shadow-xl"
            >
              <Image className="h-4 w-4 text-accent-400" />
              {np ? 'सबै २५+ तस्बिरहरू हेर्नुहोस्' : 'View Full 25+ Photo Gallery'}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] sm:auto-rows-[275px]">
            {CLINIC_PHOTOS.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxPhoto(item)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-xl ${item.span}`}
              >
                <img
                  src={item.photo}
                  alt={np ? item.titleNp : item.title}
                  className={`w-full h-full object-cover ${item.pos || 'object-center'} transition-transform duration-700 group-hover:scale-105`}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pb-10 pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 border border-white/40 shadow-xl">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-accent-300 border border-white/10">
                    {np ? item.catNp || item.cat : item.cat}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug group-hover:text-accent-300 transition-colors drop-shadow-md">
                    {np ? item.titleNp : item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary-700 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'बिरामीहरूका कथाहरू' : 'Patient Stories'}</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              {np ? 'वास्तविक मुस्कान, वास्तविक नतिजा' : 'Real Smiles, Real Results'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating, avatar }) => (
              <div key={name} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <img src={avatar} alt={name} className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-sm" loading="lazy" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK CONTACT STRIP ── */}
      <section className="bg-primary-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold text-white mb-1">{np ? 'प्रश्न छ? हामी छिटो जवाफ दिन्छौं।' : 'Have a question? We reply fast.'}</h3>
              <p className="text-primary-300 text-sm">{np ? 'व्हाट्सएपमा च्याट गर्नुहोस् वा सिधा फोन गर्नुहोस् — हामी तपाईंका लागि तयार छौं।' : "Chat on WhatsApp or call us directly — we're here for you."}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1db954] text-white font-bold rounded-2xl transition-colors shadow-xl">
                <WaIcon className="h-5 w-5" /> {np ? 'व्हाट्सएपमा च्याट' : 'Chat on WhatsApp'}
              </a>
              <a href={PHONE} className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-2xl transition-colors">
                <Phone className="h-4 w-4" /> 071-537300
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-28 overflow-hidden">
        <img src={TREATMENT} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary-900/90" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 text-accent-400" />
            {np ? 'पुष्पलाल पार्क, बुटवल, रूपन्देही' : 'Puspalal Park, Butwal, Rupandehi'}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {np ? 'स्वस्थ मुस्कानका लागि तयार हुनुहुन्छ?' : 'Ready for a Healthier Smile?'}
          </h2>
          <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
            {np ? 'आज युनिक डेन्टल र इम्प्लान्ट सेन्टरमा अपोइन्टमेन्ट बुक गर्नुहोस्। नयाँ बिरामीहरूलाई सधैं स्वागत छ।' : 'Book your appointment at Unique Dental and Implant Center today. New patients are always welcome.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openBookingModal()} className="px-9 py-4 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-all shadow-2xl text-base hover:scale-[1.01] active:scale-[0.99]">
              {np ? 'अहिले अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment Now'}
            </button>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 px-9 py-4 bg-[#25D366] hover:bg-[#1db954] text-white font-bold rounded-2xl transition-colors text-base">
              <WaIcon className="h-5 w-5" /> {np ? 'व्हाट्सएप' : 'WhatsApp Us'}
            </a>
            <a href={PHONE} className="flex items-center justify-center gap-2 px-9 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-2xl transition-colors text-base">
              <Phone className="h-4 w-4" /> {np ? 'फोन गर्नुहोस्' : 'Call Now'}
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-white/70 text-sm font-semibold">{np ? 'हाम्रा सामाजिक सञ्जालहरू:' : 'Connect with us on social media:'}</span>
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-black hover:border-pink-500/50 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP-LEVEL HOME LIGHTBOX MODAL (PORTALED TO BODY) ── */}
      {lightboxPhoto && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
            <span className="text-white/90 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 pointer-events-auto shadow-lg">
              {homeCurrentIdx + 1} / {CLINIC_PHOTOS.length}
            </span>
            <button
              type="button"
              className="p-2.5 sm:p-3 bg-white/15 hover:bg-white/30 rounded-full text-white transition-all pointer-events-auto shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Prev / Next Buttons */}
          <button
            type="button"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 rounded-full text-white transition-all z-30 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-90"
            onClick={prevHome}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
          <button
            type="button"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 rounded-full text-white transition-all z-30 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-90"
            onClick={nextHome}
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          {/* Centered Image + Caption Container */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto pt-12 sm:pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center w-full max-h-[60vh] sm:max-h-[72vh]">
              <img
                src={lightboxPhoto.photo}
                alt={np ? lightboxPhoto.titleNp : lightboxPhoto.title}
                className="max-h-[60vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-white/15 rounded-2xl px-5 sm:px-8 py-3.5 sm:py-4 text-center max-w-2xl w-full shadow-2xl">
              <span className="inline-block text-accent-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mb-1">
                {np ? lightboxPhoto.catNp || lightboxPhoto.cat : lightboxPhoto.cat}
              </span>
              <h4 className="text-white font-bold text-sm sm:text-base leading-snug">
                {np ? lightboxPhoto.titleNp : lightboxPhoto.title}
              </h4>
              <div className="mt-3 flex items-center justify-center gap-3">
                <Link
                  to="/gallery"
                  onClick={() => setLightboxPhoto(null)}
                  className="inline-flex items-center gap-1.5 text-xs text-primary-300 hover:text-white font-semibold transition-colors"
                >
                  {np ? 'पूर्ण २५+ ग्यालरी हेर्नुहोस् →' : 'Explore Full 25+ Gallery →'}
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
