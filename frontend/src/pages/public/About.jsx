import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Heart, ShieldCheck, GraduationCap, Users, Award, ChevronRight,
  X, Clock, Globe, CheckCircle2, Sparkles, Calendar, Info
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import { dentists } from '../../data/dentistsData';
import Animate from '../../components/ui/Animate';

const HERO_BG = 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1920&q=80';
const STORY_IMG = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80';

export default function About() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const np = lang === 'np';

  const team = dentists.map((doc) => ({
    id: doc.id,
    name: np ? doc.nameNp : doc.name,
    degree: doc.degree,
    role: np ? doc.titleNp : doc.title,
    specialty: np ? doc.specialtyNp : doc.specialty,
    exp: doc.experience,
    photo: doc.photo,
    pos: 'object-top',
    nmcNo: doc.nmcNo,
    bio: np ? doc.bioNp : doc.bio,
    expertise: np ? doc.skillsNp : doc.skills,
    schedule: np ? 'आइतबार – शुक्रबार (बिहान ९:०० – साँझ ५:००)' : 'Sun – Fri (9:00 AM – 5:00 PM)',
    languages: np ? 'नेपाली, अंग्रेजी' : 'English, Nepali',
    branches: doc.branches,
  }));

  const values = [
    { icon: Heart, title: np ? 'बिरामी-प्रथम हेरचाह' : 'Patient-First Care', desc: np ? 'हर निर्णय तपाईंको आराम, स्वास्थ्य र दीर्घकालीन हितलाई केन्द्रमा राखेर गरिन्छ।' : 'Every decision is made with your comfort, health, and long-term wellbeing at the center.', iconClass: 'bg-rose-50 text-rose-600', borderClass: 'border-rose-100' },
    { icon: ShieldCheck, title: np ? 'क्लिनिकल उत्कृष्टता' : 'Clinical Excellence', desc: np ? 'हामी हरेक प्रक्रियामा उच्चतम स्तरको स्टेरिलाइजेसन र सुरक्षा मानक पालना गर्छौं।' : 'We follow the highest sterilization and safety standards in every procedure.', iconClass: 'bg-primary-50 text-primary-600', borderClass: 'border-primary-100' },
    { icon: GraduationCap, title: np ? 'निरन्तर सिकाइ' : 'Continuous Learning', desc: np ? 'हाम्रा दन्त चिकित्सकहरू अन्तर्राष्ट्रिय तालिममा नियमित भाग लिन्छन्।' : 'Our dentists regularly participate in international training programs.', iconClass: 'bg-blue-50 text-blue-600', borderClass: 'border-blue-100' },
    { icon: Users, title: np ? 'समुदाय केन्द्रित' : 'Community Focused', desc: np ? 'किफायती सेवा र नियमित नि:शुल्क डेन्टल क्याम्पसहित समुदायको सेवामा गर्वित।' : 'Proud to serve the community with affordable care and regular free dental camps.', iconClass: 'bg-purple-50 text-purple-600', borderClass: 'border-purple-100' },
  ];

  const milestones = np ? [
    { year: '२००९', event: 'युनिक डेन्टल र इम्प्लान्ट सेन्टरको स्थापना — विशेषज्ञ डेन्टल सेवा सबैका लागि सुलभ बनाउने लक्ष्यसहित।' },
    { year: '२०१३', event: '४ विशेषज्ञ र समर्पित इम्प्लान्ट सुइटसहित पूर्ण मल्टि-स्पेसियालिटी क्लिनिकमा विस्तार।' },
    { year: '२०१७', event: 'डिजिटल एक्स-रे, ३डी कोन बिम सिटी स्क्यान र लेजर डेन्टिस्ट्री अपनाइयो।' },
    { year: '२०२१', event: 'अनलाइन अपोइन्टमेन्ट बुकिङ सुरु — क्षेत्रभरका बिरामीहरूलाई डिजिटल सेवा।' },
    { year: '२०२४', event: '१०,०००+ खुसी बिरामी पुगे र दोस्रो शाखाको निर्माण सुरु।' },
  ] : [
    { year: '2009', event: 'Unique Dental & Implant Center founded — with a vision to make specialist dental care accessible to everyone.' },
    { year: '2013', event: 'Expanded to a full multi-specialty clinic with 4 specialists and a dedicated implant suite.' },
    { year: '2017', event: 'Adopted digital X-ray, 3D cone beam CT scanning, and laser dentistry.' },
    { year: '2021', event: 'Launched online appointment booking to serve patients across the region digitally.' },
    { year: '2024', event: 'Reached 10,000+ happy patients and began construction of a second branch.' },
  ];

  const stats = np
    ? [{ v: '१०,०००+', l: 'सेवा गरिएका बिरामी' }, { v: '५,०००+', l: 'राखिएका इम्प्लान्ट' }, { v: '९८%', l: 'सन्तुष्टि दर' }, { v: '६', l: 'विशेषज्ञ दन्त चिकित्सक' }]
    : [{ v: '10,000+', l: 'Patients Served' }, { v: '5,000+', l: 'Implants Placed' }, { v: '98%', l: 'Satisfaction Rate' }, { v: '6', l: 'Specialist Dentists' }];

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 flex items-center min-h-[60vh]">
        <img src={HERO_BG} alt="Unique Dental Clinic" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-900/70 to-gray-950/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Animate variant="fade-down" delay={200} duration={800}>
            <span className="inline-block text-primary-400 font-bold text-sm uppercase tracking-widest mb-4">{np ? 'हामी को हौं' : 'Who We Are'}</span>
          </Animate>
          <Animate variant="fade-up" delay={400} duration={950}>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
              {np ? <>युनिक डेन्टल<br />र इम्प्लान्ट सेन्टरको बारेमा</> : <>About Unique Dental<br />&amp; Implant Center</>}
            </h1>
          </Animate>
          <Animate variant="fade-up" delay={600} duration={900}>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              {np ? '१५+ वर्षदेखि करुणा, सटीकता र अत्याधुनिक डेन्टल सेवाबाट मुस्कान परिवर्तन गर्दै।' : 'Transforming smiles for 15+ years with compassion, precision, and cutting-edge dental care.'}
            </p>
          </Animate>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Animate variant="fade-right" duration={800}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-gray-100 bg-slate-100">
                  <img
                    src={STORY_IMG}
                    alt={np ? 'हाम्रो क्लिनिक' : 'Our Clinic'}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-accent-50 flex items-center justify-center">
                    <Award className="h-7 w-7 text-accent-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">{np ? '१५+' : '15+'}</p>
                    <p className="text-xs text-gray-500 font-medium">{np ? 'वर्षको विश्वास' : 'Years of Trust'}</p>
                  </div>
                </div>
              </div>
            </Animate>

            <Animate variant="fade-left" duration={800} delay={100}>
              <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'हाम्रो कथा' : 'Our Story'}</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
                {np ? 'एउटा डेन्टल क्लिनिकभन्दा बढी' : 'More Than a Dental Clinic'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                {np
                  ? <><strong>युनिक डेन्टल र इम्प्लान्ट सेन्टर प्रा.लि.</strong> एउटा सरल तर शक्तिशाली दृष्टिकोणसहित स्थापित भएको थियो — विश्वस्तरीय डेन्टल सेवा सुलभ, आरामदायी र चिन्तामुक्त रूपमा प्रदान गर्ने।</>
                  : <><strong>Unique Dental & Implant Center Pvt. Ltd.</strong>, founded with a clear vision, was built to make world-class dental care accessible, comfortable, and stress-free.</>
                }
              </p>
              <p className="text-gray-500 leading-relaxed mb-7">
                {np
                  ? 'एउटा सानो क्लिनिकबाट सुरु भएको यो यात्रा आज उच्च प्रशिक्षित विशेषज्ञहरूको टोली, अत्याधुनिक प्रविधि र हजारौं परिवर्तित मुस्कानको गौरवसहित पूर्ण-सेवा इम्प्लान्ट र कस्मेटिक डेन्टल सेन्टरमा परिणत भएको छ।'
                  : 'From a small clinic, we have grown into a full-service implant and cosmetic dental center — with a team of highly trained specialists, advanced technology, and thousands of transformed smiles.'
                }
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map(({ v, l }) => (
                  <div key={l} className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
                    <p className="text-2xl font-extrabold text-primary-700">{v}</p>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">{l}</p>
                  </div>
                ))}
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-primary-600/20">
                {np ? 'हाम्रा सेवाहरू' : 'Our Services'} <ChevronRight className="h-5 w-5" />
              </Link>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate variant="fade-up" className="text-center mb-16">
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'हाम्रो प्रेरणा' : 'What Drives Us'}</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">{np ? 'हाम्रा मूल मान्यताहरू' : 'Our Core Values'}</h2>
          </Animate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, iconClass, borderClass }, i) => (
              <Animate key={title} variant="zoom-up" delay={i * 100} duration={600}>
                <div className={`bg-white rounded-2xl p-7 border text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${borderClass}`}>
                  <div className={`inline-flex p-4 rounded-2xl mb-5 ${iconClass}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate variant="fade-up" className="text-center mb-16">
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'विशेषज्ञहरू' : 'The Specialists'}</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">{np ? 'हाम्रो डेन्टल टोलीसँग भेट्नुहोस्' : 'Meet Our Dental Team'}</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
              {np ? 'कुनै पनि चिकित्सक कार्डमा थिचेर उहाँहरूको विस्तृत प्रोफाइल र समय तालिका हेर्नुहोस्।' : 'Click on any doctor card to view their full credentials, background, and consultation schedule.'}
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, i) => (
              <Animate key={member.id} variant="zoom-up" delay={i * 100} duration={500}>
                <div
                  onClick={() => setSelectedDoctor(member)}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-[0_22px_45px_-12px_rgba(4,120,87,0.22)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="p-3 sm:p-4 pb-0 bg-gradient-to-b from-slate-50/90 via-emerald-50/20 to-transparent relative">
                    {/* Background glow */}
                    <div className="absolute top-2 right-2 w-24 h-24 bg-accent-400/15 rounded-full blur-xl group-hover:scale-150 group-hover:bg-accent-400/30 transition-all duration-700 pointer-events-none" />

                    {/* Sculpted Outer Gradient Ring */}
                    <div className="relative p-[2.5px] rounded-[1.8rem] rounded-tr-[3rem] rounded-bl-[1rem] bg-gradient-to-tr from-primary-600/30 via-accent-400/40 to-emerald-500/40 group-hover:from-accent-400 group-hover:via-emerald-400 group-hover:to-teal-500 transition-all duration-500 shadow-md group-hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.35)]">
                      <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-[1.65rem] rounded-tr-[2.85rem] rounded-bl-[0.85rem] bg-gradient-to-b from-slate-900 to-primary-950">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className={`w-full h-full object-cover ${member.pos} filter saturate-[0.98] group-hover:saturate-[1.12] group-hover:scale-110 transition-all duration-700 ease-out`}
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />

                        {/* Light Beam / Shimmer Sweep on Hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20" />

                        {/* Top NMC Badge */}
                        <div className="absolute top-2.5 left-2.5 z-20">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-900/80 backdrop-blur-md text-accent-300 text-[10px] font-extrabold rounded-full border border-white/10 shadow-sm">
                            <ShieldCheck className="h-3 w-3 text-accent-400" />
                            NMC #{member.nmcNo}
                          </span>
                        </div>

                        {/* Action Pill */}
                        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20">
                          <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md text-primary-800 text-xs font-extrabold rounded-xl text-center shadow-lg flex items-center justify-center gap-1.5 border border-white">
                            <Info className="h-3.5 w-3.5 text-primary-600" />
                            {np ? 'विस्तृत प्रोफाइल' : 'View Profile'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-gray-900 text-base group-hover:text-primary-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 text-sm font-semibold mt-0.5">{member.role}</p>
                    <p className="text-gray-500 text-xs mt-1.5 leading-snug line-clamp-2">{member.specialty}</p>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-bold border border-primary-100">
                        {member.exp} {np ? 'अनुभव' : 'Experience'}
                      </span>
                      <span className="text-xs text-primary-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        {np ? 'प्रोफाइल' : 'Details'} <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTOR DETAIL MODAL (PORTALED TO BODY) ── */}
      {selectedDoctor && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar with gradient */}
            <div className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white p-6 sm:p-8 rounded-t-3xl">
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative p-[2.5px] rounded-2xl rounded-tr-3xl rounded-bl-lg bg-gradient-to-tr from-accent-400 via-emerald-400 to-teal-400 shadow-xl flex-shrink-0">
                  <img
                    src={selectedDoctor.photo}
                    alt={selectedDoctor.name}
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[0.9rem] rounded-tr-[1.4rem] rounded-bl-[0.4rem] object-cover ring-2 ring-white/40 ${selectedDoctor.pos}`}
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full mb-2 shadow-sm">
                    {selectedDoctor.degree}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-primary-200 font-semibold text-base mt-1">
                    {selectedDoctor.role}
                  </p>
                  <p className="text-xs text-primary-300 mt-0.5">
                    NMC Reg. #{selectedDoctor.nmcNo} · {selectedDoctor.specialty}
                  </p>
                </div>
              </div>
            </div>

            {/* Body content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Stats bar */}
              <div className="grid grid-cols-3 gap-3 bg-primary-50/70 rounded-2xl p-4 border border-primary-100 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-primary-700 font-extrabold text-sm sm:text-base">
                    <Award className="h-4 w-4" /> {selectedDoctor.exp}
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">{np ? 'अनुभव' : 'Experience'}</p>
                </div>
                <div className="border-x border-primary-200/60">
                  <div className="flex items-center justify-center gap-1 text-primary-700 font-extrabold text-sm sm:text-base">
                    <Globe className="h-4 w-4" /> {selectedDoctor.languages}
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">{np ? 'भाषा' : 'Languages'}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-primary-700 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="h-4 w-4" /> 100%
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">{np ? 'सन्तुष्टि' : 'Satisfaction'}</p>
                </div>
              </div>

              {/* Biography */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary-700 mb-2 flex items-center gap-1.5">
                  <Info className="h-4 w-4" /> {np ? 'डाक्टरको बारेमा' : 'Doctor Overview'}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {selectedDoctor.bio}
                </p>
              </div>

              {/* Specialization / Key Expertise */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary-700 mb-3 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-accent-500" /> {np ? 'मुख्य विशेषज्ञता र सेवाहरू' : 'Key Expertise & Services'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedDoctor.expertise.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-xs font-bold text-gray-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branch Locations */}
              {selectedDoctor.branches && selectedDoctor.branches.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {np ? 'परामर्श उपलब्ध शाखाहरू' : 'Available Clinic Branches'}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                    {selectedDoctor.branches.map((b, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-1">
                        📍 {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule */}
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/60 p-4 rounded-2xl text-xs text-amber-900">
                <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <span className="font-bold block">{np ? 'परामर्श समय' : 'Consultation Hours'}</span>
                  <span className="text-amber-800">{selectedDoctor.schedule}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctor(null);
                    openBookingModal(selectedDoctor.specialty);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent-500/20 text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  {np ? `अपोइन्टमेन्ट बुक गर्नुहोस् (${selectedDoctor.name})` : `Book Appointment with ${selectedDoctor.name}`}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors text-sm"
                >
                  {np ? 'बन्द गर्नुहोस्' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── TIMELINE ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <Animate variant="fade-up" className="text-center mb-16">
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'हाम्रो यात्रा' : 'Our Journey'}</span>
            <h2 className="text-4xl font-extrabold text-gray-900">{np ? 'महत्त्वपूर्ण पडावहरू' : 'Key Milestones'}</h2>
          </Animate>
          <div className="relative space-y-8">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary-300 to-primary-100" />
            {milestones.map(({ year, event }, i) => (
              <Animate key={year} variant="fade-right" delay={i * 120} duration={600}>
                <div className="flex gap-8 relative">
                  <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-primary-600 text-white flex flex-col items-center justify-center z-10 shadow-lg shadow-primary-600/30">
                    <span className="font-extrabold text-xs leading-none">{year}</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
                    <p className="text-xs font-extrabold text-primary-600 uppercase tracking-widest mb-1">{year}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{event}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white text-center px-4 overflow-hidden">
        <Animate variant="zoom-up">
          <h2 className="text-4xl font-extrabold mb-3">{np ? 'हाम्रो कथाको भाग बन्नुहोस्' : 'Become Part of Our Story'}</h2>
          <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
            {np
              ? 'आफ्नो मुस्कानका लागि युनिक डेन्टल र इम्प्लान्ट सेन्टरमा विश्वास गर्ने हजारौं बिरामीहरूमा सामेल हुनुहोस्।'
              : 'Join thousands of patients who trust Unique Dental & Implant Center for their smile.'
            }
          </p>
          <button onClick={() => openBookingModal()} className="inline-flex items-center gap-2 px-9 py-4 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-colors shadow-2xl text-base">
            {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment'} <ChevronRight className="h-5 w-5" />
          </button>
        </Animate>
      </section>
    </div>
  );
}
