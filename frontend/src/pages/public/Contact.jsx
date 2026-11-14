import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

const PHONE1 = 'tel:071537300';
const PHONE2 = 'tel:9854040984';
const EMAIL = 'mailto:uniquedentalbutwal@gmail.com';
const MAPS_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.392962526219!2d83.4461641871582!3d27.69880959999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399687573dafd3fd%3A0xa518e511157cedb2!2sUnique%20dental%20and%20Implant%20Centre%20Pvt.Ltd!5e0!3m2!1sen!2snp!4v1793109512544!5m2!1sen!2snp';
const MAPS_LINK = 'https://maps.app.goo.gl/EVbXgJAzc7AEAR556';

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
    tagColor: 'bg-primary-100 text-primary-700',
    mapsUrl: 'https://maps.app.goo.gl/EVbXgJAzc7AEAR556',
    accentClass: 'border-primary-200 hover:border-primary-400 hover:shadow-primary-100',
    iconBg: 'bg-primary-600',
  },
  {
    id: 'lumbini',
    name: 'Unique Dental Clinic',
    nameNp: 'युनिक डेन्टल क्लिनिक (लुम्बिनी)',
    address: 'Taulihawa Road, Lumbini',
    addressNp: 'तौलिहवा रोड, लुम्बिनी',
    phone: '071-590100',
    phone2: '985-404-0984',
    hours: 'Sun–Fri 8am–6pm · Sat 9am–4pm',
    hoursNp: 'आइत–शुक्र बि.८–सा.६ · शनि बि.९–दि.४',
    tag: 'Lumbini Branch',
    tagNp: 'लुम्बिनी शाखा',
    tagColor: 'bg-amber-100 text-amber-700',
    mapsUrl: 'https://maps.app.goo.gl/M4AWq8d9vh2vUmxo9',
    accentClass: 'border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
    iconBg: 'bg-amber-500',
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
    tagColor: 'bg-emerald-100 text-emerald-700',
    mapsUrl: '#',
    accentClass: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100',
    iconBg: 'bg-emerald-600',
  },
];

