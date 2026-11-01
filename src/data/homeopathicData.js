/**
 * HOMEOCARE — Homeopathic Master Catalog and Comprehensive Clinical Demo Data
 */

export const SAMPLE_PATIENTS = [
  {
    id: 'HC-2026-0841',
    token: '04',
    name: 'Rajesh Verma (राजेश वर्मा)',
    age: 48,
    gender: 'Male',
    phone: '+91 98230 44120',
    email: 'rajesh.verma@example.com',
    address: 'B-42 Anand Lok, Civil Lines, New Delhi',
    bloodGroup: 'B+',
    visitDate: '2026-11-01',
    previousVisitDate: '2026-10-14',
    bp: '130/84 mmHg',
    pulse: '74 bpm',
    weight: '72 kg',
    temp: '98.4 °F',
    constitution: 'Phosphorus / Lycopodium diathesis',
    miasm: 'Psoric-Sycotic mixed dyscrasia',
    allergies: 'Dust mites, Strong perfumes, Penicillin',
    status: 'In Cabin',
    activeDiagnosis: 'Chronic Right Frontal Migraine & Non-Ulcer Dyspepsia',
    timeline: [
      {
        id: 'tl-1',
        date: '2026-09-02',
        type: 'registration',
        title: 'Initial Registration & Case Opening',
        description: 'Patient registered with chronic morning cephalalgia lasting 6 months. High work stress.',
        doctor: 'Dr. S. K. Sharma',
        status: 'Completed'
      },
      {
        id: 'tl-2',
        date: '2026-09-16',
        type: 'consultation',
        title: '1st Follow-up Consultation',
        description: 'Prescribed Belladonna 200C. Headaches reduced in frequency from daily to 3 times weekly.',
        doctor: 'Dr. S. K. Sharma',
        remedy: 'Belladonna 200C (Globules #40)',
        status: 'Completed'
      },
      {
        id: 'tl-3',
        date: '2026-10-01',
        type: 'report',
        title: 'Uploaded Lab Report: Complete Blood Count & Liver Profile',
        description: 'Hb: 14.2 g/dL, ESR: 18 mm/hr (mildly elevated), SGPT: 34 U/L. Overall within normal limits.',
        reportId: 'rep-cbc-01',
        status: 'Reviewed'
      },
      {
        id: 'tl-4',
        date: '2026-10-14',
        type: 'consultation',
        title: 'Previous Consultation (2nd Follow-up)',
        description: 'Complained of gastric fullness and flatulence after 4 PM. Shifted remedy to Lycopodium 200C.',
        doctor: 'Dr. S. K. Sharma',
        remedy: 'Lycopodium Clavatum 200C + Nux Vomica 30C night',
        status: 'Completed'
      },
      {
        id: 'tl-5',
        date: '2026-11-01',
        type: 'active-visit',
        title: 'Current Visit (Token #04)',
        description: 'Headache much milder, localized over right eye. Gastric flatulence 60% improved. Sleep restful.',
        doctor: 'Dr. S. K. Sharma',
        status: 'In Progress'
      }
    ],
    previousVisitObservations: {
      date: '2026-10-14',
      chiefComplaint: 'Throbbing headache 3-4 days a week with severe bloating between 4 PM to 8 PM.',
      location: 'Forehead and right temple radiating downwards to nape of neck.',
      modalities: 'Aggravated by warm room, noise, missing meals. Ameliorated by cold press & lying in dark.',
      mentals: 'Irritable, anxious about business, impatient with family.',
      thermals: 'Chilly patient, easily catches cold.',
      score: 'Baseline'
    },
    currentVisitObservations: {
      date: '2026-11-01',
      chiefComplaint: 'Headache only once in past 18 days! Mild right forehead heaviness when reading long hours.',
      location: 'Right frontal supraorbital ridge only, no radiation to neck.',
      modalities: 'Tolerates light much better. Gastric bloating significantly subsided.',
      mentals: 'Calm, patient, sleeping 7 hours without midnight waking.',
      thermals: 'Less chilly, comfortably tolerates ceiling fan.',
      score: 'Marked Improvement (+2)'
    },
    reports: [
      {
        id: 'rep-1',
        title: 'Complete Hemogram (CBC + ESR)',
        date: '2026-10-01',
        lab: 'Dr. Lal PathLabs, Delhi',
        type: 'pdf',
        findings: 'Hb: 14.2 g/dL | TLC: 7,400 /mcL | Platelets: 2.4 Lacs | ESR: 18 mm/hr (Mild elevation)',
        doctorNote: 'No leukocytosis. Mild ESR elevation consistent with chronic sinusitis/migraine diathesis.'
      },
      {
        id: 'rep-2',
        title: 'Cervical Spine Digital X-Ray (AP & Lat)',
        date: '2026-09-10',
        lab: 'Apex Diagnostic Centre, Civil Lines',
        type: 'image',
        findings: 'Mild C5-C6 disc space narrowing with mild osteophytic spurring. No canal stenosis.',
        doctorNote: 'Cervical component contributes to headache radiation. Advised posture ergonomics.'
      }
    ]
  },
  {
    id: 'HC-2026-0842',
    token: '05',
    name: 'Sunita Devi (सुनीता देवी)',
    age: 56,
    gender: 'Female',
    phone: '+91 94150 18239',
    email: 'sunita.devi56@example.com',
    address: '15/4 Rajendra Nagar, New Delhi',
    bloodGroup: 'O+',
    visitDate: '2026-11-01',
    previousVisitDate: '2026-10-18',
    bp: '138/88 mmHg',
    pulse: '78 bpm',
    weight: '64 kg',
    temp: '98.6 °F',
    constitution: 'Calcarea Carbonica / Pulsatilla type',
    miasm: 'Sycotic dyscrasia (Osteoarthritic diathesis)',
    allergies: 'Cold air drafts, Sour food/curd',
    status: 'Waiting in Lounge',
    activeDiagnosis: 'Bilateral Knee Osteoarthritis & Menopausal Flushing',
    timeline: [
      {
        id: 'tl-21',
        date: '2026-09-12',
        type: 'registration',
        title: 'First Consultation',
        description: 'Bilateral knee crepitus worse climbing stairs. Profuse head sweat during sleep.',
        doctor: 'Dr. S. K. Sharma',
        status: 'Completed'
      },
      {
        id: 'tl-22',
        date: '2026-10-18',
        type: 'consultation',
        title: 'Follow-up Consultation',
        description: 'Calcarea Carb 200C given. Knee stiffness reduced in morning. Head sweat subsided.',
        doctor: 'Dr. S. K. Sharma',
        remedy: 'Calcarea Carbonica 200C',
        status: 'Completed'
      }
    ],
    previousVisitObservations: {
      date: '2026-10-18',
      chiefComplaint: 'Bilateral knee stiffness worse upon waking and taking first few steps.',
      location: 'Medial joint line of both knees, left > right.',
      modalities: 'Aggravated by damp rainy cold weather and climbing stairs. Ameliorated by warm fomentation.',
      mentals: 'Apprehensive about health, gentle weeping disposition.',
      thermals: 'Chilly, cold clammy feet in bed.',
      score: 'Slight Improvement (+1)'
    },
    currentVisitObservations: {
      date: '2026-11-01',
      chiefComplaint: 'Walking much easier, can climb 1 flight of stairs without acute pain.',
      location: 'Medial knee, pain restricted to prolonged walking only.',
      modalities: 'Morning stiffness lasts only 10 minutes (was 45 minutes previously).',
      mentals: 'Cheerful, optimistic.',
      thermals: 'Feet warmer at night.',
      score: 'Significant Improvement (+2)'
    },
    reports: [
      {
        id: 'rep-21',
        title: 'Bilateral Knee X-Ray (Weight Bearing)',
        date: '2026-09-15',
        lab: 'Metro Imaging Centre',
        type: 'image',
        findings: 'Grade II Osteoarthritis with medial joint space narrowing and subchondral sclerosis.',
        doctorNote: 'Prescribed Calcarea Carb 200C + Rhus Tox 30C for articular stiffness.'
      }
    ]
  },
  {
    id: 'HC-2026-0843',
    token: '06',
    name: 'Aarav Mehta (आरव मेहता)',
    age: 12,
    gender: 'Male',
    phone: '+91 97123 99014',
    email: 'mehta.family@example.com',
    address: '702 Sunrise Apartments, Rohini, Delhi',
    bloodGroup: 'A+',
    visitDate: '2026-11-01',
    previousVisitDate: '2026-10-22',
    bp: '110/70 mmHg',
    pulse: '82 bpm',
    weight: '38 kg',
    temp: '98.2 °F',
    constitution: 'Pulsatilla nigricans / Tuberculinum',
    miasm: 'Tubercular diathesis (Recurrent respiratory catarrh)',
    allergies: 'Cold drinks, Ice cream, Seasonal pollen',
    status: 'Appointment Booked',
    activeDiagnosis: 'Allergic Rhinitis & Nocturnal Spasmodic Cough',
    timeline: [
      {
        id: 'tl-31',
        date: '2026-10-05',
        type: 'registration',
        title: 'Case Intake: Allergic Bronchitis',
        description: 'Frequent sneezing bursts of 20-30 in morning. Nocturnal dry cough.',
        doctor: 'Dr. S. K. Sharma',
        status: 'Completed'
      },
      {
        id: 'tl-32',
        date: '2026-10-22',
        type: 'consultation',
        title: '1st Follow-up',
        description: 'Pulsatilla 30C + Drosera 30C given. Night cough reduced by 50%.',
        doctor: 'Dr. S. K. Sharma',
        remedy: 'Pulsatilla 30C, Drosera 30C',
        status: 'Completed'
      }
    ],
    previousVisitObservations: {
      date: '2026-10-22',
      chiefComplaint: 'Continuous sneezing in morning and paroxysmal dry cough upon lying down.',
      location: 'Naso-pharynx, larynx, dry tickling behind sternum.',
      modalities: 'Aggravated inside warm stuffy room and lying flat. Ameliorated in fresh open air.',
      mentals: 'Affectionate child, craves attention and sympathy, weeps easily.',
      thermals: 'Warm-blooded, hates blankets, thirstless.',
      score: 'Moderate Improvement (+1)'
    },
    currentVisitObservations: {
      date: '2026-11-01',
      chiefComplaint: 'No night cough for past 10 days! Mild clear nasal discharge only.',
      location: 'Anterior nares only.',
      modalities: 'Can attend school without sneezing episodes.',
      mentals: 'Energetic, cheerful, good appetite.',
      thermals: 'Normal.',
      score: 'Marked Improvement (+3)'
    },
    reports: [
      {
        id: 'rep-31',
        title: 'Serum IgE Level & Absolute Eosinophil Count (AEC)',
        date: '2026-10-08',
        lab: 'SRL Diagnostics',
        type: 'pdf',
        findings: 'Total Serum IgE: 480 IU/mL (High) | AEC: 620 cells/mcL (Elevated).',
        doctorNote: 'Confirms allergic atopic diathesis. High susceptibility to environmental allergens.'
      }
    ]
  },
  {
    id: 'HC-2026-0844',
    token: '07',
    name: 'Meenakshi Iyer (मीनाक्षी अय्यर)',
    age: 41,
    gender: 'Female',
    phone: '+91 98112 34567',
    email: 'meenakshi.iyer@example.com',
    address: 'C-3 Hauz Khas, New Delhi',
    bloodGroup: 'AB+',
    visitDate: '2026-11-01',
    previousVisitDate: '2026-10-09',
    bp: '124/80 mmHg',
    pulse: '76 bpm',
    weight: '59 kg',
    temp: '98.5 °F',
    constitution: 'Sepia Officinalis / Natrum Muriaticum',
    miasm: 'Psoric-Sycotic dyscrasia',
    allergies: 'Strong spices, Damp basement air',
    status: 'Scheduled',
    activeDiagnosis: 'Hypothyroidism & Chronic Chloasma / Facial Pigmentation',
    timeline: [
      {
        id: 'tl-41',
        date: '2026-10-09',
        type: 'consultation',
        title: 'Initial Case Intake',
        description: 'Persistent lethargy, weight gain, dark chloasma across bridge of nose and cheeks.',
        doctor: 'Dr. S. K. Sharma',
        status: 'Completed'
      }
    ],
    previousVisitObservations: {
      date: '2026-10-09',
      chiefComplaint: 'Sensation of ball/bearing down in pelvis, extreme fatigue at 3 PM, facial pigmentation.',
      location: 'Saddle-like distribution across nose and cheeks.',
      modalities: 'Better by vigorous aerobic exercise, worse after washing clothes.',
      mentals: 'Indifferent to loved ones, irritable, loves dancing.',
      thermals: 'Chilly, lacks vital heat.',
      score: 'Baseline'
    },
    currentVisitObservations: {
      date: '2026-11-01',
      chiefComplaint: 'Energy levels much higher! Facial chloasma starting to fade at the edges.',
      location: 'Malar eminence.',
      modalities: 'Feeling active throughout the day, mood elevated.',
      mentals: 'Warm and affectionate, enthusiasm returned.',
      thermals: 'Tolerating cold air much better.',
      score: 'Moderate Improvement (+2)'
    },
    reports: [
      {
        id: 'rep-41',
        title: 'Thyroid Function Profile (Total T3, T4, Ultrasensitive TSH)',
        date: '2026-10-05',
        lab: 'Max Lab, Saket',
        type: 'pdf',
        findings: 'TSH: 7.82 uIU/mL (Elevated) | Free T4: 0.98 ng/dL | Free T3: 2.4 pg/mL.',
        doctorNote: 'Subclinical hypothyroidism with classic Sepia endocrine keynote indications.'
      }
    ]
  }
];

