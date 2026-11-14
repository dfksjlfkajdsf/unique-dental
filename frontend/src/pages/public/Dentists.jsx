import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Search, CheckCircle2, Award, Calendar, MapPin, X, ChevronRight, Stethoscope, ShieldCheck, UserCheck, Phone } from 'lucide-react';
import { dentists } from '../../data/dentistsData';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

export default function Dentists() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const np = lang === 'np';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);

  const categories = [
    { id: 'All', labelEn: 'All Specialists', labelNp: 'सबै चिकित्सकहरू' },
    { id: 'Orthodontics', labelEn: 'Orthodontics', labelNp: 'अर्थोडन्टिक्स (ब्रेसेस)' },
    { id: 'Endodontics', labelEn: 'Root Canal & Restorative', labelNp: 'रुट क्यानाल र सौन्दर्य' },
    { id: 'Implantology', labelEn: 'Implants & Periodontics', labelNp: 'इम्प्लान्ट र गिजा' },
    { id: 'Surgery', labelEn: 'Oral Surgery', labelNp: 'मुख तथा जबडा शल्यक्रिया' },
    { id: 'General', labelEn: 'General & Hygiene', labelNp: 'सामान्य र हाइजिन' },
  ];

  const filteredDentists = dentists.filter((doc) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      doc.category === selectedCategory ||
      (selectedCategory === 'General' && (doc.category === 'General' || doc.category === 'Hygiene'));
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.nameNp.includes(searchQuery) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.degree.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getServiceFromCategory = (cat) => {
    switch (cat) {
      case 'Orthodontics': return 'Braces/Orthodontics';
      case 'Endodontics': return 'Root Canal';
      case 'Implantology': return 'Dental Implant';
      case 'Surgery': return 'Tooth Extraction';
      case 'General': return 'General Checkup';
      default: return 'General Checkup';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pt-20">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative background glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <Animate variant="fade-down" delay={150} duration={700}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-accent-400" />
              {np ? 'हाम्रो विशेषज्ञ टोली' : 'Expert Dental Medical Team'}
            </span>
          </Animate>

          <Animate variant="fade-up" delay={300} duration={850}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {np ? (
                <>
                  हाम्रा <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-amber-300 to-accent-200">अनुभवी चिकित्सकहरू</span>
                </>
              ) : (
                <>
                  Meet Our Experienced <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-amber-300 to-accent-200">Dental Specialists</span>
                </>
              )}
            </h1>
          </Animate>

          <Animate variant="fade-up" delay={450} duration={800}>
            <p className="text-primary-100/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              {np
                ? 'बुटवल, लुम्बिनी र मणिग्रामका सबै ३ शाखाहरूमा समान गुणस्तरका अनुभवी विशेषज्ञहरू उपलब्ध छन् — तपाईंको मुस्कानको पूर्ण हेरचाहका लागि।'
                : 'Consistent, world-class dental care delivered by board-certified specialists available across all 3 clinic branches in Lumbini Province.'
              }
            </p>
          </Animate>

          {/* Quick Trust Badges */}
          <Animate variant="fade-up" delay={600} duration={800}>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-primary-200">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <ShieldCheck className="h-4 w-4 text-accent-400" />
                {np ? 'नेपाल मेडिकल काउन्सिल (NMC) दर्तावाल' : 'NMC Registered Specialists'}
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <Award className="h-4 w-4 text-accent-400" />
                {np ? 'एम.डी.एस. (MDS) डिग्रीधारी विशेषज्ञहरू' : 'MDS Post-Graduate Doctors'}
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
                <MapPin className="h-4 w-4 text-accent-400" />
                {np ? 'बुटवल, लुम्बिनी र मणिग्राम' : 'Available across 3 Branches'}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── FILTER & SEARCH SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <Animate variant="fade-down" delay={200} duration={600}>
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-primary-700 text-white shadow-md shadow-primary-700/25'
                      : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700'
                  }`}
                >
                  {np ? cat.labelNp : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={np ? 'चिकित्सक वा सेवा खोज्नुहोस्...' : 'Search dentist by name or specialty...'}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary-600 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </Animate>
      </section>

      {/* ── DENTISTS CARDS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredDentists.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
            <Stethoscope className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {np ? 'कुनै चिकित्सक फेला परेन' : 'No Dentists Found'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {np ? 'कृपया अर्कै शब्द वा क्याटोगोरी खोज्नुहोस्।' : 'Try searching with another keyword or resetting the category filter.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-5 py-2.5 bg-primary-600 text-white text-xs font-bold rounded-xl hover:bg-primary-700 transition-colors"
            >
              {np ? 'फिल्टरहरू रिसेट गर्नुहोस्' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDentists.map((doc, i) => (
              <Animate key={doc.id} variant="zoom-up" delay={(i % 3) * 120} duration={600}>
                <div
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_22px_45px_-12px_rgba(4,120,87,0.22)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                >
                {/* Photo Stage & Sculpted Frame */}
                <div className="p-4 sm:p-5 pb-0 bg-gradient-to-b from-slate-50/90 via-emerald-50/20 to-transparent relative">
                  {/* Decorative background glow & subtle clinic accents */}
                  <div className="absolute top-2 right-2 w-32 h-32 bg-accent-400/15 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-accent-400/30 transition-all duration-700 pointer-events-none" />
                  <div className="absolute top-2 left-2 w-28 h-28 bg-primary-500/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-700 pointer-events-none" />

                  {/* Sculpted Outer Gradient Ring Frame */}
                  <div
                    onClick={() => setActiveDoctorModal(doc)}
                    className="relative p-[3px] rounded-[2rem] rounded-tr-[3.8rem] rounded-bl-[1.2rem] bg-gradient-to-tr from-primary-600/30 via-accent-400/40 to-emerald-500/40 group-hover:from-accent-400 group-hover:via-emerald-400 group-hover:to-teal-500 transition-all duration-500 shadow-md group-hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.35)] cursor-pointer"
                  >
                    {/* Inner Masked Container */}
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-[1.85rem] rounded-tr-[3.65rem] rounded-bl-[1.05rem] bg-gradient-to-b from-slate-900 via-primary-950 to-primary-900">
                      {/* Subtle clinic grid pattern */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Doctor Photo */}
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top filter saturate-[0.98] group-hover:saturate-[1.12] group-hover:scale-110 transition-all duration-700 ease-out"
                      />

                      {/* Ambient Gradient Overlays for Readability & Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Light Beam / Shimmer Sweep on Hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900/80 backdrop-blur-md text-accent-300 text-[11px] font-extrabold rounded-full border border-white/15 shadow-md group-hover:border-accent-400/40 transition-colors">
                          <ShieldCheck className="h-3.5 w-3.5 text-accent-400" />
                          NMC Reg. #{doc.nmcNo}
                        </span>
                      </div>

                      <div className="absolute top-3.5 right-3.5 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-extrabold rounded-full shadow-md border border-white/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                          <Award className="h-3 w-3 text-emerald-200" />
                          {doc.experience}
                        </span>
                      </div>

                      {/* Hover Quick Action Pill */}
                      <div className="absolute inset-x-0 bottom-20 flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20">
                        <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-primary-900 text-xs font-black shadow-2xl border border-white flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                          <Sparkles className="h-3.5 w-3.5 text-accent-500" />
                          {np ? 'विस्तृत बायो हेर्नुहोस्' : 'View Full Profile'}
                        </span>
                      </div>

                      {/* Doctor Name & Title Over Image */}
                      <div className="absolute bottom-3.5 left-4 right-4 text-white z-20">
                        <span className="inline-block px-2.5 py-0.5 bg-accent-500 text-primary-950 font-black text-[10px] uppercase tracking-wider rounded-md mb-1 shadow-sm">
                          {np ? doc.titleNp : doc.title}
                        </span>
                        <h2 className="text-xl font-extrabold flex items-center gap-1.5 text-white leading-tight group-hover:text-accent-300 transition-colors">
                          {np ? doc.nameNp : doc.name}
                          <CheckCircle2 className="h-4 w-4 text-accent-400 flex-shrink-0" />
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Degree & Qualification */}
                  <p className="text-xs font-bold text-primary-700 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2 mb-4">
                    🎓 {doc.degree}
                  </p>

                  {/* Specialty Description */}
                  <div className="mb-5">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                      {np ? 'विशेषज्ञता क्षेत्र' : 'Primary Specialty'}
                    </h4>
                    <p className="text-sm font-bold text-gray-800 leading-snug">
                      {np ? doc.specialtyNp : doc.specialty}
                    </p>
                  </div>

                  {/* Skills / Key Procedures */}
                  <div className="space-y-1.5 mb-6">
                    {(np ? doc.skillsNp : doc.skills).slice(0, 3).map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Availability Strip */}
                  <div className="mt-auto pt-4 border-t border-gray-100 mb-5">
                    <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary-600 flex-shrink-0" />
                      {np ? 'उपलब्ध शाखाहरू: बुटवल, लुम्बिनी र मणिग्राम' : 'Available at Butwal, Lumbini & Manigram'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveDoctorModal(doc)}
                      className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <UserCheck className="h-3.5 w-3.5 text-gray-600" />
                      {np ? 'विवरण हेर्नुहोस्' : 'Full Bio'}
                    </button>

                    <button
                      onClick={() => openBookingModal(getServiceFromCategory(doc.category))}
                      className="py-2.5 px-3 bg-accent-500 hover:bg-accent-600 text-white text-xs font-extrabold rounded-xl transition-colors shadow-md shadow-accent-500/20 flex items-center justify-center gap-1"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      {np ? 'अपोइन्टमेन्ट' : 'Book Visit'}
                    </button>
                  </div>
                </div>
              </div>
            </Animate>
          ))}
          </div>
        )}
      </section>

      {/* ── EXPANDED BIO MODAL (PORTALED TO BODY) ── */}
      {activeDoctorModal && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveDoctorModal(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 my-auto">
            {/* Header / Banner */}
            <div className="relative bg-gradient-to-r from-primary-950 to-primary-800 text-white p-6 sm:p-8 flex items-start justify-between">
              <button
                type="button"
                onClick={() => setActiveDoctorModal(null)}
                className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative p-[2.5px] rounded-2xl rounded-tr-3xl rounded-bl-lg bg-gradient-to-tr from-accent-400 via-emerald-400 to-teal-400 shadow-xl flex-shrink-0">
                  <img
                    src={activeDoctorModal.photo}
                    alt={activeDoctorModal.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-[0.9rem] rounded-tr-[1.4rem] rounded-bl-[0.4rem] object-cover ring-2 ring-white/40"
                  />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 bg-accent-500 text-primary-950 font-black text-[10px] uppercase tracking-wider rounded-md">
                    {np ? activeDoctorModal.titleNp : activeDoctorModal.title}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-1.5">
                    {np ? activeDoctorModal.nameNp : activeDoctorModal.name}
                    <CheckCircle2 className="h-5 w-5 text-accent-400" />
                  </h3>
                  <p className="text-xs text-primary-200 mt-0.5">
                    NMC Reg. #{activeDoctorModal.nmcNo} · {activeDoctorModal.experience} Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Qualification */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                  {np ? 'शैक्षिक योग्यता र डिग्री' : 'Degrees & Qualifications'}
                </h4>
                <p className="text-sm font-bold text-primary-800 bg-primary-50/80 p-3 rounded-2xl border border-primary-100">
                  🎓 {activeDoctorModal.degree}
                </p>
              </div>

              {/* Biography */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                  {np ? 'चिकित्सक परिचय' : 'Professional Biography'}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {np ? activeDoctorModal.bioNp : activeDoctorModal.bio}
                </p>
              </div>

              {/* Skills / Key Procedures */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                  {np ? 'उपचार सुविधाहरू र प्रविधि' : 'Key Medical Procedures & Expertise'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(np ? activeDoctorModal.skillsNp : activeDoctorModal.skills).map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-gray-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branch Locations */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                  {np ? 'परामर्श उपलब्ध स्थानहरू' : 'Branch Availability'}
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                  {activeDoctorModal.branches.map((b, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-xl flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary-600" /> {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500 font-medium">
                {np ? 'कुनै पनि शाखाका लागि अपोइन्टमेन्ट उपलब्ध छ।' : 'Consultations available Sunday to Friday at all clinic branches.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveDoctorModal(null);
                  openBookingModal(getServiceFromCategory(activeDoctorModal.category));
                }}
                className="w-full sm:w-auto px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl text-xs transition-colors shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                {np ? 'यो चिकित्सकसँग अपोइन्टमेन्ट लिनुहोस्' : 'Book Consultation Now'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <Animate variant="zoom-up" duration={700}>
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-3xl p-10 sm:p-12 text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              {np ? 'कुन चिकित्सक छान्ने भन्ने अन्योलमा हुनुहुन्छ?' : 'Not Sure Which Doctor to Consult?'}
            </h3>
            <p className="text-primary-200 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
              {np
                ? 'हाम्रो मुख्य हेल्पलाइनमा सम्पर्क गर्नुहोस् वा अनलाइन बुकिङ गर्नुहोस्। हाम्रो टोलीले तपाईंको समस्या अनुसार उपयुक्त विशेषज्ञ सिफारिस गर्नेछ।'
                : 'Call our main reception helpline or book a general consultation. Our triage team will guide you to the right specialist for your dental care.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:071537300"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary-900 font-bold rounded-2xl hover:bg-primary-50 transition-colors text-sm"
              >
                <Phone className="h-4 w-4 text-primary-600" />
                {np ? 'फोन गर्नुहोस्: ०७१-५३७३००' : 'Call Reception: 071-537300'}
              </a>
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl transition-colors text-sm shadow-xl shadow-accent-500/25"
              >
                <Calendar className="h-4 w-4" />
                {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Online Consultation'}
              </button>
            </div>
          </div>
        </Animate>
      </section>
    </div>
  );
}
