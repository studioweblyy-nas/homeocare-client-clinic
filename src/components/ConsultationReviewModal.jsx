import React from 'react';
import { 
  X, 
  Printer, 
  Check, 
  ShieldCheck, 
  Clock, 
  Pill, 
  User 
} from 'lucide-react';

export default function ConsultationReviewModal({
  isOpen,
  onClose,
  patient,
  caseData,
  prescription,
  handwritingDataUrl,
  handwritingNotes,
  onPrint
}) {
  if (!isOpen) return null;

  const medicines = prescription.medicines || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-float max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        
        {/* Modal Header (No Print) */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-med-400" />
            <div>
              <h2 className="text-sm font-bold">Prescription Review & Clinical Verification</h2>
              <p className="text-[11px] text-slate-400">
                Please verify all dictated dosages and instructions before finalizing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              className="bg-med-600 hover:bg-med-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Prescription Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-slate-800" id="printable-prescription">
          
          {/* Clinic Header */}
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-med-600 text-white rounded-md flex items-center justify-center font-black text-xs">
                  H
                </span>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  HOMEOCARE CLINIC
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                Classical Homeopathic Healing & Research Centre
              </p>
              <p className="text-xs text-slate-500 mt-1">
                12/B Heritage Medical Enclave, Civil Lines, New Delhi • Ph: +91 11 2680 9411
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600">
              <p className="font-bold text-slate-900">Dr. S. K. Sharma, B.H.M.S., M.D. (Hom)</p>
              <p className="text-slate-500">Reg. No: HOM-ND-44910</p>
              <p className="mt-1 font-semibold text-med-700">Date: {patient?.visitDate || new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          {/* Patient Details Ribbon */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Patient Name:</span>
              <span className="font-bold text-slate-900">{patient?.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Age / Gender:</span>
              <span className="font-semibold text-slate-800">{patient?.age} Yrs / {patient?.gender}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Registration ID:</span>
              <span className="font-mono font-bold text-med-700">{patient?.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Vitals:</span>
              <span className="font-semibold text-slate-800">{patient?.bp} | {patient?.weight}</span>
            </div>
          </div>

          {/* Chief Complaints */}
          {caseData.chiefComplaints && (
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Chief Complaints & Symptoms
              </h4>
              <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed text-slate-800">
                {caseData.chiefComplaints}
              </p>
            </div>
          )}

          {/* Prescribed Remedies Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1 uppercase">
                <span className="text-med-600 text-sm">Rx</span>
                <span>Prescription (दवाइयाँ)</span>
              </h4>
              <span className="text-slate-400">
                {medicines.length} remedies
              </span>
            </div>

            {medicines.length === 0 ? (
              <p className="text-xs italic text-slate-400 p-2.5 bg-slate-50 rounded-lg">
                No remedies specified.
              </p>
            ) : (
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">Remedy Name</th>
                      <th className="py-2 px-3">Potency</th>
                      <th className="py-2 px-3">Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {medicines.map((m, idx) => (
                      <tr key={m.id}>
                        <td className="py-2 px-3 text-slate-400 font-semibold">{idx + 1}</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{m.name}</td>
                        <td className="py-2 px-3 font-semibold text-med-700">{m.potency}</td>
                        <td className="py-2 px-3 text-slate-600">{m.form}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Dosage Schedule */}
          <div className="space-y-2.5 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-med-600" />
              <span>Dosage Schedule (Voice-Dictated)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="font-semibold text-amber-700 block mb-0.5">🌅 Morning:</span>
                <span className="text-slate-700">{prescription.morningDosage || 'As directed'}</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="font-semibold text-orange-700 block mb-0.5">☀️ Afternoon:</span>
                <span className="text-slate-700">{prescription.afternoonDosage || 'As directed'}</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="font-semibold text-indigo-700 block mb-0.5">🌙 Evening:</span>
                <span className="text-slate-700">{prescription.eveningDosage || 'As directed'}</span>
              </div>
            </div>

            {prescription.dailyDosage && (
              <div className="text-xs pt-1">
                <span className="font-semibold text-slate-600">Daily Regimen: </span>
                <span className="text-slate-800">{prescription.dailyDosage}</span>
              </div>
            )}

            {prescription.duration && (
              <div className="text-xs">
                <span className="font-semibold text-slate-600">Duration: </span>
                <span className="font-bold text-med-700">{prescription.duration}</span>
              </div>
            )}
          </div>

          {/* Precautions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {prescription.specialInstructions && (
              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200/80">
                <span className="font-bold text-amber-900 block mb-0.5">
                  Dietary Precautions:
                </span>
                <p className="text-amber-950 leading-relaxed">{prescription.specialInstructions}</p>
              </div>
            )}

            {prescription.followupInstructions && (
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="font-bold text-slate-800 block mb-0.5">
                  Follow-up:
                </span>
                <p className="text-slate-700 leading-relaxed">{prescription.followupInstructions}</p>
              </div>
            )}
          </div>

          {/* Digital Handwriting Diagram */}
          {handwritingDataUrl && (
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-600 uppercase tracking-wider text-[11px]">
                Doctor's Clinical Sketch
              </h4>
              <div className="border border-slate-200 rounded-lg p-1.5 bg-white max-w-xs">
                <img
                  src={handwritingDataUrl}
                  alt="Doctor Handwriting"
                  className="max-h-32 w-auto rounded"
                />
              </div>
              {handwritingNotes && (
                <p className="text-[11px] text-slate-500 italic">
                  Note: {handwritingNotes}
                </p>
              )}
            </div>
          )}

          {/* Signature Block */}
          <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-xs">
            <div className="text-[10px] text-slate-400">
              HOMEOCARE Clinical Voice Suite • {new Date().toLocaleDateString()}
            </div>
            <div className="text-right">
              <div className="font-serif italic font-bold text-slate-800 text-base">
                Dr. S. K. Sharma
              </div>
              <div className="border-t border-slate-300 pt-0.5 text-[11px] text-slate-500">
                Authorized Signature
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Reviewed & Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Back to Editing
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="bg-med-600 hover:bg-med-700 text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Prescription</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
