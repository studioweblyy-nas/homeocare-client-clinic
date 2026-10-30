import React, { useState, useEffect, useRef } from 'react';
import PatientHeader from './components/PatientHeader';
import CaseTakingForm, { CASE_FIELDS } from './components/CaseTakingForm';
import PrescriptionBuilder from './components/PrescriptionBuilder';
import HandwritingPad from './components/HandwritingPad';
import GlobalVoiceDock from './components/GlobalVoiceDock';
import TestScenariosBar from './components/TestScenariosBar';
import ConsultationReviewModal from './components/ConsultationReviewModal';
import { SAMPLE_PATIENTS } from './data/homeopathicData';
import { 
  voiceManager, 
  isSpeechRecognitionSupported, 
  appendDictationText 
} from './services/speechRecognition';

export default function App() {
  const [selectedPatient, setSelectedPatient] = useState(SAMPLE_PATIENTS[0]);
  const [activeTab, setActiveTab] = useState('case-taking'); // 'case-taking' | 'prescription' | 'handwriting'
  
  // Voice Recognition States
  const [isSupported, setIsSupported] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFieldId, setRecordingFieldId] = useState(null);
  const [activeFieldName, setActiveFieldName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN'); // default to English (India) / Hinglish
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lastRecognizedChunk, setLastRecognizedChunk] = useState('');
  const [permissionError, setPermissionError] = useState('');

  // Consultation Data Models (Saved per Patient)
  const [caseData, setCaseData] = useState({});
  const [prescription, setPrescription] = useState({
    medicines: [
      { id: '1', name: 'Belladonna', potency: '200C', form: 'Globules / Pills (No. 30 / 40)', instructions: '4 pills morning on clean tongue' },
      { id: '2', name: 'Bryonia Alba', potency: '30C', form: 'Globules / Pills (No. 30 / 40)', instructions: '4 pills evening dissolved dry' }
    ],
    dailyDosage: '',
    morningDosage: '',
    afternoonDosage: '',
    eveningDosage: '',
    duration: '',
    specialInstructions: '',
    followupInstructions: ''
  });
  const [handwritingDataUrl, setHandwritingDataUrl] = useState('');
  const [handwritingNotes, setHandwritingNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Undo history buffer for dictation
  const previousValuesRef = useRef({});

  // Check Web Speech API Support on load
  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSupported(supported);
    if (supported) {
      voiceManager.init();
    }
  }, []);

  // Load Saved Consultation from localStorage when Patient changes or app loads
  useEffect(() => {
    const storageKey = `homeocare_consultation_${selectedPatient.id}`;
    const savedRecord = localStorage.getItem(storageKey);

    if (savedRecord) {
      try {
        const parsed = JSON.parse(savedRecord);
        if (parsed.caseData) setCaseData(parsed.caseData);
        if (parsed.prescription) setPrescription(parsed.prescription);
        if (parsed.handwritingDataUrl) setHandwritingDataUrl(parsed.handwritingDataUrl);
        if (parsed.handwritingNotes) setHandwritingNotes(parsed.handwritingNotes);
        setIsSaved(true);
      } catch (e) {
        console.error('Failed to parse saved consultation:', e);
      }
    } else {
      // Default initial state for new patient
      setCaseData({
        chiefComplaints: '',
        locationSensation: '',
        durationFrequency: '',
        aggravatingFactors: '',
        amelioratingFactors: '',
        mentalGenerals: '',
        physicalGenerals: '',
        thermalGenerals: '',
        medicalHistory: '',
        doctorObservations: '',
        caseSummary: ''
      });
      setPrescription({
        medicines: [
          { id: '1', name: 'Belladonna', potency: '200C', form: 'Globules / Pills (No. 30 / 40)', instructions: '4 pills morning' }
        ],
        dailyDosage: '',
        morningDosage: '',
        afternoonDosage: '',
        eveningDosage: '',
        duration: '',
        specialInstructions: '',
        followupInstructions: ''
      });
      setHandwritingDataUrl('');
      setHandwritingNotes('');
      setIsSaved(false);
    }
  }, [selectedPatient.id]);

  // Handle Language Switching (en-IN, hi-IN, en-US)
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    voiceManager.setLanguage(langCode);
  };

  // Helper to get friendly name for any field ID
  const getFieldDisplayName = (fieldId) => {
    const caseField = CASE_FIELDS.find(f => f.id === fieldId);
    if (caseField) return caseField.label;

    const prescriptionMap = {
      dailyDosage: 'Prescription: Daily Dosage',
      morningDosage: 'Prescription: Morning Dosage',
      afternoonDosage: 'Prescription: Afternoon Dosage',
      eveningDosage: 'Prescription: Evening Dosage',
      duration: 'Prescription: Treatment Duration',
      specialInstructions: 'Prescription: Special Instructions',
      followupInstructions: 'Prescription: Follow-up Instructions',
      handwritingNotes: 'Handwriting Pad: Consultation Notes',
    };
    return prescriptionMap[fieldId] || fieldId;
  };

  // Generic updater that applies non-destructive text append
  const applyDictationToField = (fieldId, finalChunk) => {
    setLastRecognizedChunk(finalChunk);
    setIsSaved(false);

    // Save previous value for Undo
    previousValuesRef.current[fieldId] = getCurrentFieldValue(fieldId);

    // If it's a Case Taking field
    if (CASE_FIELDS.some(f => f.id === fieldId)) {
      setCaseData(prev => ({
        ...prev,
        [fieldId]: appendDictationText(prev[fieldId], finalChunk)
      }));
      return;
    }

    // If it's a Prescription field
    if (['dailyDosage', 'morningDosage', 'afternoonDosage', 'eveningDosage', 'duration', 'specialInstructions', 'followupInstructions'].includes(fieldId)) {
      setPrescription(prev => ({
        ...prev,
        [fieldId]: appendDictationText(prev[fieldId], finalChunk)
      }));
      return;
    }

    // If it's Handwriting notes
    if (fieldId === 'handwritingNotes') {
      setHandwritingNotes(prev => appendDictationText(prev, finalChunk));
      return;
    }
  };

  const getCurrentFieldValue = (fieldId) => {
    if (CASE_FIELDS.some(f => f.id === fieldId)) {
      return caseData[fieldId] || '';
    }
    if (['dailyDosage', 'morningDosage', 'afternoonDosage', 'eveningDosage', 'duration', 'specialInstructions', 'followupInstructions'].includes(fieldId)) {
      return prescription[fieldId] || '';
    }
    if (fieldId === 'handwritingNotes') {
      return handwritingNotes || '';
    }
    return '';
  };

  // Start Voice Dictation on a specific field
  const handleStartVoice = (fieldId, label) => {
    setPermissionError('');
    setInterimTranscript('');
    setRecordingFieldId(fieldId);
    setActiveFieldName(label || getFieldDisplayName(fieldId));

    voiceManager.setLanguage(selectedLanguage);

    const started = voiceManager.start(fieldId, {
      onInterim: (text) => {
        setInterimTranscript(text);
      },
      onFinal: (chunk) => {
        setInterimTranscript('');
        applyDictationToField(fieldId, chunk);
      },
      onError: (err) => {
        console.warn('Voice recognition error:', err);
        setPermissionError(err.message || 'Microphone error');
        setIsRecording(false);
        setRecordingFieldId(null);
      },
      onStatusChange: (statusObj) => {
        if (statusObj.status === 'recording') {
          setIsRecording(true);
        } else if (statusObj.status === 'idle') {
          setIsRecording(false);
          setRecordingFieldId(null);
        }
      }
    });

    if (started) {
      setIsRecording(true);
    }
  };

  // Stop Recording explicitly
  const handleStopVoice = () => {
    voiceManager.stop();
    setIsRecording(false);
    setRecordingFieldId(null);
    setInterimTranscript('');
  };

  // Clear a field's content
  const handleClearField = (fieldId) => {
    if (!window.confirm(`Are you sure you want to clear "${getFieldDisplayName(fieldId)}"?`)) {
      return;
    }
    previousValuesRef.current[fieldId] = getCurrentFieldValue(fieldId);

    if (CASE_FIELDS.some(f => f.id === fieldId)) {
      setCaseData(prev => ({ ...prev, [fieldId]: '' }));
    } else if (prescription[fieldId] !== undefined) {
      setPrescription(prev => ({ ...prev, [fieldId]: '' }));
    } else if (fieldId === 'handwritingNotes') {
      setHandwritingNotes('');
    }
    setIsSaved(false);
  };

  // Undo last dictated chunk for active field
  const handleUndoLastChunk = () => {
    if (!recordingFieldId && !activeFieldName) return;
    const targetId = recordingFieldId || Object.keys(previousValuesRef.current).pop();
    if (!targetId) return;

    const previousVal = previousValuesRef.current[targetId];
    if (previousVal !== undefined) {
      if (CASE_FIELDS.some(f => f.id === targetId)) {
        setCaseData(prev => ({ ...prev, [targetId]: previousVal }));
      } else if (prescription[targetId] !== undefined) {
        setPrescription(prev => ({ ...prev, [targetId]: previousVal }));
      } else if (targetId === 'handwritingNotes') {
        setHandwritingNotes(previousVal);
      }
    }
  };

  // Quick Simulation / Test preset injector
  const handleQuickSimulateText = (fieldId, sampleText) => {
    applyDictationToField(fieldId, sampleText);
    setActiveFieldName(getFieldDisplayName(fieldId));
    setLastRecognizedChunk(sampleText);
  };

  // Run Test Preset from Section 8 Test Suite
  const handleRunTestPreset = (preset) => {
    // If it's a prescription field, switch tab to prescription
    if (['dailyDosage', 'morningDosage', 'afternoonDosage', 'eveningDosage', 'duration', 'specialInstructions', 'followupInstructions'].includes(preset.fieldId)) {
      setActiveTab('prescription');
    } else {
      setActiveTab('case-taking');
    }

    // Set matching language
    handleLanguageChange(preset.lang);

    // Apply text to the targeted field
    applyDictationToField(preset.fieldId, preset.text);
    setActiveFieldName(getFieldDisplayName(preset.fieldId));

    // Scroll element into view smoothly
    setTimeout(() => {
      const el = document.getElementById(`field-${preset.fieldId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
    }, 100);
  };

  // Save Complete Consultation to localStorage
  const handleSaveConsultation = () => {
    const storageKey = `homeocare_consultation_${selectedPatient.id}`;
    const payload = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      savedAt: new Date().toISOString(),
      caseData,
      prescription,
      handwritingDataUrl,
      handwritingNotes
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setIsSaved(true);
      setTimeout(() => {
        // Show subtle reassurance
      }, 2000);
    } catch (e) {
      alert('Could not save to local storage: ' + e.message);
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      {/* Patient Header & Navigation */}
      <PatientHeader
        selectedPatient={selectedPatient}
        onSelectPatient={setSelectedPatient}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSaveConsultation={handleSaveConsultation}
        isSaved={isSaved}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
      />

      {/* Main Clinic Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 flex-1 w-full">
        
        {/* Interactive 9-Step Test Scenarios Bar */}
        <TestScenariosBar
          onRunTestPreset={handleRunTestPreset}
          onSaveConsultation={handleSaveConsultation}
          isRecording={isRecording}
          onStopRecording={handleStopVoice}
          hasSavedConsultation={isSaved}
        />

        {/* Tab 1: Doctor Case-Taking Rubrics */}
        {activeTab === 'case-taking' && (
          <CaseTakingForm
            caseData={caseData}
            onChangeField={(fieldId, val) => {
              setCaseData(prev => ({ ...prev, [fieldId]: val }));
              setIsSaved(false);
            }}
            onClearField={handleClearField}
            recordingFieldId={recordingFieldId}
            onStartVoice={handleStartVoice}
            onStopVoice={handleStopVoice}
            onQuickSimulateText={handleQuickSimulateText}
          />
        )}

        {/* Tab 2: Voice-to-Text Prescription Builder */}
        {activeTab === 'prescription' && (
          <PrescriptionBuilder
            prescription={prescription}
            onUpdatePrescription={(newPrescription) => {
              setPrescription(newPrescription);
              setIsSaved(false);
            }}
            recordingFieldId={recordingFieldId}
            onStartVoice={handleStartVoice}
            onStopVoice={handleStopVoice}
            onQuickSimulateText={handleQuickSimulateText}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

        {/* Tab 3: Digital Handwriting Pad + Voice */}
        {activeTab === 'handwriting' && (
          <HandwritingPad
            handwritingDataUrl={handwritingDataUrl}
            onSaveHandwriting={(dataUrl) => {
              setHandwritingDataUrl(dataUrl);
              setIsSaved(false);
            }}
            handwritingNotes={handwritingNotes}
            onChangeHandwritingNotes={(text) => {
              setHandwritingNotes(text);
              setIsSaved(false);
            }}
            recordingFieldId={recordingFieldId}
            onStartVoice={handleStartVoice}
            onStopVoice={handleStopVoice}
            onQuickSimulateText={handleQuickSimulateText}
          />
        )}
      </main>

      {/* Floating Global Voice Dock (Section 1 & 6) */}
      <GlobalVoiceDock
        isRecording={isRecording}
        activeFieldId={recordingFieldId}
        activeFieldName={activeFieldName}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        interimTranscript={interimTranscript}
        lastRecognizedChunk={lastRecognizedChunk}
        onStopRecording={handleStopVoice}
        onClearActiveField={() => recordingFieldId && handleClearField(recordingFieldId)}
        onUndoLastChunk={handleUndoLastChunk}
        permissionError={permissionError}
        isSupported={isSupported}
      />

      {/* Doctor Prescription Review & Verification Modal */}
      <ConsultationReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        patient={selectedPatient}
        caseData={caseData}
        prescription={prescription}
        handwritingDataUrl={handwritingDataUrl}
        handwritingNotes={handwritingNotes}
        onPrint={handlePrint}
      />
    </div>
  );
}