export const COMMON_HOMEOPATHIC_REMEDIES = [
  { name: 'Arnica Montana', keynotes: 'Bruised sore feeling, trauma, bed feels too hard, fears touch or approach' },
  { name: 'Belladonna', keynotes: 'Sudden violent onset, throbbing congestive headache, flushed red face, dilated pupils' },
  { name: 'Bryonia Alba', keynotes: 'Worse slightest motion, relieved by absolute rest, great thirst for large draughts cold water' },
  { name: 'Rhus Toxicodendron', keynotes: 'Articular restlessness, worse first motion, relieved by continued motion & warm applications' },
  { name: 'Pulsatilla Nigricans', keynotes: 'Changeable symptoms, mild weeping mood, better open fresh air, thirstless with dry mouth' },
  { name: 'Nux Vomica', keynotes: 'Oversensitive, irritable, sedentary life, gastric complaints, chilliness, spasmodic affections' },
  { name: 'Arsenicum Album', keynotes: 'Extreme prostration, burning pains relieved by heat, midnight aggravation (1-2 AM), restlessness' },
  { name: 'Lycopodium Clavatum', keynotes: 'Right-sided complaints, 4-8 PM aggravation, excessive flatulence, intellectual but irritable' },
  { name: 'Calcarea Carbonica', keynotes: 'Fair fat flabby, chilly, profuse sour head perspiration during sleep, cold damp feet' },
  { name: 'Sulphur', keynotes: 'Warm-blooded, burning soles at night in bed, hungry at 11 AM, stoop-shouldered, standing aggravates' },
  { name: 'Natrum Muriaticum', keynotes: 'Introverted, headache 10-11 AM from sun exposure, craving for salt, consolation aggravates' },
  { name: 'Silicea', keynotes: 'Lack of vital heat, offensive foot sweat, tendency to suppuration, lacks moral and physical grit' },
  { name: 'Gelsemium Sempervirens', keynotes: 'Complete dullness, dizziness, drowsiness, muscle trembling, headache starting from occiput' },
  { name: 'Hepar Sulphuris', keynotes: 'Hyper-sensitive to cold draft of air, splinter-like stinging pains, quick violent temper' },
  { name: 'Thuja Occidentalis', keynotes: 'Sycotic dyscrasia, warts, polypi, oily sweet perspiration, left-sided ovary/sinus complaints' },
  { name: 'Sepia Officinalis', keynotes: 'Bearing down sensation in pelvis, indifference to loved ones, chloasma on nose & cheeks' },
  { name: 'Ignatia Amara', keynotes: 'Acute grief, contradictory symptoms, sighing, lump in throat (globus hystericus)' },
  { name: 'Causticum', keynotes: 'Paralytic weakness, hoarseness, burns, sympathetic disposition, worse in dry cold weather' },
  { name: 'Phosphorus', keynotes: 'Tall slender, thirst for ice-cold drinks, burning in spots along spine, fear of thunderstorms' },
  { name: 'Lachesis Mutus', keynotes: 'Left-sided, cannot bear anything tight around neck, loquacious, worse after sleep' }
];

