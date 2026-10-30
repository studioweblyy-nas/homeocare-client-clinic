import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { 
  COMMON_HOMEOPATHIC_REMEDIES, 
  POTENCY_OPTIONS, 
  DOSAGE_FORMS 
} from '../data/homeopathicData';

export default function PrescriptionBuilder({
  prescription,
  onUpdatePrescription,
  recordingFieldId,
  onStartVoice,
  onStopVoice,
  onQuickSimulateText,
  onOpenReviewModal
}) {
  const [remedySearch, setRemedySearch] = useState('');

  const medicines = prescription.medicines || [];

  const handleAddMedicine = (suggestedName = '') => {
    const newMed = {
      id: Date.now().toString(),
      name: suggestedName || remedySearch || 'Arnica Montana',
      potency: '200C',
      form: 'Globules / Pills (No. 30 / 40)',
      instructions: '4 globules, dissolved dry on tongue',
    };
    onUpdatePrescription({
      ...prescription,
      medicines: [...medicines, newMed]
    });
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

  return (
    <div className="space-y-4">
      {/* Sleek Header & Review Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Prescription & Dosage Management
          </h2>
          <p className="text-xs text-slate-500">
            Add remedies and dictate morning, afternoon, evening, and daily dosage schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenReviewModal}
          className="bg-med-600 hover:bg-med-700 text-white font-semibold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Review & Print</span>
        </button>
      </div>

      {/* Subtle Safety Note */}
      <div className="bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span>
          <strong>Doctor Verification Required:</strong> Ambiguous spoken dosage instructions are not automatically guessed to protect patient safety.
        </span>
      </div>

      {/* Prescribed Remedies Section */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-med-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Homeopathic Remedies</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search or enter remedy..."
              value={remedySearch}
              onChange={(e) => setRemedySearch(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded-md focus:border-med-500 w-44"
            />
            <button
              type="button"
              onClick={() => handleAddMedicine()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Quick Add Pills */}
        <div className="mb-3 flex flex-wrap gap-1 text-xs">
          <span className="text-[11px] text-slate-400 self-center mr-1">Quick:</span>
          {COMMON_HOMEOPATHIC_REMEDIES.slice(0, 6).map((rem) => (
            <button
              key={rem.name}
              type="button"
              onClick={() => handleAddMedicine(rem.name)}
              className="text-[11px] bg-slate-50 hover:bg-med-50 text-slate-600 hover:text-med-700 px-2 py-0.5 rounded border border-slate-200 transition-colors"
            >
              + {rem.name}
            </button>
          ))}
        </div>

        {/* Medicines List */}
        {medicines.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
            <p className="text-xs text-slate-400">No remedies added yet. Use the search box or quick-add buttons above.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {medicines.map((med, idx) => (
              <div 
                key={med.id}
                className="p-3 bg-slate-50/60 border border-slate-200/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs"
              >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="w-5 h-5 bg-med-100 text-med-700 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={med.name}
                    onChange={(e) => handleUpdateMedicine(med.id, 'name', e.target.value)}
                    className="font-semibold text-slate-800 bg-white border border-slate-200 rounded px-2 py-1 text-xs w-48 focus:border-med-500"
                    placeholder="Remedy name"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={med.potency}
                    onChange={(e) => handleUpdateMedicine(med.id, 'potency', e.target.value)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    {POTENCY_OPTIONS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>

                  <select
                    value={med.form}
                    onChange={(e) => handleUpdateMedicine(med.id, 'form', e.target.value)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
                  >
                    {DOSAGE_FORMS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(med.id)}
                    className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors ml-auto sm:ml-0"
                    title="Remove remedy"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Voice-Enabled Dosage Fields */}
      <div className="space-y-3">
        {/* Daily Dosage */}
        <div className={`p-3.5 rounded-xl border bg-white shadow-xs transition-all ${
          recordingFieldId === 'dailyDosage' ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200/80'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-med-600" />
              <span>Daily Dosage (दैनिक खुराक)</span>
            </label>
            <div className="flex items-center gap-1.5">
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
                className="text-[11px] text-med-600 hover:underline flex items-center gap-1"
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
            className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
          />
        </div>

        {/* 3-Time Dosage Grid (Morning / Afternoon / Evening) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Morning */}
          <div className={`p-3 rounded-xl border bg-white shadow-xs transition-all ${
            recordingFieldId === 'morningDosage' ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-800 text-xs flex items-center gap-1">
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
              placeholder='e.g. Subah paanch globules...'
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
            />
            <button
              type="button"
              onClick={() => onQuickSimulateText('morningDosage', 'Subah paanch globules khane ke baad lena hai.')}
              className="mt-1 text-[11px] text-slate-400 hover:text-med-600 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sample</span>
            </button>
          </div>

          {/* Afternoon */}
          <div className={`p-3 rounded-xl border bg-white shadow-xs transition-all ${
            recordingFieldId === 'afternoonDosage' ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-800 text-xs flex items-center gap-1">
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
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
            />
            <button
              type="button"
              onClick={() => onQuickSimulateText('afternoonDosage', 'Dopahar ko khane ke adhe ghante baad 10 boond.')}
              className="mt-1 text-[11px] text-slate-400 hover:text-med-600 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sample</span>
            </button>
          </div>

          {/* Evening */}
          <div className={`p-3 rounded-xl border bg-white shadow-xs transition-all ${
            recordingFieldId === 'eveningDosage' ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-800 text-xs flex items-center gap-1">
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
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
            />
            <button
              type="button"
              onClick={() => onQuickSimulateText('eveningDosage', 'Shaam aur raat ko paanch globules khane ke baad lena hai.')}
              className="mt-1 text-[11px] text-slate-400 hover:text-med-600 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sample</span>
            </button>
          </div>
        </div>

        {/* Treatment Duration & Precautions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Duration */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-800 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-med-600" />
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
              placeholder='e.g. "15 days"'
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
            />
          </div>

          {/* Special Instructions */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs md:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-800 text-xs flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Special Instructions (Dietary Precautions)</span>
              </label>
              <VoiceMicButton
                isRecording={recordingFieldId === 'specialInstructions'}
                onClick={() => onStartVoice('specialInstructions', 'Special Instructions')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>
            <input
              type="text"
              value={prescription.specialInstructions || ''}
              onChange={(e) => handleFieldChange('specialInstructions', e.target.value)}
              placeholder='e.g. Avoid raw onion, garlic, coffee 30 mins before/after medicine.'
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
            />
          </div>
        </div>

        {/* Follow-up Instructions */}
        <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-800 text-xs">
              Follow-up Guidance
            </label>
            <VoiceMicButton
              isRecording={recordingFieldId === 'followupInstructions'}
              onClick={() => onStartVoice('followupInstructions', 'Follow-up Instructions')}
              onStop={onStopVoice}
              label="Speak"
              stopLabel="Stop"
            />
          </div>
          <input
            type="text"
            value={prescription.followupInstructions || ''}
            onChange={(e) => handleFieldChange('followupInstructions', e.target.value)}
            placeholder='e.g. Review after 14 days or if symptoms recur.'
            className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:border-med-500"
          />
        </div>

      </div>
    </div>
  );
}