export default function Contact() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const np = lang === 'np';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const subjectOptions = np
    ? ['अपोइन्टमेन्ट सोधपुछ', 'इम्प्लान्ट परामर्श', 'उपचार जानकारी', 'बीमा र भुक्तानी', 'आपतकाल', 'अन्य']
    : ['Appointment Inquiry', 'Implant Consultation', 'Treatment Information', 'Insurance & Payment', 'Emergency', 'Other'];

  const faqs = np
    ? [
        { q: 'बुक गर्न बीमा चाहिन्छ?', a: 'होइन। हामी बीमासहित र बिनाबीमा सबै बिरामीलाई स्वागत गर्छौं र लचिलो भुक्तानी योजना उपलब्ध छ।' },
        { q: 'कति छिटो अपोइन्टमेन्ट पाइन्छ?', a: 'अधिकांश स्लट १–३ दिनभित्र उपलब्ध हुन्छ। आपतकालीन केसहरू सोही दिन हेरिन्छ।' },
        { q: 'इम्प्लान्ट शल्यक्रिया पीडादायक हुन्छ?', a: 'हाम्रो इम्प्लान्ट प्रक्रिया स्थानीय एनेस्थेसियाअन्तर्गत गरिन्छ — अधिकांश बिरामीहरूले न्यूनतम असुविधा महसुस गर्छन्।' },
        { q: 'तपाईंहरू कहाँ छनुहुन्छ?', a: 'हामी पुष्पलाल पार्क, बुटवल, रूपन्देहीमा छौं। मुख्य सडकनजिकै सजिलैसँग भेटिन्छ — निःशुल्क पार्किङ उपलब्ध।' },
      ]
    : [
        { q: 'Do I need insurance to book?', a: 'No. We welcome all patients with or without insurance, and flexible payment plans are available.' },
        { q: 'How quickly can I get an appointment?', a: 'Most slots are available within 1–3 days. Emergency cases are seen the same day.' },
        { q: 'Is implant surgery painful?', a: 'Our implant procedure is performed under local anaesthesia — most patients feel minimal discomfort.' },
        { q: 'Where are you located?', a: 'We are at Puspalal Park, Butwal, Rupandehi. Easy to find near the main road — free parking available.' },
      ];

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-3xl mx-auto">
          <Animate variant="fade-down" delay={150} duration={700}>
            <span className="inline-block text-primary-300 font-bold text-sm uppercase tracking-widest mb-4">{np ? 'सम्पर्कमा आउनुहोस्' : 'Get In Touch'}</span>
          </Animate>
          <Animate variant="fade-up" delay={300} duration={850}>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">{np ? 'हामीलाई सम्पर्क गर्नुहोस्' : 'Contact Us'}</h1>
          </Animate>
          <Animate variant="fade-up" delay={450} duration={800}>
            <p className="text-primary-200 text-xl max-w-2xl mx-auto">
              {np
                ? 'कुनै प्रश्न छ वा अपोइन्टमेन्ट लिन चाहनुहुन्छ? युनिक डेन्टलको मित्रवत् टोली तपाईंका लागि सधैं तयार छ।'
                : 'Have a question or want to book an appointment? The friendly team at Unique Dental is always here for you.'
              }
            </p>
          </Animate>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <Animate variant="zoom-up" delay={100} duration={600}>
              <a href={PHONE1} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-lg hover:border-primary-200 transition-all group h-full">
                <div className="p-3 rounded-xl flex-shrink-0 bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{np ? 'फोन' : 'Phone'}</p>
                  <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-primary-700 transition-colors">071-537300</p>
                  <p className="text-xs text-primary-600 font-semibold mt-0.5">985-404-0984</p>
                  <p className="text-xs text-gray-400 mt-0.5">{np ? 'आइत–शुक्र बि.८–सा.६ · शनि बि.९–दि.४' : 'Sun–Fri 8am–6pm · Sat 9am–4pm'}</p>
                </div>
              </a>
            </Animate>

            <Animate variant="zoom-up" delay={200} duration={600}>
              <a href={EMAIL} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-lg hover:border-blue-200 transition-all group h-full">
                <div className="p-3 rounded-xl flex-shrink-0 bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{np ? 'इमेल' : 'Email'}</p>
                  <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors break-all">uniquedentalbutwal@gmail.com</p>
                  <p className="text-xs text-gray-400 mt-0.5">{np ? '२४ घण्टाभित्र जवाफ' : 'Reply within 24 hours'}</p>
                </div>
              </a>
            </Animate>

            <Animate variant="zoom-up" delay={300} duration={600}>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-lg hover:border-purple-200 transition-all group h-full">
                <div className="p-3 rounded-xl flex-shrink-0 bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{np ? 'ठेगाना' : 'Address'}</p>
                  <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-purple-700 transition-colors">{np ? 'पुष्पलाल पार्क, बुटवल' : 'Puspalal Park, Butwal'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{np ? 'रूपन्देही, नेपाल' : 'Rupandehi, Nepal'}</p>
                  <p className="text-xs text-purple-600 font-semibold mt-1">{np ? 'नक्सामा हेर्नुहोस् →' : 'View on Map →'}</p>
                </div>
              </a>
            </Animate>

            <Animate variant="zoom-up" delay={400} duration={600}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 h-full">
                <div className="p-3 rounded-xl flex-shrink-0 bg-accent-50 text-accent-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{np ? 'समय' : 'Hours'}</p>
                  <p className="font-bold text-gray-900 text-sm leading-snug">{np ? 'आइत – शुक्र: बि.८ – सा.६' : 'Sun – Fri: 8am – 6pm'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{np ? 'शनिबार: बि.९ – दि.४' : 'Saturday: 9am – 4pm'}</p>
                  <p className="text-xs text-red-500 font-semibold mt-1">{np ? 'सार्वजनिक बिदामा बन्द' : 'Closed on public holidays'}</p>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate variant="fade-up" className="text-center mb-10">
            <span className="inline-block text-primary-700 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'स्थानहरू' : 'Our Locations'}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {np ? <>बुटवलभर <span className="text-primary-700">३ शाखाहरू</span></> : <>3 Branches Across <span className="text-primary-700">Butwal</span></>}
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">{np ? 'तपाईंको नजिकको शाखामा आउनुहोस् — उही गुणस्तरको सेवा।' : 'Come to the branch nearest to you — same high-quality care everywhere.'}</p>
          </Animate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANCHES.map((b, i) => (
              <Animate key={b.id} variant="zoom-up" delay={i * 120} duration={600}>
                <div className={`group bg-white rounded-3xl border-2 ${b.accentClass} shadow-sm hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex p-3 rounded-2xl ${b.iconBg}`}>
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${b.tagColor}`}>{np ? b.tagNp : b.tag}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-base mb-1 leading-snug">{np ? b.nameNp : b.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{np ? b.addressNp : b.address}</p>
                    <div className="space-y-1.5 mb-5">
                      <a href={`tel:${b.phone.replace(/-/g, '')}`} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary-700 transition-colors">
                        <Phone className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" /> {b.phone}
                      </a>
                      {b.phone2 && (
                        <a href={`tel:${b.phone2.replace(/-/g, '')}`} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary-700 transition-colors">
                          <Phone className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" /> {b.phone2}
                        </a>
                      )}
                      <p className="text-xs text-gray-400 pl-5">{np ? b.hoursNp : b.hours}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => openBookingModal()}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-primary-600/20"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      {np ? 'बुक गर्नुहोस्' : 'Book Here'}
                    </button>
                    <a
                      href={b.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-600 hover:text-primary-700 font-bold rounded-xl text-xs transition-all"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {np ? 'नक्सा हेर्नुहोस्' : 'Directions'}
                    </a>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + FAQ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <Animate variant="fade-right" duration={700}>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{np ? 'हामीलाई सन्देश पठाउनुहोस्' : 'Send Us a Message'}</h2>
                <p className="text-gray-500 mb-8">{np ? 'हामी एक कार्य दिनभित्र जवाफ दिनेछौं।' : 'We will reply within one business day.'}</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center bg-primary-50 border border-primary-100 rounded-3xl">
                    <CheckCircle className="h-16 w-16 text-primary-500 mb-5" />
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{np ? 'सन्देश पठाइयो!' : 'Message Sent!'}</h3>
                    <p className="text-gray-500 text-sm max-w-xs">{np ? 'सम्पर्क गर्नुभएकोमा धन्यवाद। हामी २४ घण्टाभित्र जवाफ दिनेछौं।' : 'Thank you for reaching out. We will get back to you within 24 hours.'}</p>
                    <button
                      onClick={() => { setForm({ name: '', email: '', phone: '', subject: '', message: '' }); setSubmitted(false); }}
                      className="mt-6 px-7 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
                    >
                      {np ? 'अर्को सन्देश पठाउनुहोस्' : 'Send Another Message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">{np ? 'तपाईंको नाम' : 'Your Name'}</label>
                        <input className="input" placeholder={np ? 'पूरा नाम लेख्नुहोस्' : 'Full name'} value={form.name} onChange={set('name')} required />
                      </div>
                      <div>
                        <label className="label">{np ? 'इमेल ठेगाना' : 'Email Address'}</label>
                        <input type="email" className="input" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">{np ? 'फोन' : 'Phone'} <span className="text-gray-400 font-normal">({np ? 'ऐच्छिक' : 'optional'})</span></label>
                        <input type="tel" className="input" placeholder="98XXXXXXXX" value={form.phone} onChange={set('phone')} />
                      </div>
                      <div>
                        <label className="label">{np ? 'विषय' : 'Subject'}</label>
                        <select className="input" value={form.subject} onChange={set('subject')} required>
                          <option value="">{np ? 'विषय छान्नुहोस्…' : 'Select a subject…'}</option>
                          {subjectOptions.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label">{np ? 'सन्देश' : 'Message'}</label>
                      <textarea className="input resize-none" rows={5} placeholder={np ? 'हामी कसरी मद्दत गर्न सक्छौं?' : 'How can we help you?'} value={form.message} onChange={set('message')} required />
                    </div>
                    <button type="submit" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-600/20">
                      <Send className="h-4 w-4" /> {np ? 'सन्देश पठाउनुहोस्' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </Animate>

            <Animate variant="fade-left" duration={700}>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-extrabold text-gray-900 mb-4">{np ? 'सामान्य प्रश्नहरू' : 'Frequently Asked Questions'}</h3>
                <div className="space-y-4">
                  {faqs.map(({ q, a }) => (
                    <div key={q} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <p className="text-sm font-bold text-gray-900 mb-1">{q}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <a href={PHONE1} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-xl transition-colors">
                    <Phone className="h-4 w-4" /> {np ? '071-537300 मा फोन गर्नुहोस्' : 'Call 071-537300'}
                  </a>
                  <a href={PHONE2} className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-primary-200 text-primary-800 font-bold rounded-xl hover:bg-primary-50 transition-colors">
                    <Phone className="h-4 w-4" /> {np ? '985-404-0984 मा फोन गर्नुहोस्' : 'Call 985-404-0984'}
                  </a>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Animate variant="fade-up" duration={700}>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{np ? 'हामीलाई खोज्नुहोस्' : 'Find Us'}</h2>
                <p className="text-gray-500 text-sm mt-1">{np ? 'पुष्पलाल पार्क, बुटवल, रूपन्देही, नेपाल' : 'Puspalal Park, Butwal, Rupandehi, Nepal'}</p>
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-xl text-sm transition-colors self-start sm:self-auto">
                <MapPin className="h-4 w-4" /> {np ? 'गुगल म्यापमा खोल्नुहोस्' : 'Open in Google Maps'}
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200" style={{ height: '420px' }}>
              <iframe title={np ? 'युनिक डेन्टल र इम्प्लान्ट सेन्टरको स्थान' : 'Unique Dental & Implant Center Location'} src={MAPS_URL} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
            </div>
          </Animate>
        </div>
      </section>

      {/* ── EMERGENCY ── */}
      <Animate variant="zoom-up" duration={600}>
        <section className="bg-red-600 text-white py-8 px-4 text-center">
          <p className="font-bold text-xl">
            🚨 {np ? 'दाँतको आपतकाल? अहिले नै फोन गर्नुहोस्:' : 'Dental emergency? Call now:'}{' '}
            <a href={PHONE2} className="underline font-extrabold hover:text-red-100">985-404-0984</a>
            {' '}{np ? 'वा' : 'or'}{' '}
            <a href={PHONE1} className="underline font-extrabold hover:text-red-100">071-537300</a>
          </p>
          <p className="text-red-200 text-sm mt-1">{np ? 'आइत–शनि सोही दिन आपतकालीन अपोइन्टमेन्ट उपलब्ध' : 'Same-day emergency appointments available Sun–Sat'}</p>
        </section>
      </Animate>
    </div>
  );
}