export const POTENCY_OPTIONS = [
  '6C',
  '30C',
  '200C',
  '1M',
  '10M',
  '50M',
  'LM1 (0/1)',
  'LM2 (0/2)',
  'LM3 (0/3)',
  'Mother Tincture (Q)',
  '3X Trituration',
  '6X Trituration',
  '12X Trituration'
];

export const VEHICLE_OPTIONS = [
  'Globules #20 (Sugar Pills)',
  'Globules #30 (Standard Pills)',
  'Globules #40 (Large Pills)',
  'Drops in 1/2 Cup Water',
  'Trituration Tablets',
  'Liquid Dilution in Alcohol',
  'Saccharum Lactis (Powder)'
];

export const CLINIC_PRECAUTIONS = [
  'Avoid raw onion, garlic & hing 30 mins before/after medicine',
  'Do not consume black coffee or camphor-scented items',
  'Do not touch globules with bare hands (use bottle cap)',
  'Dissolve globules dry on clean tongue',
  'Maintain 30-minute interval with allopathic medicines',
  'Store medicine bottles away from direct sunlight & mobile phones'
];

export const DISPENSARY_QUEUE_DATA = [
  {
    id: 'DSP-101',
    token: '01',
    patientName: 'Kavita Sundaram',
    patientId: 'HC-2026-0838',
    remedies: 'Pulsatilla 200C (Globules #40) + Kali Bich 30C',
    orderedAt: '10:45 AM',
    status: 'Dispensed',
    timing: 'Morning 4 globules, Night 4 globules'
  },
  {
    id: 'DSP-102',
    token: '02',
    patientName: 'Harish Chandra',
    patientId: 'HC-2026-0839',
    remedies: 'Rhus Tox 1M (Globules #30) + Bryonia 30C',
    orderedAt: '11:15 AM',
    status: 'Ready',
    timing: '3 times daily after meals'
  },
  {
    id: 'DSP-103',
    token: '03',
    patientName: 'Neelam Saxena',
    patientId: 'HC-2026-0840',
    remedies: 'Ignatia Amara 200C (Weekly 1 dose) + Passiflora Q',
    orderedAt: '11:50 AM',
    status: 'Preparing',
    timing: '10 drops Q at bedtime in warm water'
  },
  {
    id: 'DSP-104',
    token: '04',
    patientName: 'Rajesh Verma',
    patientId: 'HC-2026-0841',
    remedies: 'Belladonna 200C + Nux Vomica 30C',
    orderedAt: '12:30 PM',
    status: 'Pending',
    timing: 'Morning 4 globules & Night 4 globules'
  }
];

