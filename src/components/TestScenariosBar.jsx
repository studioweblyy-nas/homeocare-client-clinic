import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  Save, 
  RotateCw, 
  Edit3, 
  Square,
  Sparkles
} from 'lucide-react';
import { DICTATION_TEST_PRESETS } from '../data/homeopathicData';

export default function TestScenariosBar({
  onRunTestPreset,
  onSaveConsultation,
  isRecording,
  onStopRecording,
  hasSavedConsultation
}) {
  const [isOpen, setIsOpen] = useState(false); // Collapsed by default to keep UI clean and spacious!
  const [completedSteps, setCompletedSteps] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  const toggleStep = (stepNum) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const handleRunPreset = (preset, stepNum) => {
    onRunTestPreset(preset);
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: true
    }));
  };

  const allCompleted = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden mb-6 no-print">
      {/* Sleek, Compact Header Ribbon */}
      <div 
        className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-med-50 text-med-600 flex items-center justify-center">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-xs text-slate-700">
              Voice Feature Testing Suite (Section 8 Verification)
            </span>
            <span className="ml-2 text-[11px] text-slate-400">
              {allCompleted}/9 steps verified
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick 1-click test chips directly in header */}
          <div className="hidden sm:flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[0], 1)}
              className="text-[11px] font-medium text-slate-600 hover:text-med-600 hover:bg-med-50 px-2 py-0.5 rounded border border-slate-200 transition-colors"
            >
              Test Hindi
            </button>
            <button
              type="button"
              onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[2], 3)}
              className="text-[11px] font-medium text-slate-600 hover:text-med-600 hover:bg-med-50 px-2 py-0.5 rounded border border-slate-200 transition-colors"
            >
              Test Hinglish
            </button>
            <button
              type="button"
              onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[3], 4)}
              className="text-[11px] font-medium text-slate-600 hover:text-med-600 hover:bg-med-50 px-2 py-0.5 rounded border border-slate-200 transition-colors"
            >
              Test Dosage
            </button>
          </div>

          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1 rounded"
            aria-label="Toggle Test Suite"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Test Panel with Clean Light Styling */}
      {isOpen && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-500 mb-3">
            Click any test case to simulate speech recognition or test live microphone input.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Step 1: Hindi */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-800">1. Hindi Complaint</span>
                <button
                  type="button"
                  onClick={() => toggleStep(1)}
                  className={`text-xs ${completedSteps[1] ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 truncate mb-2 italic">
                "मरीज को सुबह उठते समय सिरदर्द होता है..."
              </p>
              <button
                type="button"
                onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[0], 1)}
                className="w-full bg-slate-100 hover:bg-med-50 hover:text-med-700 text-slate-700 text-xs font-medium py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Simulate Hindi</span>
              </button>
            </div>

            {/* Step 2: English */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-800">2. English Symptom</span>
                <button
                  type="button"
                  onClick={() => toggleStep(2)}
                  className={`text-xs ${completedSteps[2] ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 truncate mb-2 italic">
                "Sharp throbbing pain in right temple..."
              </p>
              <button
                type="button"
                onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[1], 2)}
                className="w-full bg-slate-100 hover:bg-med-50 hover:text-med-700 text-slate-700 text-xs font-medium py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Simulate English</span>
              </button>
            </div>

            {/* Step 3: Hinglish */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-800">3. Hinglish Sentence</span>
                <button
                  type="button"
                  onClick={() => toggleStep(3)}
                  className={`text-xs ${completedSteps[3] ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 truncate mb-2 italic">
                "Patient ko subah headache hota hai..."
              </p>
              <button
                type="button"
                onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[2], 3)}
                className="w-full bg-slate-100 hover:bg-med-50 hover:text-med-700 text-slate-700 text-xs font-medium py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Simulate Hinglish</span>
              </button>
            </div>

            {/* Step 4: Dosage */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-800">4. Dosage Instructions</span>
                <button
                  type="button"
                  onClick={() => toggleStep(4)}
                  className={`text-xs ${completedSteps[4] ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 truncate mb-2 italic">
                "Subah aur shaam paanch globules..."
              </p>
              <button
                type="button"
                onClick={() => handleRunPreset(DICTATION_TEST_PRESETS[3], 4)}
                className="w-full bg-slate-100 hover:bg-med-50 hover:text-med-700 text-slate-700 text-xs font-medium py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Simulate Dosage</span>
              </button>
            </div>

            {/* Step 5: Stop Recording */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-800">5. Stop Recording</span>
                <button
                  type="button"
                  onClick={() => toggleStep(5)}
                  className={`text-xs ${completedSteps[5] ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">
                Click Stop to end speech recognition.
              </p>
              {isRecording ? (
                <button
                  type="button"
                  onClick={() => { onStopRecording(); toggleStep(5); }}
                  className="w-full bg-rose-600 text-white text-xs font-bold py-1 px-2 rounded flex items-center justify-center gap-1"
                >
                  <Square className="w-3 h-3 fill-white" />
                  <span>Stop Active Recording</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleStep(5)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs py-1 px-2 rounded"
                >
                  Mark Tested
                </button>
              )}
            </div>

            {/* Steps 6-9: Persist & Verify */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-800">6-9. Save & Refresh</span>
                <button
                  type="button"
                  onClick={() => { toggleStep(6); toggleStep(7); toggleStep(8); toggleStep(9); }}
                  className={`text-xs ${(completedSteps[7] && completedSteps[9]) ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">
                Consultation stays saved in local storage.
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => { onSaveConsultation(); toggleStep(7); }}
                  className="flex-1 bg-slate-100 hover:bg-med-50 hover:text-med-700 text-slate-700 text-xs font-medium py-1 px-2 rounded flex items-center justify-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleStep(8);
                    toggleStep(9);
                    window.location.reload();
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs p-1 rounded"
                  title="Reload page to test persistence"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
