const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');
const User = require('./models/User');
const connectDB = require('./config/database');

const gallerySeedData = [
  // ── Our Branches ──
  {
    imageUrl: '/branches/butwal-puspalal-park.jpg',
    category: 'Our Branches',
    caption: 'Main Branch — Puspalal Park, Butwal-6 (Head Office)',
    captionNp: 'मुख्य शाखा — पुष्पलाल पार्क, बुटवल-६ (प्रधान कार्यालय)',
  },
  {
    imageUrl: '/branches/badhganga-kapilbastu.jpg',
    category: 'Our Branches',
    caption: 'Kapilvastu Branch — Banganga-4, Charnumber, Kapilvastu (Opposite Kapilvastu Hospital)',
    captionNp: 'कपिलवस्तु शाखा — बाणगंगा-४, चारनम्बर, कपिलवस्तु (कपिलवस्तु अस्पताल अगाडि)',
  },
  {
    imageUrl: '/branches/manigram.jpg',
    category: 'Our Branches',
    caption: 'Manigram Branch — Manigram, Rupandehi (Tilottama)',
    captionNp: 'मनिग्राम शाखा — मनिग्राम, रुपन्देही (तिलोत्तमा)',
  },

  // ── Our Team ──
  {
    imageUrl: '/doctors/dr-raju-shrestha.webp',
    category: 'Our Team',
    caption: 'Dr. Raju Shrestha — Consultant Orthodontist (BDS, MDS), Braces & Clear Aligners Specialist',
    captionNp: 'डा. राजु श्रेष्ठ — कन्सल्टेन्ट अर्थोडन्टिस्ट (BDS, MDS), ब्रेसेस तथा अलाइनर विशेषज्ञ',
  },
  {
    imageUrl: '/doctors/dr-aakash-karmacharya.webp',
    category: 'Our Team',
    caption: 'Dr. Aakash Karmacharya — Consultant Endodontist (BDS, MDS), Painless Root Canal Therapy Specialist',
    captionNp: 'डा. आकाश कर्माचार्य — कन्सल्टेन्ट एन्डोडन्टिस्ट (BDS, MDS), दुखाइरहित रुट क्यानाल विशेषज्ञ',
  },
  {
    imageUrl: '/doctors/dr-sita-bhushal.webp',
    category: 'Our Team',
    caption: 'Dr. Sita Bhushal — Consultant Periodontist & Oral Implantologist (BDS, MDS), Dental Implants & Laser Specialist',
    captionNp: 'डा. सीता भुषाल — कन्सल्टेन्ट इम्प्लान्टोलोजिस्ट र गम सर्जन (BDS, MDS), डेन्टल इम्प्लान्ट तथा लेजर विशेषज्ञ',
  },
  {
    imageUrl: '/doctors/dr-nagendra-shrish.webp',
    category: 'Our Team',
    caption: 'Dr. Nagendra Shrish — Consultant Oral & Maxillofacial Surgeon (BDS, MDS), Impacted Wisdom Tooth & Facial Surgery',
    captionNp: 'डा. नगन्द्र श्रीश — कन्सल्टेन्ट ओरल तथा म्याक्सिलोफेसियल सर्जन (BDS, MDS), बुद्धि बङ्गारा तथा जबडा शल्यक्रिया विशेषज्ञ',
  },
  {
    imageUrl: '/doctors/dr-anjila-neupane.webp',
    category: 'Our Team',
    caption: 'Dr. Anjila Neupane — Dental Surgeon (BDS), General & Preventive Dentistry',
    captionNp: 'डा. अञ्जिला न्यौपाने — दन्त चिकित्सक (BDS), सामान्य तथा रोकथाम दन्त स्याहार',
  },
  {
    imageUrl: '/doctors/rdh-bishnu-budhathoki.webp',
    category: 'Our Team',
    caption: 'RDH Bishnu Budhathoki — Registered Dental Hygienist, Scaling & Oral Prophylaxis',
    captionNp: 'आर.डी.एच. विष्णु बुढाथोकी — रजिस्टर्ड डेन्टल हाइजिनिस्ट, स्केलिङ तथा मुख स्वास्थ्य',
  },

  // ── Dental Camps ──
  {
    imageUrl: '/camps/free-dental-camp-puspalal-park.jpg',
    category: 'Dental Camps',
    caption: 'Unique Dental Medical Team — Free Oral & Dental Health Camp at Puspalal Park, Butwal-6',
    captionNp: 'युनिक डेन्टल मेडिकल टोली — पुष्पलाल पार्क, बुटवल-६ मा आयोजित निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर',
  },
  {
    imageUrl: '/camps/school-oral-health-camp.jpg',
    category: 'Dental Camps',
    caption: 'Community Outreach — Free School Dental Screening & Hygiene Camp with students & teachers at Motherland Secondary School',
    captionNp: 'सामुदायिक विद्यालय दन्त शिविर — मदरल्याण्ड सेकेन्डरी स्कुलका विद्यार्थीहरूसँग निःशुल्क दन्त परीक्षण कार्यक्रम',
  },
  {
    imageUrl: '/camps/community-award-felicitation.jpg',
    category: 'Dental Camps',
    caption: 'Community Felicitation Award — Unique Dental team honored with certificates of appreciation for conducting free dental health camps',
    captionNp: 'सम्मान तथा कदरपत्र — समुदायमा निःशुल्क दन्त शिविर सञ्चालन गरेबापत युनिक डेन्टल टोलीलाई कदरपत्रद्वारा सम्मान',
  },
  {
    imageUrl: '/camps/team-celebration-clinic.jpg',
    category: 'Dental Camps',
    caption: 'Unique Dental Family Gathering — Annual celebration & festive fellowship with traditional Nepali Dhaka shawls and red tika',
    captionNp: 'युनिक डेन्टल परिवार — ढाका खादा र रातो टीकासहित क्लिनिकको वार्षिक उत्सव तथा सांस्कृतिक पुनर्मिलन',
  },
  {
    imageUrl: '/camps/team-lounge-gathering.jpg',
    category: 'Dental Camps',
    caption: 'Our Dedicated Dental Care Staff — Relaxing together in the patient lounge after a successful community dental outreach',
    captionNp: 'हाम्रा समर्पित कर्मचारीहरू — सफल सामुदायिक दन्त शिविर सम्पन्न गरेपछि क्लिनिकको लाउन्जमा रमाइलो पल',
  },
  {
    imageUrl: '/camps/school-camp-motipur-butwal.jpg',
    category: 'Dental Camps',
    caption: 'Motherland English School Free Dental Camp, Butwal-11, Motipur — Unique Dental doctors and clinical team conducting comprehensive dental screenings',
    captionNp: 'मदरल्याण्ड इङ्ग्लिस स्कुल, बुटवल-११, मोतिपुरमा आयोजित निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर — युनिक डेन्टल टोली',
  },
  {
    imageUrl: '/camps/camp-palpa-tinau-school.jpg',
    category: 'Dental Camps',
    caption: 'Shree Shreejana Basic School Free Dental Camp, Tinau-3, Palpa — Unique Dental providing free dental checkups, fluoride care & oral hygiene education to rural students',
    captionNp: 'श्री सृजना आधारभूत विद्यालय, तिनाउ-३, श्रीडाँडा, पाल्पामा निःशुल्क मुख तथा दन्त स्वास्थ्य शिविर — युनिक डेन्टल',
  },
  {
    imageUrl: '/camps/camp-examination-sajilo-cooperative.jpg',
    category: 'Dental Camps',
    caption: 'Sajilo Co-operative Free Dental Camp, Kalikanagar Butwal-4 — Doctor conducting clinical oral examination and diagnosis for community members',
    captionNp: 'सजिलो बचत तथा ऋण सहकारी, कालिकानगर बुटवल-४ — स्थानीय सदस्यहरूको मुख तथा दन्त परीक्षण गर्दै चिकित्सक',
  },
  {
    imageUrl: '/camps/camp-pediatric-digital-screening.jpg',
    category: 'Dental Camps',
    caption: 'Pediatric Portable Digital Dental Screening — Handheld digital oral imaging device used during community outreach for children',
    captionNp: 'बालबालिका डिजिटल दन्त परीक्षण — अत्याधुनिक पोर्टेबल उपकरणमार्फत बालबालिकाको मुख जाँच',
  },
  {
    imageUrl: '/camps/camp-student-checkup-motherland.jpg',
    category: 'Dental Camps',
    caption: 'School Student Oral Health Examination — Dental specialist examining school student under sterile conditions at Motherland School',
    captionNp: 'विद्यार्थी दन्त परीक्षण — मदरल्याण्ड स्कुलमा दन्त चिकित्सकद्वारा विद्यार्थीको जाँच',
  },
  {
    imageUrl: '/camps/camp-elderly-dental-screening.jpg',
    category: 'Dental Camps',
    caption: 'Senior Citizen Dental Care — Gentle, respectful oral health examination and denture consultation for elderly community members',
    captionNp: 'ज्येष्ठ नागरिक दन्त सेवा — आदरणीय वृद्धवृद्धाको दन्त स्वास्थ्य परीक्षण तथा परामर्श',
  },
  {
    imageUrl: '/camps/camp-child-dental-care-outdoor.jpg',
    category: 'Dental Camps',
    caption: 'Friendly Child Dental Screening — Gentle, fear-free outdoor dental examination creating confident smiles for young patients',
    captionNp: 'बालबालिकाको सहज दन्त परीक्षण — डरमुक्त र मायालु वातावरणमा बालबालिकाको दाँतको हेरचाह',
  },
  {
    imageUrl: '/camps/rural-school-camp-checkup.jpg',
    category: 'Dental Camps',
    caption: 'Rural School Dental Camp — Unique Dental medical team conducting oral screenings in the school courtyard with local teachers & students',
    captionNp: 'ग्रामीण विद्यालय दन्त शिविर — खुला प्राङ्गणमा विद्यार्थीहरूको निःशुल्क मुख तथा दन्त परीक्षण गर्दै युनिक डेन्टल मेडिकल टोली',
  },
  {
    imageUrl: '/camps/rural-students-queue-camp.jpg',
    category: 'Dental Camps',
    caption: 'Community School Health Day — Eager schoolchildren lined up across the schoolyard for free dental checkups and oral hygiene guidance',
    captionNp: 'सामुदायिक विद्यालय स्वास्थ्य दिवस — निःशुल्क दन्त परीक्षणका लागि विद्यालय प्राङ्गणमा उत्साहित विद्यार्थीहरूको लाम',
  },

  // ── Happy Patients ──
  {
    imageUrl: '/patients/happy-child-patient-thumbs-up.jpg',
    category: 'Happy Patients',
    caption: 'Fear-Free Pediatric Dentistry — A big thumbs up from our happy little hero during a gentle dental checkup in our modern operatory chair!',
    captionNp: 'डरमुक्त बाल दन्त चिकित्सा — युनिक डेन्टलमा सहज र मायालु वातावरणमा दन्त परीक्षणपछि सन्तुष्ट बिरामीको थम्ब्स अप!',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    category: 'Happy Patients',
    caption: "Smile makeover — veneers and whitening, and she hasn't stopped smiling since",
    captionNp: 'स्माइल मेकओभर — भेनियर र व्हाइटनिङपछि उनको मुस्कान रोकिएन',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1489659639091-8b687bc4386e?auto=format&fit=crop&w=900&q=80',
    category: 'Happy Patients',
    caption: 'After her implant — natural, confident, and absolutely glowing',
    captionNp: 'इम्प्लान्टपछि — प्राकृतिक, आत्मविश्वासपूर्ण र चम्किलो',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    category: 'Happy Patients',
    caption: "Rajesh after whitening — he said he couldn't stop looking in the mirror!",
    captionNp: 'व्हाइटनिङपछि राजेश — ऐना हेर्न छाड्न सकेनन् रे!',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    category: 'Happy Patients',
    caption: 'Two years of braces — and now she has the straightest smile in the room',
    captionNp: 'दुई वर्षको ब्रेसेस — अब उनको मुस्कान सबैभन्दा सिधा छ',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    category: 'Happy Patients',
    caption: 'Full-mouth rehab complete — his confidence came back along with his smile',
    captionNp: 'पूर्ण मुख पुनर्स्थापना — मुस्कानसँगै उनको आत्मविश्वास पनि फर्कियो',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    category: 'Happy Patients',
    caption: "Crown and bridge — you'd never know which ones aren't her natural teeth",
    captionNp: 'क्राउन र ब्रिज — कुन नक्कली हो भन्न सकिँदैन',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1200&q=80',
    category: 'Happy Patients',
    caption: "Every smile is a story — and we're proud to be part of yours",
    captionNp: 'हर मुस्कान एउटा कथा हो — र तपाईंको कथाको अंश बन्न पाउँदा हामी गर्विन्छौं',
  },

  // ── Our Clinic ──
  {
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    category: 'Our Clinic',
    caption: 'A warm, welcoming reception — the first thing you see when you walk in',
    captionNp: 'न्यानो स्वागत कक्ष — क्लिनिकमा प्रवेश गर्दा सबैभन्दा पहिले देख्ने ठाउँ',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
    category: 'Our Clinic',
    caption: 'Comfortable dental chairs — because your relaxation matters to us',
    captionNp: 'आरामदायी डेन्टल कुर्सी — तपाईंको आराम हाम्रो प्राथमिकता हो',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',
    category: 'Our Clinic',
    caption: 'The latest digital imaging — so we can see clearly and treat accurately',
    captionNp: 'नवीनतम डिजिटल इमेजिङ — सटीक निदान र उपचारका लागि',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
    category: 'Our Clinic',
    caption: 'Bright, clean treatment rooms — designed to feel calm, not clinical',
    captionNp: 'उज्यालो, सफा उपचार कोठा — शान्त र आरामदायी वातावरण',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    category: 'Our Clinic',
    caption: 'Every instrument fully sterilised — your safety comes first, always',
    captionNp: 'सबै उपकरण पूर्ण रूपमा स्टेरिलाइज — तपाईंको सुरक्षा सर्वोपरि',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
    category: 'Our Clinic',
    caption: 'Our full implant suite — everything from consultation to crown fitting, right here',
    captionNp: 'हाम्रो इम्प्लान्ट सुइट — परामर्शदेखि क्राउन फिटिङसम्म सबै एकै ठाउँमा',
  },

  // ── Treatments ──
  {
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
    category: 'Treatments',
    caption: 'Teeth whitening — walk in with stains, walk out with a brighter smile',
    captionNp: 'दाँत सेतो पार्ने — दाग लिएर आउनुहोस्, उज्यालो मुस्कानसहित जानुहोस्',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    category: 'Treatments',
    caption: "A thorough clean — we get to the places your toothbrush simply can't reach",
    captionNp: 'गहिरो सफाइ — ब्रसले नपुग्ने ठाउँसम्म हामी पुग्छौं',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
    category: 'Treatments',
    caption: "Root canal — it sounds scary, but in our hands it's just another routine visit",
    captionNp: 'रुट क्यानाल — डरलाग्दो लाग्छ तर हाम्रो हातमा यो सामान्य भ्रमण मात्र हो',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    category: 'Treatments',
    caption: 'Digital impressions — no messy moulds, just a quick 3D scan',
    captionNp: 'डिजिटल इम्प्रेसन — गोलमाल मोल्ड छैन, सिधै छिटो ३डी स्क्यान',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=900&q=80',
    category: 'Treatments',
    caption: 'Custom crowns matched perfectly to your natural tooth colour',
    captionNp: 'कस्टम क्राउन — तपाईंको प्राकृतिक दाँतको रङसँग बिल्कुल मिल्ने',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=1200&q=80',
    category: 'Treatments',
    caption: 'Braces and aligners — we straighten smiles for all ages',
    captionNp: 'ब्रेसेस र अलाइनर — सबै उमेरका बिरामीको मुस्कान सुधार्छौं',
  },
];

const seedGallery = async () => {
  try {
    await connectDB();
    console.log('🔄 Connected to database. Seeding gallery photos...');

    const admin = await User.findOne({ role: 'admin' });
    const adminId = admin ? admin._id : null;

    let inserted = 0;
    let updated = 0;

    for (const item of gallerySeedData) {
      const existing = await Gallery.findOne({ imageUrl: item.imageUrl });
      if (existing) {
        existing.caption = item.caption;
        existing.captionNp = item.captionNp;
        existing.category = item.category;
        await existing.save();
        updated++;
      } else {
        await Gallery.create({
          imageUrl: item.imageUrl,
          category: item.category,
          caption: item.caption,
          captionNp: item.captionNp,
          source: item.imageUrl.startsWith('/') ? 'static' : 'local',
          uploadedBy: adminId,
        });
        inserted++;
      }
    }

    const total = await Gallery.countDocuments();
    console.log(`✅ Gallery seed completed! Inserted: ${inserted}, Updated: ${updated}, Total in DB: ${total}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error);
    process.exit(1);
  }
};

seedGallery();
