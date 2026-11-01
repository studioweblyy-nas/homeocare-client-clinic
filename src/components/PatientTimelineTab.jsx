import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Pill, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Check,
  Save,
  Sparkles
} from 'lucide-react';

export default function PatientTimelineTab({ patient }) {
  const [improvementScore, setImprovementScore] = useState(
    patient?.currentVisitObservations?.score || 'Marked Improvement (+2)'
  );
  const [evaluationNote, setEvaluationNote] = useState(
    'Favorable constitutional response. Headaches reduced by 75%. Gastric symptoms alleviated. Prescribe Placebo (Sacch. Lactis) to allow previous dose to complete action.'
  );
  const [isSaved, setIsSaved] = useState(false);

  if (!patient) return null;

  const timelineItems = patient.timeline || [];
  const prevObs = patient.previousVisitObservations;
  const currObs = patient.currentVisitObservations;

  const handleSaveEvaluation = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const scoreOptions = [
    { value: 'Marked Improvement (+3)', label: 'Marked Improvement (+3)', color: 'bg-emerald-600 text-white' },
    { value: 'Moderate Improvement (+2)', label: 'Moderate Improvement (+2)', color: 'bg-teal-600 text-white' },
    { value: 'Slight Improvement (+1)', label: 'Slight Improvement (+1)', color: 'bg-blue-600 text-white' },
    { value: 'Status Quo (0)', label: 'Status Quo / Unchanged (0)', color: 'bg-slate-600 text-white' },
    { value: 'Aggravation (-1 to -3)', label: 'Aggravation (-1 to -3)', color: 'bg-rose-600 text-white' }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. BEFORE & AFTER VISIT COMPARISON SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                ⚖️
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Before & After Visit Symptom Comparison
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side comparative evaluation of symptom progression & remedy response
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Trajectory:</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              {improvementScore}
            </span>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Previous Visit (Before) */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Previous Visit ({prevObs?.date || 'Last Consultation'})</span>
              </span>
              <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Baseline Reference
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">Chief Complaint:</span>
                <p className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-medium">
                  {prevObs?.chiefComplaint || 'Severe throbbing migraine 3-4 days/week with severe gastric flatulence.'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">Modalities (&lt; / &gt;):</span>
                <p className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                  {prevObs?.modalities || 'Worse in warm room, noise, skipping lunch. Better cold compress.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-500 block">Mentals:</span>
                  <span className="text-slate-800">{prevObs?.mentals || 'Irritable, anxious, hurried'}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-500 block">Thermals:</span>
                  <span className="text-slate-800">{prevObs?.thermals || 'Distinctly chilly'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Visit (After / Today) */}
          <div className="bg-teal-50/40 rounded-2xl p-4 border border-teal-200 space-y-3">
            <div className="flex items-center justify-between border-b border-teal-200 pb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                <span>Current Visit ({currObs?.date || 'Today, 01 Nov 2026'})</span>
              </span>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-300">
                Active Assessment
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-teal-800 block mb-0.5">Reported Symptoms Today:</span>
                <p className="bg-white p-2.5 rounded-xl border border-teal-200 text-slate-900 leading-relaxed font-medium">
                  {currObs?.chiefComplaint || 'Headache occurred only once in past 18 days! Mild right forehead heaviness only.'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-teal-800 block mb-0.5">Observed Modalities:</span>
                <p className="bg-white p-2.5 rounded-xl border border-teal-200 text-slate-700 leading-relaxed">
                  {currObs?.modalities || 'Light tolerance improved. Gastric flatulence 60% relieved.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-teal-200">
                  <span className="font-bold text-teal-800 block">Mentals:</span>
                  <span className="text-slate-800">{currObs?.mentals || 'Calm, patient, 7 hrs sleep'}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-teal-200">
                  <span className="font-bold text-teal-800 block">Thermals:</span>
                  <span className="text-slate-800">{currObs?.thermals || 'Less chilly, tolerates draft'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Doctor Clinical Improvement Scoring Control */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-800">
              Manual Clinical Outcome Scoring (Hahnemannian Second Prescription):
            </span>
            <span className="text-[11px] text-slate-500">Select trajectory rating:</span>
          </div>

          {/* Rating Chips */}
          <div className="flex flex-wrap gap-1.5">
            {scoreOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setImprovementScore(opt.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  improvementScore === opt.value
                    ? `${opt.color} shadow-xs scale-102`
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Doctor Evaluation Note */}
          <div className="pt-2">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Doctor's Evaluation & Posology Note:
            </label>
            <textarea
              rows={2}
              value={evaluationNote}
              onChange={(e) => setEvaluationNote(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleSaveEvaluation}
              className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Evaluation Stored' : 'Save Evaluation'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. VISUAL CHRONOLOGICAL TIMELINE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Patient Chronological Timeline
              </h3>
              <p className="text-xs text-slate-500">
                Registration, consultations, lab investigations & prescribed remedies
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {timelineItems.length} Milestone Events
          </span>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timelineItems.map((item, idx) => {
            const isLatest = idx === timelineItems.length - 1;
            const isConsultation = item.type === 'consultation' || item.type === 'active-visit';

            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline Icon Marker */}
                <div className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] ${
                  isLatest
                    ? 'bg-teal-600 border-teal-300 text-white ring-4 ring-teal-100'
                    : isConsultation
                    ? 'bg-white border-teal-600 text-teal-700'
                    : item.type === 'report'
                    ? 'bg-white border-blue-600 text-blue-700'
                    : 'bg-white border-slate-400 text-slate-600'
                }`}>
                  {isLatest ? '★' : isConsultation ? '🩺' : item.type === 'report' ? '📄' : '📝'}
                </div>

                {/* Event Card */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  isLatest
                    ? 'bg-teal-50/50 border-teal-200 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span>{item.title}</span>
                      {isLatest && (
                        <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.2 rounded-full">
                          Current
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Remedy Tag if available */}
                  {item.remedy && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <Pill className="w-3.5 h-3.5 text-teal-700" />
                      <span className="font-semibold text-slate-500">Prescription:</span>
                      <span className="font-bold text-teal-900 bg-teal-100/70 px-2 py-0.5 rounded-md border border-teal-200 text-[11px]">
                        {item.remedy}
                      </span>
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Practitioner: {item.doctor || 'Dr. S. K. Sharma'}</span>
                    <span className="font-medium text-emerald-700">{item.status}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
