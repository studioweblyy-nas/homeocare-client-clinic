import React from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  QrCode, 
  FileSignature, 
  Pill, 
  AlertCircle,
  FileText,
  Activity,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { SAMPLE_PATIENTS } from '../data/homeopathicData';

export default function SmartDoctorCabinHeader({
  selectedPatient,
  onSelectPatient,
  onNextPatient,
  activeTab,
  onTabChange,
  onOpenQRModal,
  onOpenSignatureModal,
  onOpenDispensaryModal,
  onOpenFollowUpModal,
  doctorSignature
}) {
  return (
    <header className="bg-white border-b border-slate-200/90 shadow-2xs sticky top-0 z-40 no-print">
      
      {/* 1. Global Clinic Top Ribbon */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between text-xs border-b border-slate-800">
        
        {/* Brand & Practitioner */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
              H
            </span>
            <span className="font-extrabold tracking-tight text-white text-sm">
              HOMEOCARE
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            Dr. S. K. Sharma (B.H.M.S., M.D.) • Doctor Cabin
          </span>
        </div>

        {/* Quick Modal Triggers */}
        <div className="flex items-center gap-2 text-xs">
          {/* Dispensary Queue Button */}
          <button
            type="button"
            onClick={onOpenDispensaryModal}
            className="text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Open Pharmacy / Dispensary Live Queue"
          >
            <span>💊</span>
            <span className="hidden md:inline">Dispensary</span>
            <span className="bg-teal-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              4 Live
            </span>
          </button>

          {/* Follow-up Dashboard */}
          <button
            type="button"
            onClick={onOpenFollowUpModal}
            className="text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Follow-up and Appointment Tracker"
          >
            <span>📅</span>
            <span className="hidden md:inline">Follow-ups</span>
          </button>

          {/* Doctor Signature */}
          <button
            type="button"
            onClick={onOpenSignatureModal}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              doctorSignature
                ? 'bg-teal-900/60 text-teal-300 border border-teal-700/60'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Manage Digital Signature"
          >
            <FileSignature className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {doctorSignature ? 'Signature Saved' : 'Set Signature'}
            </span>
          </button>
        </div>

      </div>

      {/* 2. Compact Doctor Cabin Patient Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Patient Vitals & Identification Ribbon */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Token Badge */}
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border-2 border-teal-300 flex flex-col items-center justify-center font-black text-teal-900 flex-shrink-0 shadow-2xs">
              <span className="text-[9px] uppercase font-bold text-teal-700 tracking-wider">TOKEN</span>
              <span className="text-lg leading-none">#{selectedPatient.token || '04'}</span>
            </div>

            {/* Patient Name & Selector */}
            <div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPatient.id}
                  onChange={(e) => {
                    const found = SAMPLE_PATIENTS.find(p => p.id === e.target.value);
                    if (found) onSelectPatient(found);
                  }}
                  className="font-extrabold text-slate-900 text-lg bg-transparent border-0 focus:ring-0 cursor-pointer hover:text-teal-800 transition-colors py-0 pl-0 pr-6"
                >
                  {SAMPLE_PATIENTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Token #{p.token})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={onOpenQRModal}
                  className="p-1 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                  title="View Patient QR Profile"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>

              {/* Compact Patient Metrics: UID, Age, Gender, Contact */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-0.5">
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.2 rounded border border-teal-200">
                  UID: {selectedPatient.id}
                </span>
                <span>•</span>
                <span className="font-semibold text-slate-700">
                  {selectedPatient.age} Yrs / {selectedPatient.gender}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{selectedPatient.phone}</span>
                </span>
              </div>
            </div>

            {/* Visit Dates: Current & Previous */}
            <div className="hidden xl:flex items-center gap-3 pl-4 border-l border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Visit</span>
                <span className="font-bold text-slate-800">{selectedPatient.visitDate}</span>
              </div>
              <span className="text-slate-300">➔</span>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Previous Visit</span>
                <span className="font-semibold text-slate-600">{selectedPatient.previousVisitDate}</span>
              </div>
            </div>

          </div>

          {/* Prominent NEXT PATIENT Button */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              type="button"
              onClick={onNextPatient}
              className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-5 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 group"
            >
              <span>NEXT PATIENT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* 3. Primary Doctor Cabin Navigation Tabs */}
        <div className="flex items-center gap-1 mt-3 border-t border-slate-100 pt-2 overflow-x-auto scrollbar-none">
          
          {/* Tab 1: Overview */}
          <button
            type="button"
            onClick={() => onTabChange('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>📋</span>
            <span>Overview</span>
          </button>

          {/* Tab 2: Case Taking (Handwriting & Voice) */}
          <button
            type="button"
            onClick={() => onTabChange('case-taking')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'case-taking'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>✍️</span>
            <span>Case Taking & Writing Pad</span>
          </button>

          {/* Tab 3: Previous Reports */}
          <button
            type="button"
            onClick={() => onTabChange('reports')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>📑</span>
            <span>Previous Reports ({selectedPatient.reports?.length || 0})</span>
          </button>

          {/* Tab 4: Prescription */}
          <button
            type="button"
            onClick={() => onTabChange('prescription')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'prescription'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>💊</span>
            <span>Prescription</span>
          </button>

          {/* Tab 5: Patient Timeline */}
          <button
            type="button"
            onClick={() => onTabChange('timeline')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>⚖️</span>
            <span>Patient Timeline & Comparison</span>
          </button>

        </div>

      </div>

    </header>
  );
}
