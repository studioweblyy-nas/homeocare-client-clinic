import React, { useState, useRef } from 'react';
import VoiceMicButton from './VoiceMicButton';
import { 
  Pill, 
  Plus, 
  Trash2, 
  Clock, 
  Sun, 
  CloudSun, 
  Moon, 
  Calendar, 
  ShieldAlert, 
  FileCheck2, 
  Sparkles, 
  AlertCircle,
  Check,
  PenTool,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { 
  COMMON_HOMEOPATHIC_REMEDIES, 
  POTENCY_OPTIONS, 
  VEHICLE_OPTIONS, 
  CLINIC_PRECAUTIONS 
} from '../data/homeopathicData';

export default function QuickPrescriptionBuilder({
  prescription,
  onUpdatePrescription,
  recordingFieldId,
  onStartVoice,
  onStopVoice,
  onQuickSimulateText,
  onOpenReviewModal
}) {
  const [remedySearch, setRemedySearch] = useState('');
  const [selectedPrecautions, setSelectedPrecautions] = useState(() => {
    return prescription.precautions || [CLINIC_PRECAUTIONS[0], CLINIC_PRECAUTIONS[1], CLINIC_PRECAUTIONS[2]];
  });
  const [isDoctorApproved, setIsDoctorApproved] = useState(prescription.isDoctorApproved || false);

  // Dedicated Dosage Writing Pad
  const [showDosageCanvas, setShowDosageCanvas] = useState(false);
  const dosageCanvasRef = useRef(null);
  const [isCanvasDrawing, setIsCanvasDrawing] = useState(false);

  const medicines = prescription.medicines || [];

  const handleAddMedicine = (suggestedName = '', suggestedPotency = '200C') => {
    const newMed = {
      id: Date.now().toString(),
      name: suggestedName || remedySearch || 'Arnica Montana',
      potency: suggestedPotency,
      vehicle: 'Globules #40 (Large Pills)',
      frequency: '4 globules twice daily',
    };
    const updated = {
      ...prescription,
      medicines: [...medicines, newMed]
    };
    onUpdatePrescription(updated);
    setRemedySearch('');
  };

  const handleRemoveMedicine = (id) => {
    onUpdatePrescription({
      ...prescription,
      medicines: medicines.filter(m => m.id !== id)
    });
  };

  const handleUpdateMedicine = (id, field, value) => {
    onUpdatePrescription({
      ...prescription,
      medicines: medicines.map(m => m.id === id ? { ...m, [field]: value } : m)
    });
  };

  const handleFieldChange = (field, value) => {
    onUpdatePrescription({
      ...prescription,
      [field]: value
    });
  };

  const handleTogglePrecaution = (prec) => {
    const next = selectedPrecautions.includes(prec)
      ? selectedPrecautions.filter(p => p !== prec)
      : [...selectedPrecautions, prec];
    setSelectedPrecautions(next);
    onUpdatePrescription({
      ...prescription,
      precautions: next
    });
  };

  const handleApprovalToggle = (checked) => {
    setIsDoctorApproved(checked);
    onUpdatePrescription({
      ...prescription,
      isDoctorApproved: checked
    });
  };

  return (
    <div className="space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              💊
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Quick Prescription Builder
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select classical remedies, 1-click potency & vehicle chips, and dictate dosage naturally.
          </p>
        </div>

        {/* Generate / Review Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenReviewModal}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95 ${
              isDoctorApproved
                ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-900 text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-teal-300" />
            <span>Generate Official Prescription PDF</span>
          </button>
        </div>
      </div>

      {/* Safety Compliance Alert */}
      <div className="bg-slate-100 border border-slate-200/90 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs text-slate-700">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Doctor Verification Standard:</strong> Ambiguous medical dosage dictations are not guessed by AI to protect patient safety. The doctor must review and manually authorize every prescription before issuing.
        </span>
      </div>

      {/* 1. HOMEOPATHIC REMEDIES & POTENCY SELECTOR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Prescribed Remedies & Posology
            </h3>
            <p className="text-xs text-slate-500">
              Select remedy, tap potency chips (`6C`, `30C`, `200C`, `1M`, `10M`, `LM1`, `LM2`), and vehicle
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search remedy e.g. Belladonna..."
              value={remedySearch}
              onChange={(e) => setRemedySearch(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:border-teal-600 w-48 sm:w-56"
            />
            <button
              type="button"
              onClick={() => handleAddMedicine()}
              className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Quick Add Remedy Chips */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Frequent:</span>
          {COMMON_HOMEOPATHIC_REMEDIES.slice(0, 8).map((rem) => (
            <button
              key={rem.name}
              type="button"
              onClick={() => handleAddMedicine(rem.name, '200C')}
              className="text-xs bg-slate-50 hover:bg-teal-50 hover:text-teal-900 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors font-medium"
            >
              + {rem.name}
            </button>
          ))}
        </div>

        {/* Medicines List */}
        {medicines.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <Pill className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
            <p className="text-xs font-bold text-slate-600">No remedies added yet</p>
            <p className="text-[11px] text-slate-400">Search above or click any frequent remedy chip.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {medicines.map((med, idx) => (
              <div 
                key={med.id}
                className="p-4 bg-slate-50/70 border border-slate-200/90 rounded-2xl flex flex-col space-y-3"
              >
                {/* Row 1: Name, Number & Remove */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-1">
                    <span className="w-6 h-6 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) => handleUpdateMedicine(med.id, 'name', e.target.value)}
                      className="font-bold text-slate-900 text-sm bg-white border border-slate-200 rounded-lg px-2.5 py-1 focus:border-teal-600 w-full max-w-xs"
                      placeholder="Remedy name"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(med.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove remedy"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Row 2: 1-Click Potency Chips */}
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Potency:</span>
                  {['6C', '30C', '200C', '1M', '10M', 'LM1 (0/1)', 'LM2 (0/2)', 'Mother Tincture (Q)'].map((pot) => (
                    <button
                      key={pot}
                      type="button"
                      onClick={() => handleUpdateMedicine(med.id, 'potency', pot)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                        med.potency === pot
                          ? 'bg-teal-700 text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {pot}
                    </button>
                  ))}
                </div>

                {/* Row 3: Vehicle Selection Chips */}
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Vehicle:</span>
                  {VEHICLE_OPTIONS.map((veh) => (
                    <button
                      key={veh}
                      type="button"
                      onClick={() => handleUpdateMedicine(med.id, 'vehicle', veh)}
                      className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors ${
                        med.vehicle === veh
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {veh}
                    </button>
                  ))}
                </div>

                {/* Row 4: Dosage Instructions for this remedy */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">Instructions:</span>
                  <input
                    type="text"
                    value={med.frequency || ''}
                    onChange={(e) => handleUpdateMedicine(med.id, 'frequency', e.target.value)}
                    placeholder='e.g. 4 globules twice daily dissolved dry on clean tongue'
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:border-teal-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. VOICE-TO-TEXT DOSAGE SCHEDULE & DIGITAL DOSAGE PAD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Dosage Administration Schedule & Instructions
            </h3>
            <p className="text-xs text-slate-500">
              Dictate in Hindi/English or use the digital dosage writing pad
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDosageCanvas(!showDosageCanvas)}
            className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{showDosageCanvas ? 'Hide Dosage Drawing Pad' : 'Open Dosage Drawing Pad'}</span>
          </button>
        </div>

        {/* Optional Dosage Drawing Pad Drawer */}
        {showDosageCanvas && (
          <div className="p-4 bg-slate-50 border-2 border-dashed border-teal-200 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-teal-900 block">
              Digital Dosage Sketch / Schematic:
            </span>
            <div className="relative bg-white rounded-xl border border-slate-300 overflow-hidden">
              <canvas
                ref={dosageCanvasRef}
                width={700}
                height={160}
                onMouseDown={() => setIsCanvasDrawing(true)}
                onMouseUp={() => setIsCanvasDrawing(false)}
                className="w-full h-32 block touch-none cursor-crosshair"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const c = dosageCanvasRef.current;
                    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
                  }}
                  className="p-1 bg-white border border-slate-200 rounded text-slate-500 hover:text-rose-600 text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Draw water dilution schematic or clock dosage symbols for patient comprehension.
            </p>
          </div>
        )}

        {/* Daily Overall Dosage */}
        <div className={`p-3.5 rounded-xl border transition-all ${
          recordingFieldId === 'dailyDosage' ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-100' : 'border-slate-200/90 bg-slate-50/40'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              <span>Daily Dosage (दैनिक खुराक निर्देश)</span>
            </label>
            <div className="flex items-center gap-2">
              <VoiceMicButton
                isRecording={recordingFieldId === 'dailyDosage'}
                onClick={() => onStartVoice('dailyDosage', 'Daily Dosage')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
              <button
                type="button"
                onClick={() => onQuickSimulateText('dailyDosage', '4 globules twice daily directly on clean tongue.')}
                className="text-[11px] text-teal-700 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Sample</span>
              </button>
            </div>
          </div>
          <input
            type="text"
            value={prescription.dailyDosage || ''}
            onChange={(e) => handleFieldChange('dailyDosage', e.target.value)}
            placeholder='e.g. "4 globules twice daily directly on clean tongue"'
            className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs bg-white focus:border-teal-600"
          />
        </div>

        {/* 3-Time Dosage Grid (Morning, Afternoon, Evening) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Morning */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Morning (सुबह)</span>
              </label>
              <VoiceMicButton
                isRecording={recordingFieldId === 'morningDosage'}
                onClick={() => onStartVoice('morningDosage', 'Morning Dosage')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>
            <textarea
              rows={2}
              value={prescription.morningDosage || ''}
              onChange={(e) => handleFieldChange('morningDosage', e.target.value)}
              placeholder='e.g. Subah paanch globules khane se pehle...'
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs bg-white focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => onQuickSimulateText('morningDosage', 'Subah aur shaam paanch globules khane ke baad lena hai.')}
              className="mt-1 text-[11px] text-slate-400 hover:text-teal-700 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sample: "Subah paanch globules..."</span>
            </button>
          </div>

          {/* Afternoon */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1">
                <CloudSun className="w-3.5 h-3.5 text-orange-500" />
                <span>Afternoon (दोपहर)</span>
              </label>
              <VoiceMicButton
                isRecording={recordingFieldId === 'afternoonDosage'}
                onClick={() => onStartVoice('afternoonDosage', 'Afternoon Dosage')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>
            <textarea
              rows={2}
              value={prescription.afternoonDosage || ''}
              onChange={(e) => handleFieldChange('afternoonDosage', e.target.value)}
              placeholder='e.g. 5 drops in half cup water...'
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs bg-white focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => onQuickSimulateText('afternoonDosage', 'Dopahar ko khane ke adhe ghante baad 10 boond.')}
              className="mt-1 text-[11px] text-slate-400 hover:text-teal-700 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sample: "Dopahar ko 10 boond..."</span>
            </button>
          </div>

          {/* Evening */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40">
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Evening (शाम / रात)</span>
              </label>
              <VoiceMicButton
                isRecording={recordingFieldId === 'eveningDosage'}
                onClick={() => onStartVoice('eveningDosage', 'Evening Dosage')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>
            <textarea
              rows={2}
              value={prescription.eveningDosage || ''}
              onChange={(e) => handleFieldChange('eveningDosage', e.target.value)}
              placeholder='e.g. Shaam ko sote samay 4 pills...'
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs bg-white focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => onQuickSimulateText('eveningDosage', 'Shaam aur raat ko paanch globules khane ke baad lena hai.')}
              className="mt-1 text-[11px] text-slate-400 hover:text-teal-700 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sample: "Shaam ko 5 globules..."</span>
            </button>
          </div>

        </div>

        {/* Treatment Duration & Follow-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-700" />
                <span>Duration</span>
              </label>
              <VoiceMicButton
                isRecording={recordingFieldId === 'duration'}
                onClick={() => onStartVoice('duration', 'Duration')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>
            <input
              type="text"
              value={prescription.duration || ''}
              onChange={(e) => handleFieldChange('duration', e.target.value)}
              placeholder='e.g. "15 days", "3 weeks"'
              className="w-full p-2 bg-white rounded-lg border border-slate-200 text-slate-800 text-xs"
            />
          </div>

          <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-900 text-xs flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-teal-700" />
                <span>Next Visit / Follow-up</span>
              </label>
              <VoiceMicButton
                isRecording={recordingFieldId === 'followupInstructions'}
                onClick={() => onStartVoice('followupInstructions', 'Follow-up')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>
            <input
              type="text"
              value={prescription.followupInstructions || ''}
              onChange={(e) => handleFieldChange('followupInstructions', e.target.value)}
              placeholder='e.g. Review after 14 days on 15 Nov 2026'
              className="w-full p-2 bg-white rounded-lg border border-slate-200 text-slate-800 text-xs"
            />
          </div>
        </div>

      </div>

      {/* 3. CLINIC-CONFIGURED PRECAUTIONS & DIETARY RESTRICTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Clinic-Configured Homeopathic Precautions & Dietary Restrictions
          </span>
          <span className="text-[11px] text-slate-400">Click to toggle</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CLINIC_PRECAUTIONS.map((prec) => {
            const isSelected = selectedPrecautions.includes(prec);
            return (
              <button
                key={prec}
                type="button"
                onClick={() => handleTogglePrecaution(prec)}
                className={`p-2.5 rounded-xl text-xs text-left border flex items-start gap-2 transition-all ${
                  isSelected
                    ? 'bg-teal-50 border-teal-300 text-teal-950 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className={`w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border text-[10px] ${
                  isSelected ? 'bg-teal-700 text-white border-teal-700' : 'bg-white border-slate-300'
                }`}>
                  {isSelected && '✓'}
                </span>
                <span className="leading-snug">{prec}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MANDATORY DOCTOR AUTHORIZATION & SIGN-OFF */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isDoctorApproved}
            onChange={(e) => handleApprovalToggle(e.target.checked)}
            className="w-5 h-5 rounded-md text-teal-600 focus:ring-teal-500 border-slate-700 bg-slate-800 mt-0.5 cursor-pointer"
          />
          <div>
            <span className="font-bold text-sm block">
              I, Dr. S. K. Sharma, manually verify and authorize this homeopathic prescription.
            </span>
            <span className="text-xs text-slate-400">
              Complies with Central Council of Homeopathy (CCH) electronic prescription regulations.
            </span>
          </div>
        </label>

        <button
          type="button"
          onClick={onOpenReviewModal}
          className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 flex-shrink-0"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Review & Print Rx</span>
        </button>
      </div>

    </div>
  );
}