export const UPCOMING_FOLLOWUPS = [
  {
    id: 'FU-1',
    patientName: 'Rajesh Verma',
    patientId: 'HC-2026-0841',
    scheduledDate: '2026-11-15',
    daysRemaining: 14,
    phone: '+91 98230 44120',
    chiefComplaint: 'Right Frontal Migraine',
    status: 'Confirmed'
  },
  {
    id: 'FU-2',
    patientName: 'Sunita Devi',
    patientId: 'HC-2026-0842',
    scheduledDate: '2026-11-18',
    daysRemaining: 17,
    phone: '+91 94150 18239',
    chiefComplaint: 'Bilateral Knee Osteoarthritis',
    status: 'Pending Call'
  },
  {
    id: 'FU-3',
    patientName: 'Vikramaditya Rao',
    patientId: 'HC-2026-0835',
    scheduledDate: '2026-10-25',
    daysRemaining: -7, // overdue!
    phone: '+91 98100 23451',
    chiefComplaint: 'Eczematous Dermatitis',
    status: 'Overdue (7 Days)'
  },
  {
    id: 'FU-4',
    patientName: 'Ananya Deshmukh',
    patientId: 'HC-2026-0836',
    scheduledDate: '2026-10-28',
    daysRemaining: -4, // overdue!
    phone: '+91 99220 88712',
    chiefComplaint: 'Chronic Sinusitis & Anosmia',
    status: 'Overdue (4 Days)'
  }
];

