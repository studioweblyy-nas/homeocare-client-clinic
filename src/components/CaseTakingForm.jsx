import React, { useState } from 'react';
import VoiceMicButton from './VoiceMicButton';
import { 
  Activity, 
  MapPin, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Apple, 
  Thermometer, 
  FileText, 
  Eye, 
  BookOpen, 
  Trash2,
  Sparkles,
  Filter
} from 'lucide-react';

export const CASE_FIELDS = [
  {
    id: 'chiefComplaints',
    category: 'primary',
    label: 'Chief Complaints',
    hindiLabel: 'मुख्य शिकायतें',
    icon: Activity,
    placeholder: 'Dictate chief complaints e.g. "Patient ko subah uthte samay headache hota hai..."',
    hint: 'Primary ailment, onset, nature of pain in patient\'s own words',
    sample: 'Patient ko subah uthte samay headache hota hai. Dard forehead area mein hai aur light se problem hoti hai.'
  },
  {
    id: 'locationSensation',
    category: 'primary',
    label: 'Location & Sensation',
    hindiLabel: 'स्थान एवं अनुभूति',
    icon: MapPin,
    placeholder: 'e.g. Throbbing in right temple, stitching sensation in chest...',
    hint: 'Exact site, direction of radiation, type of pain',
    sample: 'Sharp shooting pain in right temple extending to occiput and back of neck.'
  },
  {
    id: 'durationFrequency',
    category: 'primary',
    label: 'Duration & Frequency',
    hindiLabel: 'अवधि एवं आवृत्ति',
    icon: Clock,
    placeholder: 'e.g. Episodes occurring every morning for past 3 weeks...',
    hint: 'Periodicity, duration of episodes, times of day',
    sample: 'Past 3 weeks, daily from 8 AM to 11 AM.'
  },
  {
    id: 'aggravatingFactors',
    category: 'primary',
    label: 'Aggravating Factors (<)',
    hindiLabel: 'तकलीफ बढ़ाने वाले कारक (< Modalities)',
    icon: TrendingUp,
    placeholder: 'e.g. Worse in bright sunlight, warmth, motion, noise...',
    hint: 'Factors that worsen symptoms: temperature, weather, food, time',
    sample: 'Worse from bright sun, noise, moving head and skipping meals.'
  },
  {
    id: 'amelioratingFactors',
    category: 'primary',
    label: 'Ameliorating Factors (>)',
    hindiLabel: 'आराम देने वाले कारक (> Modalities)',
    icon: TrendingDown,
    placeholder: 'e.g. Better by hard pressure, dark quiet room, cold compress...',
    hint: 'Factors that relieve distress: rest, pressure, warmth, open air',
    sample: 'Relieved by tight bandage around forehead, resting in pitch-dark room.'
  },
  {
    id: 'mentalGenerals',
    category: 'generals',
    label: 'Mental Generals',
    hindiLabel: 'मानसिक लक्षण',
    icon: Brain,
    placeholder: 'e.g. Irritable, anxious about health, hurried disposition...',
    hint: 'Emotional state, intellect, fears, temperamental disposition',
    sample: 'Very irritable when interrupted, anxious about business affairs, hurried.'
  },
  {
    id: 'physicalGenerals',
    category: 'generals',
    label: 'Physical Generals',
    hindiLabel: 'शारीरिक लक्षण',
    icon: Apple,
    placeholder: 'e.g. Appetite good, thirst for large quantities of cold water...',
    hint: 'Appetite, thirst, desires/aversions, perspiration, sleep habits',
    sample: 'Thirst for large gulps of ice cold water. Craves spicy sour food. Profuse head sweat.'
  },
  {
    id: 'thermalGenerals',
    category: 'generals',
    label: 'Thermal Generals',
    hindiLabel: 'तापीय प्रकृति',
    icon: Thermometer,
    placeholder: 'e.g. Chilly patient, easily catches cold, cannot tolerate AC...',
    hint: 'Reaction to heat, cold, seasons (Chilly / Hot / Ambithermal)',
    sample: 'Distinctly Chilly patient. Sensitive to drafts of air and cold weather.'
  },
  {
    id: 'medicalHistory',
    category: 'generals',
    label: 'Medical & Family History',
    hindiLabel: 'चिकित्सीय एवं पारिवारिक इतिहास',
    icon: FileText,
    placeholder: 'e.g. History of allergic rhinitis, family history of hypertension...',
    hint: 'Past major illnesses, surgeries, suppressed eruptions, miasms',
    sample: 'History of allergic rhinitis since childhood. Maternal grandmother had migraine.'
  },
  {
    id: 'doctorObservations',
    category: 'synthesis',
    label: 'Doctor\'s Observations',
    hindiLabel: 'चिकित्सक का प्रेक्षण',
    icon: Eye,
    placeholder: 'e.g. Flushed red face, dry coated white tongue, restless posture...',
    hint: 'Objective clinical findings observed during consultation',
    sample: 'Flushed face, pupils slightly dilated, white fur on posterior tongue, BP 130/84.'
  },
  {
    id: 'caseSummary',
    category: 'synthesis',
    label: 'Case Summary & Synthesis',
    hindiLabel: 'केस सारांश',
    icon: BookOpen,
    placeholder: 'e.g. Acute exacerbation of migraine, Belladonna / Bryonia rubrics...',
    hint: 'Totality of symptoms, repertorial rubric synthesis, miasmatic assessment',
    sample: 'Right-sided congestive migraine with Belladonna / Bryonia rubric indications.'
  }
];

