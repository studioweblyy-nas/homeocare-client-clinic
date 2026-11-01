import React from 'react';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  ShieldAlert, 
  Calendar, 
  FileText, 
  Clock, 
  ChevronRight, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Pill,
  BookOpen
} from 'lucide-react';

export default function DoctorOverviewTab({
  patient,
  onNavigateTab,
  onOpenReportViewer,
  onOpenQRModal
}) {
  if (!patient) return null;

  return (
    <div className="space-y-5">
      {/* Top Vitals Card Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        
        {/* BP */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Blood Pressure</span>
            <span className="font-black text-slate-900 text-base">{patient.bp}</span>
          </div>
        </div>

        {/* Pulse */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Pulse Rate</span>
            <span className="font-black text-slate-900 text-base">{patient.pulse}</span>
          </div>
        </div>

        {/* Weight */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-black">kg</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Body Weight</span>
            <span className="font-black text-slate-900 text-base">{patient.weight}</span>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Body Temp</span>
            <span className="font-black text-slate-900 text-base">{patient.temp || '98.4 °F'}</span>
          </div>
        </div>

        {/* Blood Group & Token */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
            {patient.bloodGroup || 'B+'}
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Token / Queue</span>
            <span className="font-black text-slate-900 text-base">Token #{patient.token || '04'}</span>
          </div>
        </div>

      </div>

      {/* Main 2-Column Overview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Diagnosis & Homeopathic Constitution (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Clinical Diagnosis Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Clinical Condition
              </span>
              <span className="text-xs bg-teal-50 text-teal-800 font-semibold px-2.5 py-0.5 rounded-full border border-teal-200">
                Chronic Case
              </span>
            </div>

            <h3 className="font-extrabold text-slate-900 text-lg">
              {patient.activeDiagnosis}
            </h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-500 block mb-0.5">Homeopathic Diathesis:</span>
                <span className="text-slate-800 font-semibold">{patient.constitution}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-500 block mb-0.5">Miasmatic Cleavage:</span>
                <span className="text-slate-800 font-semibold">{patient.miasm || 'Psoric Predominance'}</span>
              </div>
            </div>

            {/* Allergies / Precautions Alert */}
            {patient.allergies && (
              <div className="mt-3 p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Hypersensitivities & Clinical Alerts:</strong>{' '}
                  <span>{patient.allergies}</span>
                </div>
              </div>
            )}
          </div>

          {/* Previous Consultation Summary */}
          {patient.previousVisitObservations && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-bold text-slate-800">
                    Previous Consultation Snapshot ({patient.previousVisitObservations.date})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('timeline')}
                  className="text-teal-700 hover:text-teal-900 text-xs font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Compare Timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-600 block mb-0.5">Reported Symptoms:</span>
                  <p className="p-2.5 bg-slate-50 rounded-lg text-slate-800 border border-slate-200/70 leading-relaxed">
                    {patient.previousVisitObservations.chiefComplaint}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/60">
                    <strong>Modalities:</strong> {patient.previousVisitObservations.modalities}
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/60">
                    <strong>Thermals:</strong> {patient.previousVisitObservations.thermals}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Quick Doctor Actions & Uploaded Reports (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Doctor Cabin Actions */}
          <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-5 shadow-md">
            <h4 className="font-bold text-sm text-teal-300 uppercase tracking-wider mb-1">
              Doctor Consultation Flow
            </h4>
            <p className="text-xs text-slate-300 mb-4">
              Elder-friendly input: write with digital stylus or dictate naturally with voice.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => onNavigateTab('case-taking')}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold p-3 rounded-xl text-xs flex items-center justify-between shadow-sm transition-all active:scale-98"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">✍️</span>
                  <div className="text-left">
                    <span className="block font-bold">Open Digital Writing Pad</span>
                    <span className="text-[10px] text-teal-100 font-normal">Chief complaints, generals & observations</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('prescription')}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold p-3 rounded-xl text-xs flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">💊</span>
                  <div className="text-left">
                    <span className="block font-bold">Quick Prescription Builder</span>
                    <span className="text-[10px] text-slate-300 font-normal">Remedies, potency chips & voice dosage</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Diagnostic Reports Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold text-slate-800">
                  Uploaded Reports ({patient.reports?.length || 0})
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenReportViewer}
                className="text-xs text-teal-700 hover:text-teal-900 font-semibold hover:underline"
              >
                Open Viewer
              </button>
            </div>

            {patient.reports && patient.reports.length > 0 ? (
              <div className="space-y-2">
                {patient.reports.map((rep) => (
                  <div
                    key={rep.id}
                    onClick={onOpenReportViewer}
                    className="p-3 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200/80 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{rep.title}</h5>
                      <span className="text-[10px] text-slate-400">{rep.date} • {rep.lab}</span>
                    </div>
                    <span className="text-xs text-teal-700 font-semibold">View ➔</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No reports on file.</p>
            )}
          </div>

          {/* QR Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                📱
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Patient Digital QR Badge</h5>
                <p className="text-[11px] text-slate-400">UID: {patient.id}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenQRModal}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              Show QR
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
