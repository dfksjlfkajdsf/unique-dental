import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin, Phone, Clock, Mail, ExternalLink, Calendar,
  ChevronLeft, Users, ShieldCheck, Camera, Sparkles, X,
  ArrowRight, PhoneCall, CheckCircle2
} from 'lucide-react';
import { getBranchById, branches } from '../../data/branchesData';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

export default function BranchDetail() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const [activePhoto, setActivePhoto] = useState(null);
  const np = lang === 'np';

  const branch = getBranchById(id);

  useEffect(() => {
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActivePhoto(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activePhoto]);

  if (!branch) {
    return <Navigate to="/branches" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HERO HEADER ── */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-gray-950 via-primary-950 to-gray-900 text-white overflow-hidden">
        <img
          src={branch.heroImage}
          alt={branch.name}
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Animate variant="fade-down" delay={100} duration={600}>
            <Link
              to="/branches"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-semibold backdrop-blur-md transition-all mb-6"
            >
              <ChevronLeft className="h-4 w-4" />
              {np ? 'सबै शाखाहरूमा फर्किनुहोस्' : 'Back to All Branches'}
            </Link>
          </Animate>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <Animate variant="fade-up" delay={250} duration={800} className="max-w-3xl">
              <span className={`inline-block text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full text-white mb-4 ${branch.tagColor}`}>
                {branch.tag}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                {np ? branch.nameNp : branch.name}
              </h1>
              <p className="text-gray-300 text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                {np ? branch.addressNp : branch.address}
              </p>
            </Animate>

            {/* Quick Actions */}
            <Animate variant="fade-left" delay={350} duration={800} className="flex flex-wrap gap-3">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent-500/25 flex items-center gap-2 text-sm"
              >
                <Calendar className="h-4 w-4" />
                {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment'}
              </button>
              <a
                href={branch.tel}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 text-sm"
              >
                <Phone className="h-4 w-4" />
                {branch.phone}
              </a>
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                {np ? 'नक्सामा हेर्नुहोस्' : 'View Map'}
              </a>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW & QUICK INFO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description & Facilities */}
          <Animate variant="fade-right" duration={700} className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary-600 block mb-2">
                {np ? 'शाखा विवरण' : 'Branch Overview'}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                {np ? 'यस शाखाको बारेमा' : 'About This Location'}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {np ? branch.descriptionNp : branch.description}
              </p>
            </div>

            {/* Key Facilities */}
            <div>
              <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-500" />
                {np ? 'उपलब्ध सुविधाहरू' : 'Key Branch Facilities'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(np ? branch.facilitiesNp : branch.facilities).map((fac) => (
                  <div key={fac} className="flex items-center gap-2.5 bg-primary-50/70 p-3 rounded-xl border border-primary-100 text-xs font-bold text-primary-900">
                    <CheckCircle2 className="h-4 w-4 text-primary-600 flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </Animate>

          {/* Right Column: Contact & Hours Card */}
          <Animate variant="fade-left" duration={700} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-primary-600" />
                {np ? 'सम्पर्क विवरण' : 'Contact & Timing'}
              </h3>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">{np ? 'ठेगाना' : 'Address'}</span>
                    <span>{np ? branch.addressNp : branch.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">{np ? 'फोन नम्बर' : 'Phone Number'}</span>
                    <a href={branch.tel} className="hover:text-primary-700 font-semibold">{branch.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">{np ? 'खोल्ने समय' : 'Opening Hours'}</span>
                    <div>{branch.hours}</div>
                    <div className="text-red-500 font-semibold">{branch.closed}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block">{np ? 'इमेल' : 'Email'}</span>
                    <a href={`mailto:${branch.email}`} className="hover:text-primary-700">{branch.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-primary-50 hover:bg-primary-100 text-primary-800 font-bold rounded-2xl transition-colors text-sm border border-primary-200"
              >
                <MapPin className="h-4 w-4" />
                {np ? 'गूगल नक्सामा दिशा हेर्नुहोस्' : 'Get Directions on Google Maps'}
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── TEAM AT THIS BRANCH ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Animate variant="fade-up" className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-primary-100 text-primary-800 text-xs font-extrabold uppercase tracking-widest rounded-full mb-3">
            <Users className="h-3.5 w-3.5" />
            {np ? 'विशेषज्ञ टोली' : 'Branch Medical Team'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {np ? 'यस शाखाका चिकित्सकहरू' : 'Doctors & Specialists at this Branch'}
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-base">
            {np ? 'यस शाखामा कार्यरत अनुभवी दन्त चिकित्सकहरूसँग परामर्श लिनुहोस्।' : 'Meet the certified specialists dedicated to caring for you at this location.'}
          </p>
        </Animate>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {branch.team.map((doctor, idx) => (
            <Animate key={doctor.name} variant="zoom-up" delay={idx * 120} duration={600}>
              <div
                className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-xl transition-all h-full"
              >
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-primary-50 flex-shrink-0"
                />
                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-[11px] font-bold rounded-full mb-2">
                    {doctor.degree}
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900">{doctor.name}</h3>
                  <p className="text-primary-600 text-sm font-bold mt-0.5">{np ? doctor.roleNp : doctor.role}</p>
                  <p className="text-gray-500 text-xs mt-1">{doctor.specialty}</p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {doctor.exp} {np ? 'अनुभव' : 'Experience'}
                    </span>
                    <button
                      onClick={() => openBookingModal(doctor.specialty)}
                      className="text-xs font-bold text-primary-700 hover:text-primary-900 flex items-center gap-1"
                    >
                      {np ? 'बुकिङ गर्नुहोस्' : 'Book Consultant'} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      {/* ── SERVICES AT THIS BRANCH ── */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate variant="fade-up" className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-accent-100 text-accent-800 text-xs font-extrabold uppercase tracking-widest rounded-full mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              {np ? 'उपलब्ध सेवाहरू' : 'Branch Services'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {np ? 'यस शाखामा उपलब्ध डेन्टल सेवाहरू' : 'Treatments Provided Here'}
            </h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branch.services.map((srv, idx) => (
              <Animate key={srv.title} variant="zoom-up" delay={idx * 80} duration={500}>
                <div
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:bg-primary-50/40 transition-all group flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg mb-2 group-hover:text-primary-700 transition-colors">
                      {np ? srv.titleNp : srv.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{srv.desc}</p>
                  </div>
                  <button
                    onClick={() => openBookingModal(srv.title)}
                    className="mt-5 text-xs font-bold text-primary-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    {np ? 'यो सेवा बुक गर्नुहोस्' : 'Book this treatment'} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTOS / GALLERY AT THIS BRANCH ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Animate variant="fade-up" className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-purple-100 text-purple-800 text-xs font-extrabold uppercase tracking-widest rounded-full mb-3">
            <Camera className="h-3.5 w-3.5" />
            {np ? 'शाखा तस्वीरहरू' : 'Branch Atmosphere'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {np ? 'शाखाको झलक' : 'Take a Look Inside'}
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-base">
            {np ? 'तस्वीरमा थिचेर उच्च गुणस्तरको ठूलो रूप हेर्नुहोस्।' : 'Click on any photo to inspect full high-resolution branch gallery.'}
          </p>
        </Animate>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branch.gallery.map((photo, index) => (
            <Animate key={index} variant="zoom-up" delay={index * 80} duration={500}>
              <div
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer aspect-[4/3] bg-gray-100"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-white text-xs font-bold">{photo.title}</span>
                  <span className="text-primary-300 text-[10px]">{np ? 'थप हेर्नुहोस्' : 'Click to enlarge'}</span>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div className="absolute top-4 right-4 z-30">
            <button
              onClick={() => setActivePhoto(null)}
              className="p-2.5 sm:p-3 bg-white/15 hover:bg-white/30 rounded-full text-white transition-all shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center gap-4 my-auto pt-10 sm:pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center w-full max-h-[65vh] sm:max-h-[75vh]">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[65vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-3.5 text-center max-w-xl w-full shadow-2xl">
              <p className="text-white font-bold text-sm sm:text-base">{activePhoto.title}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── OTHER BRANCHES NAV ── */}
      <section className="bg-gray-100 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate variant="fade-up" className="text-center mb-6">
            <h3 className="text-xl font-extrabold text-gray-900">
              {np ? 'अन्य शाखाहरू हेर्नुहोस्' : 'Explore Other Branches'}
            </h3>
          </Animate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches
              .filter((b) => b.id !== branch.id)
              .map((other, idx) => (
                <Animate key={other.id} variant="zoom-up" delay={idx * 100} duration={500}>
                  <Link
                    to={`/branches/${other.id}`}
                    className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-200 flex items-center justify-between group transition-all h-full"
                  >
                    <div>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full text-white ${other.tagColor}`}>
                        {other.tag}
                      </span>
                      <h4 className="font-extrabold text-gray-900 text-sm mt-2 group-hover:text-primary-700 transition-colors">
                        {np ? other.nameNp : other.name}
                      </h4>
                      <p className="text-xs text-gray-500">{other.city}</p>
                    </div>
                    <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Animate>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-900 text-white text-center px-4">
        <Animate variant="zoom-up" duration={700}>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {np ? `${branch.nameNp} मा आउनुहोस्` : `Visit ${branch.name}`}
          </h2>
          <p className="text-primary-200 text-base mb-8 max-w-xl mx-auto">
            {np ? 'आजै आफ्नो अपोइन्टमेन्ट बुक गर्नुहोस् र उत्कृष्ट डेन्टल सेवाको अनुभव लिनुहोस्।' : 'Schedule your consultation today at our convenient location.'}
          </p>
          <button
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl transition-all shadow-xl text-base"
          >
            <Calendar className="h-5 w-5" />
            {np ? 'अहिले नै अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment Now'}
          </button>
        </Animate>
      </section>
    </div>
  );
}
