import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ChevronLeft, ChevronRight, Heart, ShieldCheck, Star, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import Spinner from '../../components/ui/Spinner';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingModal } from '../../context/BookingContext';
import Animate from '../../components/ui/Animate';

const HERO_BG = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80';

const photos = [
  { id: 301, cat: 'Our Branches', span: 'col-span-2', pos: 'object-center', caption: 'Main Branch — Puspalal Park, Butwal-6 (Head Office)', captionNp: 'मुख्य शाखा — पुष्पलाल पार्क, बुटवल-६ (प्रधान कार्यालय)', alt: 'Unique Dental Main Branch Butwal Puspalal Park', src: '/branches/butwal-puspalal-park.jpg', thumb: '/branches/butwal-puspalal-park.jpg' },
  { id: 302, cat: 'Our Branches', span: '',            pos: 'object-center', caption: 'Kapilvastu Branch — Banganga-4, Charnumber, Kapilvastu (Opposite Kapilvastu Hospital)', captionNp: 'कपिलवस्तु शाखा — बाणगंगा-४, चारनम्बर, कपिलवस्तु (कपिलवस्तु अस्पताल अगाडि)', alt: 'Unique Dental Kapilvastu Branch Banganga', src: '/branches/badhganga-kapilbastu.jpg', thumb: '/branches/badhganga-kapilbastu.jpg' },
  { id: 303, cat: 'Our Branches', span: '',            pos: 'object-center', caption: 'Manigram Branch — Manigram, Rupandehi (Tilottama)', captionNp: 'मनिग्राम शाखा — मनिग्राम, रुपन्देही (तिलोत्तमा)', alt: 'Unique Dental Manigram Branch Rupandehi', src: '/branches/manigram.jpg', thumb: '/branches/manigram.jpg' },
  { id: 1,  cat: 'Our Clinic',      span: 'col-span-2', pos: 'object-center', caption: 'A warm, welcoming reception — the first thing you see when you walk in',               captionNp: 'न्यानो स्वागत कक्ष — क्लिनिकमा प्रवेश गर्दा सबैभन्दा पहिले देख्ने ठाउँ', alt: 'Clinic reception area', src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=75' },
  { id: 2,  cat: 'Our Clinic',      span: '',            pos: 'object-center', caption: 'Comfortable dental chairs — because your relaxation matters to us',                     captionNp: 'आरामदायी डेन्टल कुर्सी — तपाईंको आराम हाम्रो प्राथमिकता हो', alt: 'Modern dental chair', src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=75' },
  { id: 3,  cat: 'Our Clinic',      span: '',            pos: 'object-center', caption: 'The latest digital imaging — so we can see clearly and treat accurately',              captionNp: 'नवीनतम डिजिटल इमेजिङ — सटीक निदान र उपचारका लागि', alt: 'Digital imaging equipment', src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=75' },
  { id: 4,  cat: 'Our Clinic',      span: '',            pos: 'object-center', caption: 'Bright, clean treatment rooms — designed to feel calm, not clinical',                  captionNp: 'उज्यालो, सफा उपचार कोठा — शान्त र आरामदायी वातावरण', alt: 'Treatment room interior', src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=75' },
  { id: 5,  cat: 'Our Clinic',      span: '',            pos: 'object-center', caption: 'Every instrument fully sterilised — your safety comes first, always',                 captionNp: 'सबै उपकरण पूर्ण रूपमा स्टेरिलाइज — तपाईंको सुरक्षा सर्वोपरि', alt: 'Sterilisation room', src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=75' },
  { id: 6,  cat: 'Our Clinic',      span: 'col-span-2', pos: 'object-center', caption: 'Our full implant suite — everything from consultation to crown fitting, right here',   captionNp: 'हाम्रो इम्प्लान्ट सुइट — परामर्शदेखि क्राउन फिटिङसम्म सबै एकै ठाउँमा', alt: 'Implant suite', src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=700&q=75' },
  { id: 7,  cat: 'Our Team',        span: '',            pos: 'object-top',    caption: 'Dr. Raju Shrestha — Consultant Orthodontist (BDS, MDS), Braces & Clear Aligners Specialist',                                       captionNp: 'डा. राजु श्रेष्ठ — कन्सल्टेन्ट अर्थोडन्टिस्ट (BDS, MDS), ब्रेसेस तथा अलाइनर विशेषज्ञ',                                alt: 'Dr. Raju Shrestha - Consultant Orthodontist', src: '/doctors/dr-raju-shrestha.webp', thumb: '/doctors/dr-raju-shrestha.webp' },
  { id: 8,  cat: 'Our Team',        span: '',            pos: 'object-top',    caption: 'Dr. Aakash Karmacharya — Consultant Endodontist (BDS, MDS), Painless Root Canal Therapy Specialist',                                captionNp: 'डा. आकाश कर्माचार्य — कन्सल्टेन्ट एन्डोडन्टिस्ट (BDS, MDS), दुखाइरहित रुट क्यानाल विशेषज्ञ',                           alt: 'Dr. Aakash Karmacharya - Consultant Endodontist', src: '/doctors/dr-aakash-karmacharya.webp', thumb: '/doctors/dr-aakash-karmacharya.webp' },
  { id: 9,  cat: 'Our Team',        span: '',            pos: 'object-top',    caption: 'Dr. Sita Bhushal — Consultant Periodontist & Oral Implantologist (BDS, MDS), Dental Implants & Laser Specialist',                    captionNp: 'डा. सीता भुषाल — कन्सल्टेन्ट इम्प्लान्टोलोजिस्ट र गम सर्जन (BDS, MDS), डेन्टल इम्प्लान्ट तथा लेजर विशेषज्ञ',             alt: 'Dr. Sita Bhushal - Consultant Periodontist & Oral Implantologist', src: '/doctors/dr-sita-bhushal.webp', thumb: '/doctors/dr-sita-bhushal.webp' },
  { id: 10, cat: 'Our Team',        span: '',            pos: 'object-top',    caption: 'Dr. Nagendra Shrish — Consultant Oral & Maxillofacial Surgeon (BDS, MDS), Impacted Wisdom Tooth & Facial Surgery',                   captionNp: 'डा. नगन्द्र श्रीश — कन्सल्टेन्ट ओरल तथा म्याक्सिलोफेसियल सर्जन (BDS, MDS), बुद्धि बङ्गारा तथा जबडा शल्यक्रिया विशेषज्ञ',  alt: 'Dr. Nagendra Shrish - Consultant Oral & Maxillofacial Surgeon', src: '/doctors/dr-nagendra-shrish.webp', thumb: '/doctors/dr-nagendra-shrish.webp' },
  { id: 11, cat: 'Our Team',        span: '',            pos: 'object-top',    caption: 'Dr. Anjila Neupane — Dental Surgeon (BDS), General & Preventive Dentistry',                                                          captionNp: 'डा. अञ्जिला न्यौपाने — दन्त चिकित्सक (BDS), सामान्य तथा रोकथाम दन्त स्याहार',                                          alt: 'Dr. Anjila Neupane - Dental Surgeon', src: '/doctors/dr-anjila-neupane.webp', thumb: '/doctors/dr-anjila-neupane.webp' },
  { id: 12, cat: 'Our Team',        span: '',            pos: 'object-top',    caption: 'RDH Bishnu Budhathoki — Registered Dental Hygienist, Scaling & Oral Prophylaxis',                                                    captionNp: 'आर.डी.एच. विष्णु बुढाथोकी — रजिस्टर्ड डेन्टल हाइजिनिस्ट, स्केलिङ तथा मुख स्वास्थ्य',                                    alt: 'RDH Bishnu Budhathoki - Registered Dental Hygienist', src: '/doctors/rdh-bishnu-budhathoki.webp', thumb: '/doctors/rdh-bishnu-budhathoki.webp' },
  { id: 101, cat: 'Dental Camps', span: 'col-span-2', pos: 'object-center', caption: 'Unique Dental Medical Team — Free Oral & Dental Health Camp (निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर) at Puspalal Park, Butwal-6', captionNp: 'युनिक डेन्टल मेडिकल टोली — पुष्पलाल पार्क, बुटवल-६ मा आयोजित निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर', alt: 'Free Dental Camp at Puspalal Park, Butwal', src: '/camps/free-dental-camp-puspalal-park.jpg', thumb: '/camps/free-dental-camp-puspalal-park.jpg' },
  { id: 102, cat: 'Dental Camps', span: 'col-span-2', pos: 'object-center', caption: 'Community Outreach — Free School Dental Screening & Hygiene Camp with students & teachers at Motherland Secondary School', captionNp: 'सामुदायिक विद्यालय दन्त शिविर — मदरल्याण्ड सेकेन्डरी स्कुलका विद्यार्थीहरूसँग निःशुल्क दन्त परीक्षण कार्यक्रम', alt: 'School Dental Outreach Camp Motherland School', src: '/camps/school-oral-health-camp.jpg', thumb: '/camps/school-oral-health-camp.jpg' },
  { id: 103, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Community Felicitation Award — Unique Dental team honored with certificates of appreciation for conducting free dental health camps', captionNp: 'सम्मान तथा कदरपत्र — समुदायमा निःशुल्क दन्त शिविर सञ्चालन गरेबापत युनिक डेन्टल टोलीलाई कदरपत्रद्वारा सम्मान', alt: 'Dental Camp Appreciation Award', src: '/camps/community-award-felicitation.jpg', thumb: '/camps/community-award-felicitation.jpg' },
  { id: 104, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Unique Dental Family Gathering — Annual celebration & festive fellowship with traditional Nepali Dhaka shawls and red tika', captionNp: 'युनिक डेन्टल परिवार — ढाका खादा र रातो टीकासहित क्लिनिकको वार्षिक उत्सव तथा सांस्कृतिक पुनर्मिलन', alt: 'Unique Dental Clinic Team Celebration', src: '/camps/team-celebration-clinic.jpg', thumb: '/camps/team-celebration-clinic.jpg' },
  { id: 105, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Our Dedicated Dental Care Staff — Relaxing together in the patient lounge after a successful community dental outreach', captionNp: 'हाम्रा समर्पित कर्मचारीहरू — सफल सामुदायिक दन्त शिविर सम्पन्न गरेपछि क्लिनिकको लाउन्जमा रमाइलो पल', alt: 'Unique Dental Staff in Clinic Lounge', src: '/camps/team-lounge-gathering.jpg', thumb: '/camps/team-lounge-gathering.jpg' },
  { id: 106, cat: 'Dental Camps', span: 'col-span-2', pos: 'object-center', caption: 'Motherland English School Free Dental Camp, Butwal-11, Motipur — Unique Dental doctors and clinical team conducting comprehensive dental screenings', captionNp: 'मदरल्याण्ड इङ्ग्लिस स्कुल, बुटवल-११, मोतिपुरमा आयोजित निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर — युनिक डेन्टल टोली', alt: 'Free Dental Camp at Motherland English School Motipur Butwal', src: '/camps/school-camp-motipur-butwal.jpg', thumb: '/camps/school-camp-motipur-butwal.jpg' },
  { id: 107, cat: 'Dental Camps', span: 'col-span-2', pos: 'object-center', caption: 'Shree Shreejana Basic School Free Dental Camp, Tinau-3, Palpa — Unique Dental providing free dental checkups, fluoride care & oral hygiene education to rural students', captionNp: 'श्री सृजना आधारभूत विद्यालय, तिनाउ-३, श्रीडाँडा, पाल्पामा निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर — युनिक डेन्टल', alt: 'Free Dental Camp at Shree Shreejana Basic School Palpa', src: '/camps/camp-palpa-tinau-school.jpg', thumb: '/camps/camp-palpa-tinau-school.jpg' },
  { id: 108, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Sajilo Co-operative Free Dental Camp, Kalikanagar Butwal-4 — Doctor conducting clinical oral examination and diagnosis for community members', captionNp: 'सजिलो बचत तथा ऋण सहकारी, कालिकानगर बुटवल-४ — स्थानीय सदस्यहरूको मुख तथा दन्त परीक्षण गर्दै चिकित्सक', alt: 'Dental Camp Examination Sajilo Cooperative Butwal', src: '/camps/camp-examination-sajilo-cooperative.jpg', thumb: '/camps/camp-examination-sajilo-cooperative.jpg' },
  { id: 109, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Pediatric Portable Digital Dental Screening — Handheld digital oral imaging device used during community outreach for children', captionNp: 'बालबालिका डिजिटल दन्त परीक्षण — अत्याधुनिक पोर्टेबल उपकरणमार्फत बालबालिकाको मुख जाँच', alt: 'Pediatric Portable Digital Dental Screening', src: '/camps/camp-pediatric-digital-screening.jpg', thumb: '/camps/camp-pediatric-digital-screening.jpg' },
  { id: 110, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'School Student Oral Health Examination — Dental specialist examining school student under sterile conditions at Motherland School', captionNp: 'विद्यार्थी दन्त परीक्षण — मदरल्याण्ड स्कुलमा दन्त चिकित्सकद्वारा विद्यार्थीको जाँच', alt: 'School Student Dental Examination Motherland School', src: '/camps/camp-student-checkup-motherland.jpg', thumb: '/camps/camp-student-checkup-motherland.jpg' },
  { id: 111, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Senior Citizen Dental Care — Gentle, respectful oral health examination and denture consultation for elderly community members', captionNp: 'ज्येष्ठ नागरिक दन्त सेवा — आदरणीय वृद्धवृद्धाको दन्त स्वास्थ्य परीक्षण तथा परामर्श', alt: 'Senior Citizen Dental Examination in Community Camp', src: '/camps/camp-elderly-dental-screening.jpg', thumb: '/camps/camp-elderly-dental-screening.jpg' },
  { id: 112, cat: 'Dental Camps', span: '',            pos: 'object-center', caption: 'Friendly Child Dental Screening — Gentle, fear-free outdoor dental examination creating confident smiles for young patients', captionNp: 'बालबालिकाको सहज दन्त परीक्षण — डरमुक्त र मायालु वातावरणमा बालबालिकाको दाँतको हेरचाह', alt: 'Friendly Child Dental Screening Outdoor Camp', src: '/camps/camp-child-dental-care-outdoor.jpg', thumb: '/camps/camp-child-dental-care-outdoor.jpg' },
  { id: 113, cat: 'Dental Camps', span: 'col-span-2', pos: 'object-center', caption: 'Rural School Dental Camp — Unique Dental medical team conducting oral screenings in the school courtyard with local teachers & students', captionNp: 'ग्रामीण विद्यालय दन्त शिविर — खुला प्राङ्गणमा विद्यार्थीहरूको निःशुल्क मुख तथा दन्त परीक्षण गर्दै युनिक डेन्टल मेडिकल टोली', alt: 'Rural School Dental Health Screening Camp', src: '/camps/rural-school-camp-checkup.jpg', thumb: '/camps/rural-school-camp-checkup.jpg' },
  { id: 114, cat: 'Dental Camps', span: 'col-span-2', pos: 'object-center', caption: 'Community School Health Day — Eager schoolchildren lined up across the schoolyard for free dental checkups and oral hygiene guidance', captionNp: 'सामुदायिक विद्यालय स्वास्थ्य दिवस — निःशुल्क दन्त परीक्षणका लागि विद्यालय प्राङ्गणमा उत्साहित विद्यार्थीहरूको लाम', alt: 'Schoolchildren queued for free dental health camp', src: '/camps/rural-students-queue-camp.jpg', thumb: '/camps/rural-students-queue-camp.jpg' },
  { id: 201, cat: 'Happy Patients', span: 'col-span-2', pos: 'object-center', caption: 'Fear-Free Pediatric Dentistry — A big thumbs up from our happy little hero during a gentle dental checkup in our modern operatory chair!', captionNp: 'डरमुक्त बाल दन्त चिकित्सा — युनिक डेन्टलमा सहज र मायालु वातावरणमा दन्त परीक्षणपछि सन्तुष्ट बिरामीको थम्ब्स अप!', alt: 'Happy Pediatric Patient Thumbs Up at Unique Dental', src: '/patients/happy-child-patient-thumbs-up.jpg', thumb: '/patients/happy-child-patient-thumbs-up.jpg' },
  { id: 13, cat: 'Treatments',      span: 'col-span-2', pos: 'object-center', caption: 'Teeth whitening — walk in with stains, walk out with a brighter smile',                 captionNp: 'दाँत सेतो पार्ने — दाग लिएर आउनुहोस्, उज्यालो मुस्कानसहित जानुहोस्', alt: 'Teeth whitening procedure', src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=700&q=75' },
  { id: 14, cat: 'Treatments',      span: '',            pos: 'object-center', caption: "A thorough clean — we get to the places your toothbrush simply can't reach",           captionNp: 'गहिरो सफाइ — ब्रसले नपुग्ने ठाउँसम्म हामी पुग्छौं', alt: 'Dental cleaning session', src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=75' },
  { id: 15, cat: 'Treatments',      span: '',            pos: 'object-center', caption: "Root canal — it sounds scary, but in our hands it's just another routine visit",        captionNp: 'रुट क्यानाल — डरलाग्दो लाग्छ तर हाम्रो हातमा यो सामान्य भ्रमण मात्र हो', alt: 'Root canal therapy', src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=75' },
  { id: 16, cat: 'Treatments',      span: '',            pos: 'object-center', caption: 'Digital impressions — no messy moulds, just a quick 3D scan',                          captionNp: 'डिजिटल इम्प्रेसन — गोलमाल मोल्ड छैन, सिधै छिटो ३डी स्क्यान', alt: 'Digital dental impression', src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=75' },
  { id: 17, cat: 'Treatments',      span: '',            pos: 'object-center', caption: 'Custom crowns matched perfectly to your natural tooth colour',                          captionNp: 'कस्टम क्राउन — तपाईंको प्राकृतिक दाँतको रङसँग बिल्कुल मिल्ने', alt: 'Porcelain crown fitting', src: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=600&q=75' },
  { id: 18, cat: 'Treatments',      span: 'col-span-2', pos: 'object-center', caption: 'Braces and aligners — we straighten smiles for all ages',                              captionNp: 'ब्रेसेस र अलाइनर — सबै उमेरका बिरामीको मुस्कान सुधार्छौं', alt: 'Orthodontic consultation', src: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=700&q=75' },
  { id: 19, cat: 'Happy Patients',  span: 'col-span-2', pos: 'object-center', caption: "Smile makeover — veneers and whitening, and she hasn't stopped smiling since",         captionNp: 'स्माइल मेकओभर — भेनियर र व्हाइटनिङपछि उनको मुस्कान रोकिएन', alt: 'Smile makeover result', src: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=75' },
  { id: 20, cat: 'Happy Patients',  span: '',            pos: 'object-center', caption: 'After her implant — natural, confident, and absolutely glowing',                       captionNp: 'इम्प्लान्टपछि — प्राकृतिक, आत्मविश्वासपूर्ण र चम्किलो', alt: 'Happy patient after implant', src: 'https://images.unsplash.com/photo-1489659639091-8b687bc4386e?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1489659639091-8b687bc4386e?auto=format&fit=crop&w=600&q=75' },
  { id: 21, cat: 'Happy Patients',  span: '',            pos: 'object-center', caption: "Rajesh after whitening — he said he couldn't stop looking in the mirror!",             captionNp: 'व्हाइटनिङपछि राजेश — ऐना हेर्न छाड्न सकेनन् रे!', alt: 'Patient after whitening', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=75' },
  { id: 22, cat: 'Happy Patients',  span: '',            pos: 'object-center', caption: 'Two years of braces — and now she has the straightest smile in the room',              captionNp: 'दुई वर्षको ब्रेसेस — अब उनको मुस्कान सबैभन्दा सिधा छ', alt: 'Post-orthodontic smile', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=75' },
  { id: 23, cat: 'Happy Patients',  span: '',            pos: 'object-center', caption: 'Full-mouth rehab complete — his confidence came back along with his smile',            captionNp: 'पूर्ण मुख पुनर्स्थापना — मुस्कानसँगै उनको आत्मविश्वास पनि फर्कियो', alt: 'Full-mouth rehabilitation', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=75' },
  { id: 24, cat: 'Happy Patients',  span: '',            pos: 'object-center', caption: "Crown and bridge — you'd never know which ones aren't her natural teeth",             captionNp: 'क्राउन र ब्रिज — कुन नक्कली हो भन्न सकिँदैन', alt: 'Crown and bridge result', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80', thumb: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=75' },
  { id: 25, cat: 'Happy Patients',  span: 'col-span-2', pos: 'object-center', caption: "Every smile is a story — and we're proud to be part of yours",                        captionNp: 'हर मुस्कान एउटा कथा हो — र तपाईंको कथाको अंश बन्न पाउँदा हामी गर्विन्छौं', alt: 'Beautiful smile transformation', src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=75' },
];

export default function Gallery() {
  const { lang } = useLanguage();
  const { openBookingModal } = useBookingModal();
  const np = lang === 'np';

  const COMFORT = [
    { icon: Heart,       labelEn: 'Gentle & Caring',     labelNp: 'कोमल र हेरचाहपूर्ण',   descEn: 'Our team treats every patient like family',         descNp: 'हाम्रो टोलीले हर बिरामीलाई परिवारजस्तै व्यवहार गर्छ' },
    { icon: ShieldCheck, labelEn: 'Safe & Sterile',       labelNp: 'सुरक्षित र स्टेरिल',    descEn: 'Hospital-grade sterilisation, every visit',          descNp: 'हर भ्रमणमा अस्पताल स्तरको स्टेरिलाइजेसन' },
    { icon: Star,        labelEn: '5-Star Experience',    labelNp: '५-स्टार अनुभव',         descEn: 'Rated 4.9 by over 500 happy patients',              descNp: '५०० भन्दा बढी खुसी बिरामीहरूद्वारा ४.९ रेटिङ' },
    { icon: Coffee,      labelEn: 'Relaxing Environment', labelNp: 'आरामदायी वातावरण',      descEn: 'Comfortable lounge while you wait',                 descNp: 'प्रतीक्षाका बेला आरामदायी बस्ने व्यवस्था' },
  ];

  const CATS_EN = ['All', 'Our Branches', 'Our Clinic', 'Our Team', 'Dental Camps', 'Treatments', 'Happy Patients'];
  const CATS_NP = ['सबै', 'शाखाहरू', 'क्लिनिक भित्र', 'हाम्रो टोली', 'दन्त शिविरहरू', 'उपचारहरू', 'सन्तुष्ट बिरामीहरू'];
  const CATS = np ? CATS_NP : CATS_EN;

  const [activeIdx, setActiveIdx]       = useState(0);
  const [activePhoto, setActivePhoto]   = useState(null);
  const [apiPhotos, setApiPhotos]       = useState(null);
  const [apiError, setApiError]         = useState(false);

  const mapCategory = (cat) => {
    if (!cat) return 'Our Clinic';
    if (cat === 'Branches' || cat === 'Our Branches') return 'Our Branches';
    if (cat === 'Clinic' || cat === 'Our Clinic') return 'Our Clinic';
    if (cat === 'Team' || cat === 'Our Team') return 'Our Team';
    if (cat === 'Camps' || cat === 'Dental Camps' || cat === 'Camp') return 'Dental Camps';
    if (cat === 'Smiles' || cat === 'Patient Smiles' || cat === 'Happy Patients') return 'Happy Patients';
    if (cat === 'Treatments') return 'Treatments';
    return cat;
  };

  useEffect(() => {
    api.get('/gallery', { params: { limit: 100 } })
      .then((res) => setApiPhotos(
        res.data.data.gallery.map((img, i) => ({
          id: img._id,
          src: img.imageUrl,
          thumb: img.imageUrl,
          alt: img.caption,
          caption: img.caption,
          captionNp: img.captionNp || img.caption,
          cat: mapCategory(img.category),
          pos: img.imageUrl.includes('/doctors/') ? 'object-top' : 'object-center',
          span: i % 5 === 0 ? 'col-span-2' : '',
        }))
      ))
      .catch(() => { setApiError(true); setApiPhotos([]); });
  }, []);

  const allPhotos = (apiPhotos && apiPhotos.length > 0) ? apiPhotos : photos;

  const matchCategory = (p, catEn) => {
    if (catEn === 'All') return true;
    const cats = Array.isArray(p.cat) ? p.cat : [p.cat];
    if (catEn === 'Happy Patients') {
      return cats.includes('Happy Patients') || cats.includes('Patient Smiles') || cats.includes('Smiles');
    }
    if (catEn === 'Our Branches') {
      return cats.includes('Our Branches') || cats.includes('Branches');
    }
    return cats.includes(catEn);
  };

  const activeCatEn = activeIdx === 0 ? 'All' : CATS_EN[activeIdx];
  const filtered = activeIdx === 0 ? allPhotos : allPhotos.filter((p) => matchCategory(p, activeCatEn));
  const currentIndex = activePhoto
    ? filtered.findIndex((p) => (String(p.id) === String(activePhoto.id) || p.src === activePhoto.src))
    : -1;
  const lightboxPhoto = activePhoto;

  const prev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!filtered || filtered.length === 0) return;
    const baseIdx = currentIndex !== -1 ? currentIndex : 0;
    const prevIdx = (baseIdx - 1 + filtered.length) % filtered.length;
    setActivePhoto(filtered[prevIdx]);
  };
  const next = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!filtered || filtered.length === 0) return;
    const baseIdx = currentIndex !== -1 ? currentIndex : 0;
    const nextIdx = (baseIdx + 1) % filtered.length;
    setActivePhoto(filtered[nextIdx]);
  };

  useEffect(() => {
    if (lightboxPhoto) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActivePhoto(null);
        if (e.key === 'ArrowLeft') prev(e);
        if (e.key === 'ArrowRight') next(e);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxPhoto, currentIndex, filtered]);

  const getCount = (idx) => idx === 0 ? allPhotos.length : allPhotos.filter((p) => matchCategory(p, CATS_EN[idx])).length;

  const getCatLabel = (cat) => {
    const primaryCat = Array.isArray(cat) ? cat[0] : cat;
    const idx = CATS_EN.indexOf(primaryCat);
    if (idx !== -1 && np) return CATS_NP[idx];
    return primaryCat || '';
  };

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-28 flex items-center min-h-[55vh] overflow-hidden">
        <img src={HERO_BG} alt="Unique Dental Gallery" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/85 via-gray-900/75 to-gray-950/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center w-full">
          <Animate variant="fade-up">
            <span className="inline-block text-primary-400 font-bold text-sm uppercase tracking-widest mb-4">
              {np ? 'हाम्रो ग्यालरी' : 'Our Gallery'}
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
              {np ? <>तपाईंको आराम<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">हाम्रो प्राथमिकता</span></> : <>Designed for<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">Your Comfort</span></>}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {np
                ? 'युनिक डेन्टलभित्र झाँक्नुहोस् — ठाउँहरू, अनुहारहरू र हामीले हरोजे बनाउने मुस्कानहरू हेर्नुहोस्।'
                : 'Step inside Unique Dental and see the spaces, the faces, and the smiles we create every day. We\'ve thought of everything so you can just relax.'
              }
            </p>
          </Animate>
        </div>
      </section>

      {/* ── COMFORT STRIP ── */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {COMFORT.map(({ icon: Icon, labelEn, labelNp, descEn, descNp }, i) => (
              <Animate key={labelEn} variant="zoom-up" delay={i * 80}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{np ? labelNp : labelEn}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-snug">{np ? descNp : descEn}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate variant="fade-down" delay={100}>
            <div className="flex items-center gap-1 py-4 overflow-x-auto">
              {CATS.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeIdx === idx
                      ? 'bg-primary-700 text-white shadow-lg shadow-primary-700/25'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${activeIdx === idx ? 'text-primary-300' : 'text-gray-400'}`}>
                    ({getCount(idx)})
                  </span>
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {apiPhotos === null ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] sm:auto-rows-[280px]">
              {filtered.map((photo, i) => (
                <Animate
                  key={photo.id}
                  variant="zoom-up"
                  delay={(i % 6) * 60}
                  className={`h-[250px] sm:h-[280px] ${photo.span ?? ''}`}
                >
                  <div
                    onClick={() => setActivePhoto(photo)}
                    className="group relative h-full w-full overflow-hidden rounded-2xl cursor-pointer bg-gray-900 shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <img
                      src={photo.thumb || photo.src}
                      alt={photo.alt}
                      className={`w-full h-full object-cover ${photo.pos || 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                      loading="eager"
                      onError={(e) => {
                        if (e.target.src !== photo.src) {
                          e.target.src = photo.src;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pb-12 pointer-events-none">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/40 shadow-xl">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3.5 pointer-events-none">
                      <span className="inline-block text-[10px] font-extrabold text-primary-300 uppercase tracking-widest mb-1 leading-none">
                        {getCatLabel(photo.cat)}
                      </span>
                      <p className="text-white text-xs sm:text-sm font-semibold leading-snug line-clamp-2 drop-shadow-sm">
                        {np ? photo.captionNp : photo.caption}
                      </p>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX PORTAL ── */}
      {lightboxPhoto && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
            <span className="text-white/90 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 pointer-events-auto shadow-lg">
              {currentIndex !== -1 ? currentIndex + 1 : 1} / {filtered.length}
            </span>
            <button
              type="button"
              className="p-2.5 sm:p-3 bg-white/15 hover:bg-white/30 rounded-full text-white transition-all pointer-events-auto shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
              onClick={() => setActivePhoto(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Prev / Next Arrows */}
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 rounded-full text-white transition-all z-30 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-90"
                onClick={prev}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
              <button
                type="button"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 rounded-full text-white transition-all z-30 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-90"
                onClick={next}
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </>
          )}

          {/* Centered Image + Caption Container */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto pt-12 sm:pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center w-full max-h-[60vh] sm:max-h-[72vh]">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                className="max-h-[60vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-white/15 rounded-2xl px-5 sm:px-8 py-3.5 sm:py-4 text-center max-w-2xl w-full shadow-2xl">
              <span className="inline-block text-accent-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mb-1">
                {getCatLabel(lightboxPhoto.cat)}
              </span>
              <p className="text-white font-bold text-sm sm:text-base leading-snug">
                {np ? lightboxPhoto.captionNp : lightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-900 text-white text-center px-4 overflow-hidden">
        <Animate variant="zoom-up">
          <h2 className="text-3xl font-extrabold mb-3">{np ? 'आफैँ आएर हेर्नुहोस्' : 'Come See Us in Person'}</h2>
          <p className="text-primary-200 text-lg mb-7 max-w-xl mx-auto">
            {np ? 'फोटोले आधी कथा मात्र बताउँछ। अपोइन्टमेन्ट बुक गरेर हाम्रो न्यानोपन आफैँ महसुस गर्नुहोस्।' : 'Photos only tell half the story. Book an appointment and experience the warmth yourself.'}
          </p>
          <button onClick={() => openBookingModal()} className="inline-flex items-center gap-2 px-9 py-4 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-2xl transition-colors shadow-2xl text-base">
            {np ? 'अपोइन्टमेन्ट बुक गर्नुहोस् →' : 'Book Your Appointment →'}
          </button>
        </Animate>
      </section>

    </div>
  );
}
