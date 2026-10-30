import React from 'react';
import { 
  User, 
  Heart, 
  Phone, 
  Activity, 
  Save, 
  FileCheck2, 
  Check, 
  FileSignature, 
  Pill, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { SAMPLE_PATIENTS } from '../data/homeopathicData';

export default function PatientHeader({
  selectedPatient,
  onSelectPatient,
  activeTab,
  onTabChange,
  onSaveConsultation,
  isSaved,
  onOpenReviewModal
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
      {/* Top Bar - Clean and Light */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-med-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
            H
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-sm">HOMEOCARE</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 hidden sm:inline">Clinical Voice Suite</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-600 font-medium">Dr. S. K. Sharma (B.H.M.S., M.D.)</span>
          <span className="text-slate-300 hidden md:inline">•</span>
          <span className="text-slate-400 hidden md:inline">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>

      {/* Main Header - Patient Information Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Patient Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
              <User className="w-5 h-5 text-med-600" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPatient.id}
                  onChange={(e) => {
                    const found = SAMPLE_PATIENTS.find(p => p.id === e.target.value);
                    if (found) onSelectPatient(found);
                  }}
                  className="font-bold text-slate-900 text-base bg-transparent border-0 focus:ring-0 cursor-pointer hover:text-med-600 transition-colors py-0 pl-0 pr-6"
                >
                  {SAMPLE_PATIENTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200">
                  {selectedPatient.gender}, {selectedPatient.age}y
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                <span className="font-mono text-slate-600">ID: {selectedPatient.id}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" />
                  BP: <strong className="text-slate-700 font-semibold">{selectedPatient.bp}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-med-500" />
                  Wt: <strong className="text-slate-700 font-semibold">{selectedPatient.weight}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              type="button"
              onClick={onSaveConsultation}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-slate-500" />
                  <span>Save Record</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenReviewModal}
              className="bg-med-600 hover:bg-med-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Review & Print</span>
            </button>
          </div>
        </div>

        {/* Minimal Navigation Tabs */}
        <div className="flex items-center gap-1 mt-3 border-t border-slate-100 pt-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => onTabChange('case-taking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'case-taking'
                ? 'bg-med-50 text-med-700 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case-Taking Rubrics</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('prescription')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'prescription'
                ? 'bg-med-50 text-med-700 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescription & Dosage</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('handwriting')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'handwriting'
                ? 'bg-med-50 text-med-700 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <FileSignature className="w-3.5 h-3.5" />
            <span>Handwriting Pad</span>
          </button>
        </div>
      </div>
    </header>
  );
}
