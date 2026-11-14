import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ExternalLink, ArrowRight, Users, ShieldCheck, Camera } from 'lucide-react';
import { branches } from '../../data/branchesData';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

export default function Branches() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const np = lang === 'np';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 pt-40 pb-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/5 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Animate variant="fade-down" delay={150} duration={700}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-white/90 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              <MapPin className="h-3.5 w-3.5" /> {np ? 'हाम्रा शाखाहरू' : 'Our Locations'}
            </span>
          </Animate>
          <Animate variant="fade-up" delay={300} duration={850}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {np ? 'तपाईंको नजिकको शाखा छान्नुहोस्' : 'Find a Branch Near You'}
            </h1>
          </Animate>
          <Animate variant="fade-up" delay={450} duration={800}>
            <p className="text-primary-200 text-lg max-w-xl mx-auto">
              {np
                ? 'युनिक डेन्टल र इम्प्लान्ट सेन्टरका प्रत्येक शाखाको विस्तृत जानकारी, चिकित्सक टोली, सेवाहरू र तस्वीरहरू हेर्न शाखा छान्नुहोस्।'
                : 'Unique Dental & Implant Centre is growing. Click on any branch to explore its team, services, photos, and consultation hours.'
              }
            </p>
          </Animate>
        </div>
      </section>

      {/* Branch Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, i) => (
            <Animate key={branch.id} variant="zoom-up" delay={i * 150} duration={600}>
              <div
                className={`relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 h-full ${
                  branch.highlight ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {/* Top accent image preview */}
              <div className="h-44 w-full relative overflow-hidden bg-gray-100">
                <img
                  src={branch.heroImage}
                  alt={branch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-white ${branch.tagColor} shadow-md`}>
                  {branch.tag}
                </span>
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary-400" /> {branch.city}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Name */}
                <h2 className="text-xl font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-primary-700 transition-colors">
                  {np ? branch.nameNp : branch.name}
                </h2>

                {/* Details */}
                <div className="space-y-2.5 text-xs text-gray-600 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span>{np ? branch.addressNp : branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-primary-500 flex-shrink-0" />
                    <a href={branch.tel} className="font-semibold text-gray-800 hover:text-primary-700">
                      {branch.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div>{branch.hours}</div>
                    </div>
                  </div>
                </div>

                {/* Summary Chips */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 mb-6 text-center text-[11px] font-bold text-gray-700">
                  <div className="bg-primary-50 p-2 rounded-xl border border-primary-100">
                    <Users className="h-3.5 w-3.5 text-primary-600 mx-auto mb-0.5" />
                    <span>{branch.team.length} {np ? 'डाक्टर' : 'Doctors'}</span>
                  </div>
                  <div className="bg-accent-50 p-2 rounded-xl border border-accent-100">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent-600 mx-auto mb-0.5" />
                    <span>{branch.services.length} {np ? 'सेवाहरू' : 'Services'}</span>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-xl border border-purple-100">
                    <Camera className="h-3.5 w-3.5 text-purple-600 mx-auto mb-0.5" />
                    <span>{branch.gallery.length} {np ? 'तस्वीर' : 'Photos'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  <Link
                    to={`/branches/${branch.id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-primary-500/20"
                  >
                    {np ? 'शाखा विवरण र टोली हेर्नुहोस्' : 'View Branch Details & Team'}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {np ? 'गूगल नक्सा' : 'Map Directions'}
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </Animate>
        ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Animate variant="zoom-up" duration={700}>
          <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl p-10 text-center text-white shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              {np ? 'कुन शाखा छान्ने अन्योलमा हुनुहुन्छ?' : "Can't find a branch near you?"}
            </h3>
            <p className="text-primary-200 mb-6 text-sm max-w-xl mx-auto">
              {np
                ? 'हाम्रो मुख्य हेल्पलाइनमा फोन गर्नुहोस् र हामी तपाईंलाई उपयुक्त शाखामा मार्गदर्शन गर्नेछौं।'
                : 'Contact our main helpline and our team will guide you to the right location.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:071537300"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary-800 font-bold rounded-2xl hover:bg-primary-50 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" /> Call 071-537300
              </a>
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl transition-colors text-sm"
              >
                {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </Animate>
      </section>
    </div>
  );
}
