import {
  ChevronRight, Clock, CheckCircle,
  Stethoscope, Sparkles, ShieldCheck, Smile, Microscope,
  Droplets, Wand2, Crown, Zap, Gem, Star, Scissors, Leaf, HeartPulse,
  UserPlus, CalendarCheck, MapPin
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

const HERO_BG = 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1920&q=80';

export default function Services() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const np = lang === 'np';

  const services = np ? [
    {
      icon: Stethoscope,
      iconBg: 'bg-blue-600',
      title: 'सामान्य जाँच',
      tagline: 'रोकथाम उपचारभन्दा राम्रो',
      desc: 'डिजिटल एक्स-रे, गिजा स्वास्थ्य मूल्यांकन, ओरल क्यान्सर स्क्रिनिङ र व्यक्तिगत हेरचाह योजनासहित पूर्ण मुख परीक्षण।',
      duration: '४५ मिनेट',
      features: ['डिजिटल एक्स-रे समावेश', 'ओरल क्यान्सर स्क्रिनिङ', 'व्यक्तिगत हेरचाह योजना', 'गिजा रोग जाँच'],
      img: '/services/general-checkup.webp',
    },
    {
      icon: Sparkles,
      iconBg: 'bg-amber-500',
      title: 'दाँत सेतो पार्ने',
      tagline: 'आत्मविश्वासले चम्किनुहोस्',
      desc: 'व्यावसायिक LED-सक्रिय व्हाइटनिङले एकै सेसनमा ८ शेडसम्म उज्यालो बनाउँछ। सुरक्षित, प्रभावकारी र दीर्घकालीन नतिजा।',
      duration: '६० मिनेट',
      features: ['८ शेडसम्म उज्यालो', 'LED एक्टिभेसन प्रविधि', 'होम किट समावेश', 'सेन्सिटिभिटी-मुक्त फर्मुला'],
      img: '/services/teeth-whitening.webp',
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-indigo-600',
      title: 'डेन्टल इम्प्लान्ट',
      tagline: 'स्थायी। प्राकृतिक। सुन्दर।',
      desc: 'हराएका दाँत स्थायी रूपमा बदल्न जबडामा टाइटेनियम इम्प्लान्ट राखिन्छ। प्राकृतिक दाँतजस्तै देखिने, महसुस हुने र काम गर्ने — जीवनभरका लागि।',
      duration: 'बहु-भ्रमण',
      features: ['टाइटेनियम रुट इम्प्लान्ट', 'हड्डी संरक्षण डिजाइन', 'प्राकृतिक देखावट', 'जीवनकालीन टिकाउपन'],
      img: '/services/dental-implants.webp',
    },
    {
      icon: Smile,
      iconBg: 'bg-violet-600',
      title: 'दाँत मिलाउने उपचार',
      tagline: 'आफ्नो मुस्कान सिधा पार्नुहोस्',
      desc: 'गलत क्रम, अधिक भीडभाड र दाँत काटने समस्या सुधार्न ट्र्याडिसनल ब्रेसेस, सेरामिक ब्रेसेस र क्लियर अलाइनर। सबै उमेरका लागि।',
      duration: '१२–२४ महिना',
      features: ['धातु र सेरामिक ब्रेसेस', 'क्लियर अलाइनर विकल्प', 'मासिक प्रगति समीक्षा', 'रिटेनर समावेश'],
      img: '/services/orthodontics.webp',
    },
    {
      icon: Microscope,
      iconBg: 'bg-emerald-600',
      title: 'रुट क्यानाल',
      tagline: 'आफ्नो प्राकृतिक दाँत बचाउनुहोस्',
      desc: 'स्थानीय एनेस्थेसिया र रोटरी एन्डोडोन्टिक उपकरणसहित आधुनिक, पीडारहित रुट क्यानाल थेरापी। संक्रमण हटाएर प्राकृतिक दाँत बचाइन्छ।',
      duration: '६०–९० मिनेट',
      features: ['स्थानीय एनेस्थेसिया', 'रोटरी एन्डोडोन्टिक्स', 'सोही दिन दुखाइ राहत', 'क्राउन राख्ने सुविधा'],
      img: '/services/root-canal.webp',
    },
    {
      icon: Droplets,
      iconBg: 'bg-teal-600',
      title: 'दाँत सफा गर्ने',
      tagline: 'इष्टतम स्वास्थ्यका लागि गहिरो सफाइ',
      desc: 'जिद्दी प्लाक, टार्टर र दागहरू हटाउन व्यावसायिक स्केलिङ र पोलिसिङ — गिजा रोग, क्याभिटी र सास दुर्गन्ध रोक्छ।',
      duration: '३०–४५ मिनेट',
      features: ['प्लाक र टार्टर हटाउने', 'गिजा लाइन गहिरो सफाइ', 'पोलिस र फ्लोराइड', 'ओरल स्वच्छता प्रशिक्षण'],
      img: '/services/teeth-cleaning.webp',
    },
    {
      icon: Wand2,
      iconBg: 'bg-orange-500',
      title: 'डेन्टल फिलिङ',
      tagline: 'पुनर्स्थापित गर्नुहोस् र सुरक्षित गर्नुहोस्',
      desc: 'दाँतको रङसँग मिल्ने कम्पोजिट रेजिन फिलिङ। एकै भ्रमणमा — खराब क्षेत्र हटाइन्छ, गुफा पुनर्स्थापित हुन्छ, दाँत सुरक्षित हुन्छ।',
      duration: '३०–६० मिनेट',
      features: ['दाँत-रङको कम्पोजिट', 'पारा-मुक्त सामग्री', 'एकै भ्रमण', 'प्राकृतिक देखिने नतिजा'],
      img: '/services/dental-fillings.webp',
    },
    {
      icon: Crown,
      iconBg: 'bg-amber-600',
      title: 'क्राउन र ब्रिज',
      tagline: 'संरचना र कार्य पुनर्स्थापित गर्नुहोस्',
      desc: 'क्षतिग्रस्त वा हराएका दाँत पुनर्स्थापित गर्न कस्टम-निर्मित पोर्सिलेन वा जिर्कोनिया क्राउन र ब्रिज — परिपूर्ण रङ मिलान र प्राकृतिक काटनेसहित।',
      duration: '२ भ्रमण',
      features: ['पोर्सिलेन वा जिर्कोनिया', 'कस्टम शेड म्याचिङ', 'प्राकृतिक काटने पुनर्स्थापित', 'दीर्घकालीन समाधान'],
      img: '/services/crown-and-bridge.webp',
    },
    {
      icon: Zap,
      iconBg: 'bg-rose-600',
      title: 'आपतकालीन सेवा',
      tagline: 'सोही दिन जरुरी अपोइन्टमेन्ट',
      desc: 'तीव्र दाँत दुखाइ, भाँचिएको दाँत, उखेलिएको दाँत वा हराएको फिलिङ — हामी सोही दिन, हप्ताको ६ दिन आपतकालीन केसहरूलाई प्राथमिकता दिन्छौं।',
      duration: 'आवश्यकताअनुसार',
      features: ['सोही दिन अपोइन्टमेन्ट', 'दुखाइ राहत प्राथमिकता', 'ट्रमा व्यवस्थापन', '६ दिन उपलब्धता'],
      img: '/services/emergency-care.webp',
    },
    {
      icon: Gem,
      iconBg: 'bg-fuchsia-600',
      title: 'टुथ जेम्स',
      tagline: 'एउटा सानो चमकले धेरै फरक पर्छ',
      desc: 'दाँतको सतहमा टाँसिने सुरक्षित, गैर-आक्रामक क्रिस्टल जेम्स। जहिले पनि हटाउन मिल्छ — कुनै ड्रिलिङ छैन, कुनै क्षति छैन।',
      duration: '२०–३० मिनेट',
      features: ['ड्रिलिङ आवश्यक छैन', 'पूर्ण हटाउन मिल्ने', 'सुरक्षित क्रिस्टल सामग्री', 'तुरुन्त हुन्छ'],
      img: '/services/tooth-gems.webp',
    },
    {
      icon: Star,
      iconBg: 'bg-sky-600',
      title: 'भेनियर',
      tagline: 'निखार, प्राकृतिक देखिने मुस्कान',
      desc: 'चिप्स, ग्याप, दाग वा असमान आकार सुधार्न दाँतको अगाडिपट्टि टाँसिने पातलो कस्टम पोर्सिलेन शेल — मुस्कान तुरुन्त रूपान्तरित हुन्छ।',
      duration: '२ भ्रमण',
      features: ['अति पातलो पोर्सिलेन', 'कस्टम शेड म्याचिङ', 'चिप्स र ग्याप ढाक्छ', 'दीर्घकालीन नतिजा'],
      img: '/services/veneers.webp',
    },
    {
      icon: Scissors,
      iconBg: 'bg-slate-700',
      title: 'अक्कल दाँत निकाल्ने',
      tagline: 'दुखाइ र दबाबबाट राहत',
      desc: 'दुखाइलो, प्रभावित वा भीडभाड गराउने अक्कल दाँत सुरक्षित र सरलतापूर्वक निकाल्ने — उचित पछिको हेरचाह निर्देशनासहित।',
      duration: '४५–६० मिनेट',
      features: ['स्थानीय एनेस्थेसिया', 'प्रभावित दाँत निकाल्ने', 'पछिको हेरचाह निर्देशन', 'छिटो निको हुने सुझाव'],
      img: '/services/wisdom-tooth.webp',
    },
    {
      icon: Leaf,
      iconBg: 'bg-emerald-600',
      title: 'गिजाको उपचार',
      tagline: 'स्वस्थ गिजा, स्वस्थ मुस्कान',
      desc: 'ब्लिडिङ गम, गम रोग र रिसेसनको उपचार। गिजाको रेखामुनि गहिरो सफाइ गरिन्छ र राम्रो बानी बसाल्न मद्दत गरिन्छ।',
      duration: '४५–६० मिनेट',
      features: ['गहिरो स्केलिङ र सफाइ', 'गम रोग उपचार', 'रिसेसन व्यवस्थापन', 'घरेलु हेरचाह कोचिङ'],
      img: '/services/gum-treatment.webp',
    },
    {
      icon: HeartPulse,
      iconBg: 'bg-rose-500',
      title: 'स्माइल मेकओभर',
      tagline: 'तपाईंको सपनाको मुस्कान, व्यक्तिगत',
      desc: 'व्हाइटनिङ, भेनियर, अलाइनर वा इम्प्लान्टको संयोजन — तपाईंको मनपर्ने मुस्कान दिनका लागि जे चाहिन्छ त्यो गरिन्छ।',
      duration: 'कस्टम योजना',
      features: ['पूर्ण मुस्कान मूल्यांकन', 'संयुक्त उपचारहरू', 'डिजिटल स्माइल पूर्वावलोकन', 'चरणबद्ध वा एकैपटक'],
      img: '/services/smile-makeover.webp',
    },
  ] : [
    {
      icon: Stethoscope,
      iconBg: 'bg-blue-600',
      title: 'General Checkup',
      tagline: 'Prevention is better than cure',
      desc: 'A thorough oral examination with digital X-rays, gum health assessment, oral cancer screening, and a personalised care plan tailored to your needs.',
      duration: '45 minutes',
      features: ['Digital X-rays included', 'Oral cancer screening', 'Personalised care plan', 'Gum disease check'],
      img: '/services/general-checkup.webp',
    },
    {
      icon: Sparkles,
      iconBg: 'bg-amber-500',
      title: 'Teeth Whitening',
      tagline: 'Shine with confidence',
      desc: 'Professional LED-activated whitening that achieves up to 8 shades brighter in a single session. Safe, effective, and long-lasting results guaranteed.',
      duration: '60 minutes',
      features: ['Up to 8 shades brighter', 'LED activation technology', 'Take-home kit included', 'Sensitivity-free formula'],
      img: '/services/teeth-whitening.webp',
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-indigo-600',
      title: 'Dental Implants',
      tagline: 'Permanent. Natural. Beautiful.',
      desc: 'Titanium implants surgically placed into the jawbone to permanently replace missing teeth. Looks, feels and functions exactly like your natural teeth — for life.',
      duration: 'Multi-visit',
      features: ['Titanium root implant', 'Bone-preserving design', 'Natural appearance', 'Lifetime durability'],
      img: '/services/dental-implants.webp',
    },
    {
      icon: Smile,
      iconBg: 'bg-violet-600',
      title: 'Orthodontics',
      tagline: 'Straighten your smile',
      desc: 'Traditional braces, ceramic braces, and clear aligner options to correct misalignment, overcrowding, and bite issues. Treatment for all ages.',
      duration: '12–24 months',
      features: ['Metal & ceramic braces', 'Clear aligner option', 'Monthly progress reviews', 'Retainer included'],
      img: '/services/orthodontics.webp',
    },
    {
      icon: Microscope,
      iconBg: 'bg-emerald-600',
      title: 'Root Canal',
      tagline: 'Save your natural tooth',
      desc: 'Modern, painless root canal therapy under local anaesthesia using rotary endodontic instruments. Eliminate infection and preserve your natural tooth.',
      duration: '60–90 minutes',
      features: ['Local anaesthesia', 'Rotary endodontics', 'Same-day pain relief', 'Crown placement available'],
      img: '/services/root-canal.webp',
    },
    {
      icon: Droplets,
      iconBg: 'bg-teal-600',
      title: 'Teeth Cleaning',
      tagline: 'Deep clean for optimal health',
      desc: 'Professional scaling and polishing to remove stubborn plaque, tartar, and stains — preventing gum disease, cavities, and bad breath.',
      duration: '30–45 minutes',
      features: ['Plaque & tartar removal', 'Gum line deep clean', 'Polish & fluoride', 'Oral hygiene coaching'],
      img: '/services/teeth-cleaning.webp',
    },
    {
      icon: Wand2,
      iconBg: 'bg-orange-500',
      title: 'Dental Filling',
      tagline: 'Restore & protect',
      desc: 'Tooth-coloured composite resin fillings that blend with your natural teeth. Single-visit procedure — decay removed, cavity restored, tooth protected.',
      duration: '30–60 minutes',
      features: ['Tooth-coloured composite', 'Mercury-free material', 'Single visit', 'Natural-looking result'],
      img: '/services/dental-fillings.webp',
    },
    {
      icon: Crown,
      iconBg: 'bg-amber-600',
      title: 'Crown & Bridge',
      tagline: 'Restore structure and function',
      desc: 'Custom-crafted porcelain or zirconia crowns and bridges that restore damaged or missing teeth with a perfect colour match and natural bite.',
      duration: '2 visits',
      features: ['Porcelain or zirconia', 'Custom shade matching', 'Natural bite restored', 'Long-lasting solution'],
      img: '/services/crown-and-bridge.webp',
    },
    {
      icon: Zap,
      iconBg: 'bg-rose-600',
      title: 'Emergency Care',
      tagline: 'Same-day urgent appointments',
      desc: 'Severe toothache, broken tooth, knocked-out tooth, or lost filling — we prioritise emergency cases with same-day appointments, 6 days a week.',
      duration: 'As needed',
      features: ['Same-day appointments', 'Pain relief priority', 'Trauma management', '6 days availability'],
      img: '/services/emergency-care.webp',
    },
    {
      icon: Gem,
      iconBg: 'bg-fuchsia-600',
      title: 'Tooth Gems',
      tagline: 'A little sparkle goes a long way',
      desc: 'Safe, non-invasive crystal gems bonded to the surface of your teeth. Completely removable whenever you want — no drilling, no damage.',
      duration: '20–30 minutes',
      features: ['No drilling required', 'Fully removable', 'Safe crystal material', 'Instantly done'],
      img: '/services/tooth-gems.webp',
    },
    {
      icon: Star,
      iconBg: 'bg-sky-600',
      title: 'Veneers',
      tagline: 'Flawless, natural-looking smile',
      desc: 'Thin custom porcelain shells bonded to the front of your teeth to fix chips, gaps, stains, or uneven shape — instantly transforming your smile.',
      duration: '2 visits',
      features: ['Ultra-thin porcelain', 'Custom shade matching', 'Covers chips & gaps', 'Long-lasting results'],
      img: '/services/veneers.webp',
    },
    {
      icon: Scissors,
      iconBg: 'bg-slate-700',
      title: 'Wisdom Tooth Removal',
      tagline: 'Relief from pain and pressure',
      desc: 'Safe and straightforward removal of painful, impacted, or overcrowding wisdom teeth — with proper aftercare guidance so you heal quickly.',
      duration: '45–60 minutes',
      features: ['Local anaesthesia', 'Impacted tooth removal', 'Aftercare guidance', 'Quick recovery tips'],
      img: '/services/wisdom-tooth.webp',
    },
    {
      icon: Leaf,
      iconBg: 'bg-emerald-600',
      title: 'Gum Treatment',
      tagline: 'Healthy gums, healthy smile',
      desc: 'Treatment for bleeding gums, gum disease, and recession. We clean deep below the gumline and help you build better habits to keep your gums strong.',
      duration: '45–60 minutes',
      features: ['Deep scaling & cleaning', 'Gum disease treatment', 'Recession management', 'Home care coaching'],
      img: '/services/gum-treatment.webp',
    },
    {
      icon: HeartPulse,
      iconBg: 'bg-rose-500',
      title: 'Smile Makeover',
      tagline: 'Your dream smile, personalised',
      desc: "A tailored plan combining whitening, veneers, aligners, or implants — whatever it takes to give you the smile you've always wanted.",
      duration: 'Custom plan',
      features: ['Full smile assessment', 'Combined treatments', 'Digital smile preview', 'Staged or all-at-once'],
      img: '/services/smile-makeover.webp',
    },
  ];

  const howItWorks = np
    ? [
        { step: '१', icon: UserPlus, title: 'खाता बनाउनुहोस्', desc: 'नाम, इमेल र फोन नम्बरसहित २ मिनेटभन्दा कममा दर्ता गर्नुहोस्।' },
        { step: '२', icon: CalendarCheck, title: 'स्लट छान्नुहोस्', desc: 'आफ्नो मनपर्ने मिति, समय स्लट र उपचार प्रकार छान्नुहोस्।' },
        { step: '३', icon: MapPin, title: 'हामीलाई भेट्नुहोस्', desc: 'क्लिनिकमा आउनुहोस् — हाम्रो टोली तपाईंको हेरचाहका लागि तयार हुनेछ।' },
      ]
    : [
        { step: '1', icon: UserPlus, title: 'Create Account', desc: 'Register in under 2 minutes with your name, email, and phone number.' },
        { step: '2', icon: CalendarCheck, title: 'Choose a Slot', desc: 'Pick your preferred date, time slot, and treatment type.' },
        { step: '3', icon: MapPin, title: 'Visit Us', desc: 'Arrive at the clinic — our team will be ready and waiting to care for you.' },
      ];

  return (
    <div className="bg-gray-50/50">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 min-h-[55vh] flex items-center">
        <img src={HERO_BG} alt="Dental services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/85 via-primary-900/80 to-primary-950/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Animate variant="fade-down" delay={200} duration={800}>
            <span className="inline-block text-primary-300 font-bold text-sm uppercase tracking-widest mb-4">{np ? 'हामी के गर्छौं' : 'What We Offer'}</span>
          </Animate>
          <Animate variant="fade-up" delay={400} duration={950}>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
              {np ? 'हाम्रा डेन्टल सेवाहरू' : 'Our Dental Services'}
            </h1>
          </Animate>
          <Animate variant="fade-up" delay={600} duration={900}>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              {np
                ? 'सामान्य जाँचदेखि पूर्ण-मुख पुनर्स्थापनासम्म — सबै एकै छतमुनि।'
                : 'Comprehensive dental and implant care — from routine checkups to full-mouth restorations, all under one roof.'
              }
            </p>
          </Animate>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: ServiceIcon, iconBg, title, tagline, desc, duration, features, img }, i) => (
              <Animate key={title} variant="zoom-up" delay={(i % 3) * 100} duration={600}>
                <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary-200/90 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">

                  {/* Photo area - bigger, fuller, professional framing */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-black/10" />

                    {/* Floating Duration pill */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-gray-800 shadow-md border border-white/60">
                      <Clock className="h-3.5 w-3.5 text-primary-600 flex-shrink-0" />
                      <span>{duration}</span>
                    </div>

                    {/* Floating Lucide Icon Badge bridging photo & body */}
                    <div className="absolute -bottom-5 right-6 z-10">
                      <div className={`h-12 w-12 rounded-2xl ${iconBg} text-white flex items-center justify-center shadow-xl shadow-black/15 ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <ServiceIcon className="h-6 w-6 stroke-[2.2]" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 pt-7 flex flex-col flex-1">
                    <div className="mb-3">
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-primary-700 transition-colors leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mt-1">
                        {tagline}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                      {desc}
                    </p>

                    {/* Features list */}
                    <div className="mb-6 space-y-2">
                      <div className="grid grid-cols-1 gap-2">
                        {features.map((f) => (
                          <div
                            key={f}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 bg-gray-50/80 px-3 py-2 rounded-xl border border-gray-100 group-hover:border-gray-200/80 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span className="font-medium text-gray-800 leading-tight">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prominent booking button */}
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <button
                        onClick={() => openBookingModal(title)}
                        className="w-full py-3.5 px-5 rounded-2xl bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30 group-hover:bg-primary-700"
                      >
                        <span>{np ? 'अपोइन्टमेन्ट लिनुहोस्' : 'Book Appointment'}</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest mb-3">{np ? 'मिनेटमा बुक गर्नुहोस्' : 'Book in Minutes'}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-16">{np ? 'कसरी काम गर्छ?' : 'How It Works'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {howItWorks.map(({ step, icon: StepIcon, title, desc }, i) => (
              <Animate key={step} variant="zoom-up" delay={i * 150} duration={650}>
                <div className="flex flex-col items-center">
                  <div className="relative mb-5">
                    <div className="h-20 w-20 rounded-2xl bg-primary-50 border-2 border-primary-100 flex items-center justify-center text-primary-600">
                      <StepIcon className="h-8 w-8 stroke-[2]" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-7 w-7 bg-primary-600 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-lg">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white text-center px-4">
        <h2 className="text-4xl font-extrabold mb-3">{np ? 'सेवा बुक गर्न तयार हुनुहुन्छ?' : 'Ready to Book a Service?'}</h2>
        <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
          {np ? 'मिनेटमा जुनसुकै सेवा अनलाइन बुक गर्नुहोस्।' : 'Book any of our services online in minutes.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => openBookingModal()} className="px-9 py-4 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-colors shadow-2xl">
            {np ? 'अहिले अपोइन्टमेन्ट बुक गर्नुहोस्' : 'Book Appointment Now'}
          </button>
        </div>
      </section>
    </div>
  );
}