export default function CaseTakingForm({
  caseData,
  onChangeField,
  onClearField,
  recordingFieldId,
  onStartVoice,
  onStopVoice,
  onQuickSimulateText
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'primary' | 'generals' | 'synthesis'

  const filteredFields = activeFilter === 'all' 
    ? CASE_FIELDS 
    : CASE_FIELDS.filter(f => f.category === activeFilter);

  return (
    <div className="space-y-4">
      {/* Sleek, Uncluttered Section Header with Clean Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Case-Taking Rubrics
          </h2>
          <p className="text-xs text-slate-500">
            Tap the microphone next to any rubric to dictate symptoms in Hindi, English, or Hinglish.
          </p>
        </div>

        {/* Clean, Light Category Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'all' 
                ? 'bg-white text-slate-800 shadow-2xs font-semibold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All (11)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('primary')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'primary' 
                ? 'bg-white text-slate-800 shadow-2xs font-semibold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Complaints & Modalities
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('generals')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'generals' 
                ? 'bg-white text-slate-800 shadow-2xs font-semibold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Generals & History
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('synthesis')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === 'synthesis' 
                ? 'bg-white text-slate-800 shadow-2xs font-semibold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Observations
          </button>
        </div>
      </div>

      {/* Grid of Clean, Modern Case Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFields.map((field) => {
          const Icon = field.icon;
          const isThisRecording = recordingFieldId === field.id;
          const fieldValue = caseData[field.id] || '';

          return (
            <div
              key={field.id}
              className={`bg-white rounded-xl border transition-all shadow-xs p-4 flex flex-col justify-between ${
                isThisRecording
                  ? 'border-rose-400 ring-2 ring-rose-100'
                  : fieldValue
                  ? 'border-slate-300/80 hover:border-slate-400'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Field Header */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isThisRecording
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                      <span>{field.label}</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-devanagari leading-none">
                      {field.hindiLabel}
                    </p>
                  </div>
                </div>

                {/* Mic and Action Controls */}
                <div className="flex items-center gap-1.5">
                  <VoiceMicButton
                    isRecording={isThisRecording}
                    onClick={() => onStartVoice(field.id, field.label)}
                    onStop={onStopVoice}
                    label="Speak"
                    stopLabel="Stop"
                  />
                  {fieldValue && !isThisRecording && (
                    <button
                      type="button"
                      onClick={() => onClearField(field.id)}
                      title="Clear field"
                      className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      aria-label={`Clear ${field.label}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Text Area */}
              <div className="relative flex-1">
                <textarea
                  id={`field-${field.id}`}
                  rows={3}
                  value={fieldValue}
                  onChange={(e) => onChangeField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full p-3 rounded-lg text-slate-800 text-sm leading-relaxed resize-y border transition-colors ${
                    isThisRecording
                      ? 'border-rose-300 bg-rose-50/20 focus:ring-rose-300'
                      : 'border-slate-200 bg-slate-50/30 hover:bg-white focus:bg-white focus:border-med-500'
                  }`}
                />
              </div>

              {/* Footer */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate mr-2 italic">{field.hint}</span>
                <button
                  type="button"
                  onClick={() => onQuickSimulateText(field.id, field.sample)}
                  className="text-med-600 hover:text-med-800 font-medium whitespace-nowrap hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-med-500" />
                  <span>Sample</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
