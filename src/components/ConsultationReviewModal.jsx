import React from 'react';
import { 
  X, 
  Printer, 
  Check, 
  ShieldCheck, 
  Clock, 
  Pill, 
  User,
  QrCode,
  Calendar,
  AlertTriangle,
  Download
} from 'lucide-react';

export default function ConsultationReviewModal({
  isOpen,
  onClose,
  patient,
  caseData = {},
  prescription = {},
  handwritingSectionsData = {},
  doctorSignature = '',
  onPrint
}) {
  if (!isOpen || !patient) return null;

  const medicines = prescription.medicines || [];
  const precautions = prescription.precautions || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Toolbar (No Print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="text-sm font-bold">Official Prescription & Case Summary</h2>
              <p className="text-[11px] text-slate-400">
                Ready for high-resolution clinic printing or PDF export
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Prescription</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Prescription Body */}
        <div className="p-8 sm:p-10 overflow-y-auto space-y-6 text-slate-800 bg-white" id="printable-prescription">
          
          {/* Clinic Letterhead Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 bg-teal-800 text-white rounded-xl flex items-center justify-center font-black text-base shadow-xs">
                  H
                </span>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    HOMEOCARE CLINIC
                  </h1>
                  <span className="text-[10px] font-bold text-teal-800 tracking-widest uppercase">
                    Classical Homeopathic Healing & Advanced Research
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                12/B Heritage Medical Enclave, Civil Lines, New Delhi • Ph: +91 11 2680 9411
              </p>
              <p className="text-[11px] text-slate-400">
                Email: care@homeocareclinic.org • Web: www.homeocareclinic.org
              </p>
            </div>

            {/* Doctor Info Block */}
            <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5">
              <p className="font-extrabold text-slate-900 text-sm">Dr. S. K. Sharma</p>
              <p className="font-medium">B.H.M.S., M.D. (Homeopathy)</p>
              <p className="text-slate-500 text-[11px]">Senior Consultant Physician</p>
              <p className="font-mono text-teal-800 font-semibold">Reg. No: CCH-HOM-44910</p>
              <p className="text-[11px] pt-1">
                <strong>Date:</strong> {patient.visitDate || new Date().toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>

          {/* Patient Details Ribbon */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block font-bold uppercase">Patient Name</span>
              <span className="font-black text-slate-900 text-sm">{patient.name}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-bold uppercase">Age / Gender</span>
              <span className="font-bold text-slate-800">{patient.age} Yrs / {patient.gender}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-bold uppercase">Patient UID & Token</span>
              <span className="font-mono font-bold text-teal-800 text-xs">
                {patient.id} (Token #{patient.token || '04'})
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-bold uppercase">Vitals (BP | Pulse)</span>
              <span className="font-semibold text-slate-800">{patient.bp} | {patient.pulse}</span>
            </div>
          </div>

          {/* Primary Condition & Diathesis */}
          <div className="text-xs bg-teal-50/60 p-3 rounded-xl border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-teal-950">Clinical Diagnosis:</strong>{' '}
              <span className="text-teal-900 font-medium">{patient.activeDiagnosis}</span>
            </div>
            <div className="text-[11px] text-teal-800">
              <strong>Diathesis:</strong> {patient.constitution}
            </div>
          </div>

          {/* Prescribed Homeopathic Medicines (Rx) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-1.5 uppercase">
                <span className="text-teal-700 text-xl font-serif">Rx</span>
                <span>Prescription (दवाइयाँ)</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Total Remedies: {medicines.length}
              </span>
            </div>

            {medicines.length === 0 ? (
              <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">
                No remedies entered.
              </p>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Remedy Name</th>
                      <th className="py-2.5 px-3">Potency</th>
                      <th className="py-2.5 px-3">Vehicle</th>
                      <th className="py-2.5 px-3">Directions / Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {medicines.map((m, idx) => (
                      <tr key={m.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-2.5 px-3 font-black text-slate-900 text-sm">{m.name}</td>
                        <td className="py-2.5 px-3 font-extrabold text-teal-800">{m.potency}</td>
                        <td className="py-2.5 px-3 text-slate-700">{m.vehicle || 'Globules #40'}</td>
                        <td className="py-2.5 px-3 text-slate-800 font-medium">{m.frequency || 'As directed'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Voice-Dictated Dosage Regimen */}
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              <span>Dosage Administration Schedule</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-700 block mb-0.5">🌅 Morning (सुबह):</span>
                <span className="text-slate-800 font-medium">{prescription.morningDosage || '4 globules on clean tongue'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-bold text-orange-700 block mb-0.5">☀️ Afternoon (दोपहर):</span>
                <span className="text-slate-800 font-medium">{prescription.afternoonDosage || 'As directed'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-0.5">🌙 Evening / Bedtime:</span>
                <span className="text-slate-800 font-medium">{prescription.eveningDosage || '4 globules dissolved dry'}</span>
              </div>
            </div>

            {prescription.dailyDosage && (
              <div className="pt-1 text-xs">
                <span className="font-bold text-slate-600">Daily Regimen: </span>
                <span className="text-slate-900 font-medium">{prescription.dailyDosage}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="font-bold text-slate-600">Treatment Duration: </span>
                <span className="font-extrabold text-teal-900">{prescription.duration || '15 Days'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-600">Next Follow-up Visit: </span>
                <span className="font-extrabold text-slate-900">{prescription.followupInstructions || 'Review after 14 days (15 Nov 2026)'}</span>
              </div>
            </div>
          </div>

          {/* Clinic Precautions & Restrictions */}
          {precautions.length > 0 && (
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/90 text-xs">
              <span className="font-bold text-amber-950 uppercase tracking-wider block mb-1">
                ⚠️ Mandatory Dietary Precautions:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-amber-900">
                {precautions.map((prec, i) => (
                  <li key={i}>{prec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Embedded Handwritten Sketch (if present for Chief Complaints) */}
          {handwritingSectionsData?.chiefComplaints && (
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Doctor's Handwritten Clinical Schema / Notes
              </span>
              <div className="border border-slate-200 rounded-xl p-2 bg-white max-w-sm">
                <img
                  src={handwritingSectionsData.chiefComplaints}
                  alt="Doctor Sketch"
                  className="max-h-28 w-auto rounded"
                />
              </div>
            </div>
          )}

          {/* Footer Signature & QR Block */}
          <div className="pt-6 border-t-2 border-slate-800 flex justify-between items-end text-xs">
            <div>
              <div className="font-mono text-[10px] text-slate-400">
                UID: {patient.id} • Auth Token: #{patient.token || '04'}<br />
                Generated via HOMEOCARE Advanced Clinical Station
              </div>
            </div>

            {/* Signature Block */}
            <div className="text-right flex flex-col items-end">
              {doctorSignature ? (
                <img
                  src={doctorSignature}
                  alt="Doctor Signature"
                  className="h-12 w-auto object-contain mb-1"
                />
              ) : (
                <div className="font-serif italic font-bold text-slate-900 text-lg mb-1">
                  Dr. S. K. Sharma
                </div>
              )}
              <div className="border-t border-slate-400 pt-1 text-[11px] text-slate-600 font-semibold">
                Authorized Homeopathic Physician Signature
              </div>
            </div>
          </div>

        </div>

        {/* Footer Toolbar (No Print) */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between no-print">
          <span className="text-xs text-slate-500">
            Complies with Central Council of Homeopathy electronic records protocol
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Back to Cabin
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Prescription</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