export const DICTATION_TEST_PRESETS = [
  {
    id: 'test-1-hindi',
    title: 'Test 1: Chief Complaint (Hindi)',
    lang: 'hi-IN',
    fieldId: 'chiefComplaints',
    text: 'मरीज को पिछले तीन हफ़्तों से सुबह उठते समय तेज सिरदर्द रहता है। दर्द मुख्य रूप से माथे के दाहिने हिस्से में होता है और रोशनी या धूप में जाने पर बहुत बढ़ जाता है।'
  },
  {
    id: 'test-2-english',
    title: 'Test 2: Symptom (English)',
    lang: 'en-IN',
    fieldId: 'locationSensation',
    text: 'Sharp shooting and throbbing pain localized in the right frontal and supraorbital ridge, radiating back to the occiput. Relieved by cold application and hard pressure in a dark room.'
  },
  {
    id: 'test-3-hinglish',
    title: 'Test 3: Chief Complaint (Hinglish)',
    lang: 'en-IN',
    fieldId: 'chiefComplaints',
    text: 'Patient ko subah uthte samay headache hota hai. Dard forehead area mein hai aur light se problem hoti hai.'
  },
  {
    id: 'test-4-dosage',
    title: 'Test 4: Dosage Instructions',
    lang: 'hi-IN',
    fieldId: 'morningDosage',
    text: 'Subah aur shaam paanch globules khane ke baad lena hai.'
  },
  {
    id: 'test-mental-hindi',
    title: 'Mental Generals (Hindi/Hinglish)',
    lang: 'hi-IN',
    fieldId: 'mentalGenerals',
    text: 'चिड़चिड़ापन बहुत अधिक है। छोटी-छोटी बातों पर गुस्सा आ जाता है। काम का भारी तनाव रहता है और रात को 2 बजे से 4 बजे के बीच नींद खुल जाती है।'
  },
  {
    id: 'test-thermal',
    title: 'Thermal Generals',
    lang: 'en-IN',
    fieldId: 'thermalGenerals',
    text: 'Extremely chilly patient. Cannot tolerate fan or AC draft. Wants warm drinks and wrapped in blankets even in mild weather.'
  }
];
