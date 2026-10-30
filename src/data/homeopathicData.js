/**
 * HOMEOCARE - Homeopathic Master Catalog and Sample Patient Data
 */

export const SAMPLE_PATIENTS = [
  {
    id: 'HC-2026-0841',
    name: 'Rajesh Verma (राजेश वर्मा)',
    age: 48,
    gender: 'Male',
    phone: '+91 98230 44120',
    visitDate: '2026-10-30',
    bp: '130/84 mmHg',
    pulse: '74 bpm',
    weight: '72 kg',
    constitution: 'Phosphorus / Lycopodium diathesis',
    status: 'In Consultation',
  },
  {
    id: 'HC-2026-0842',
    name: 'Sunita Devi (सुनीता देवी)',
    age: 56,
    gender: 'Female',
    phone: '+91 94150 18239',
    visitDate: '2026-10-30',
    bp: '138/88 mmHg',
    pulse: '78 bpm',
    weight: '64 kg',
    constitution: 'Calcarea Carbonica type',
    status: 'Waiting',
  },
  {
    id: 'HC-2026-0843',
    name: 'Aarav Mehta (आरव मेहता)',
    age: 12,
    gender: 'Male',
    phone: '+91 97123 99014',
    visitDate: '2026-10-29',
    bp: '110/70 mmHg',
    pulse: '82 bpm',
    weight: '38 kg',
    constitution: 'Pulsatilla nigricans',
    status: 'Follow-up Due',
  }
];

export const COMMON_HOMEOPATHIC_REMEDIES = [
  { name: 'Arnica Montana', keynotes: 'Bruised sore feeling, trauma, fear of touch, bed feels hard' },
  { name: 'Belladonna', keynotes: 'Sudden violent onset, throbbing headache, redness, heat, dilated pupils' },
  { name: 'Bryonia Alba', keynotes: 'Worse motion, relieved by absolute rest, great thirst for large quantities' },
  { name: 'Rhus Toxicodendron', keynotes: 'Restlessness, worse beginning motion, better continued motion and warm applications' },
  { name: 'Pulsatilla Nigricans', keynotes: 'Changeable symptoms, weeping mood, better open air, thirstless' },
  { name: 'Nux Vomica', keynotes: 'Irritable, sedentary life, gastric complaints, chilliness, oversensitive' },
  { name: 'Arsenicum Album', keynotes: 'Prostration, burning pains better heat, midnight aggravation, anxiety' },
  { name: 'Lycopodium Clavatum', keynotes: 'Right-sided complaints, 4-8 PM aggravation, bloating, intellectual' },
  { name: 'Calcarea Carbonica', keynotes: 'Fair fat flabby, chilly, head perspiration during sleep, sour odors' },
  { name: 'Sulphur', keynotes: 'Warm blooded, burning soles at night, untidy, 11 AM hunger, standing worse' },
  { name: 'Natrum Muriaticum', keynotes: 'Introverted, headache 10-11 AM from sun, salt craving, consolation aggravates' },
  { name: 'Silicea', keynotes: 'Lack of vital heat, offensive foot sweat, suppuration, grit lack' },
  { name: 'Gelsemium Sempervirens', keynotes: 'Dullness, dizziness, drowsiness, trembling, thirstless' },
  { name: 'Hepar Sulphuris', keynotes: 'Hyper-sensitive to cold draft, splinter-like pain, irritable' },
  { name: 'Thuja Occidentalis', keynotes: 'Sycotic dyscrasia, warts, oily skin, left-sided symptoms' }
];

export const POTENCY_OPTIONS = [
  'Mother Tincture (Q)',
  '30C',
  '200C',
  '1M',
  '10M',
  '50M',
  '0/1 (LM 1)',
  '0/3 (LM 3)',
  '3X Trituration',
  '6X Trituration',
  '12X'
];

export const DOSAGE_FORMS = [
  'Globules / Pills (No. 30 / 40)',
  'Liquid Dilution in Water',
  'Trituration Tablets',
  'Mother Tincture Drops in 1/2 cup warm water',
  'Sugar of Milk Powders (Sacch. Lactis)'
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
