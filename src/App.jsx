import React, { useState, useEffect, useRef } from 'react';
import SmartDoctorCabinHeader from './components/SmartDoctorCabinHeader';
import DoctorOverviewTab from './components/DoctorOverviewTab';
import DigitalHandwritingStation, { HANDWRITING_SECTIONS } from './components/DigitalHandwritingStation';
import QuickPrescriptionBuilder from './components/QuickPrescriptionBuilder';
import PatientTimelineTab from './components/PatientTimelineTab';
import ConsultationReviewModal from './components/ConsultationReviewModal';
import PatientQRModal from './components/PatientQRModal';
import DoctorSignatureModal from './components/DoctorSignatureModal';
import DispensaryQueueModal from './components/DispensaryQueueModal';
import FollowUpDashboardModal from './components/FollowUpDashboardModal';
import ReportsViewerModal from './components/ReportsViewerModal';
import GlobalVoiceDock from './components/GlobalVoiceDock';
import TestScenariosBar from './components/TestScenariosBar';

import { SAMPLE_PATIENTS, CLINIC_PRECAUTIONS } from './data/homeopathicData';
import { 
  voiceManager, 
  isSpeechRecognitionSupported, 
  appendDictationText 
} from './services/speechRecognition';

export default function App() {
  // Active Patient and Navigation
  const [selectedPatient, setSelectedPatient] = useState(SAMPLE_PATIENTS[0]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'case-taking' | 'reports' | 'prescription' | 'timeline'

  // Modal Visibility States
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isDispensaryModalOpen, setIsDispensaryModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  // Doctor Signature (Persisted globally)
  const [doctorSignature, setDoctorSignature] = useState(() => {
    return localStorage.getItem('homeocare_doctor_signature') || '';
  });

  // Voice Recognition States
  const [isSupported, setIsSupported] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFieldId, setRecordingFieldId] = useState(null);
  const [activeFieldName, setActiveFieldName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN'); // hi-IN | en-IN | en-US
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lastRecognizedChunk, setLastRecognizedChunk] = useState('');
  const [permissionError, setPermissionError] = useState('');

  // Per-Patient Handwriting Drawings for all 7 Rubrics
  const [handwritingSectionsData, setHandwritingSectionsData] = useState({});

  // Per-Patient Voice & Written Notes for all 7 Rubrics
  const [handwritingNotes, setHandwritingNotes] = useState({
    chiefComplaints: '',
    mentalGenerals: '',
    physicalGenerals: '',
    thermalGenerals: '',
    doctorObservations: '',
    dailyDosage: '',
    specialInstructions: ''
  });

  // Per-Patient Prescription
  const [prescription, setPrescription] = useState({
    medicines: [
      { id: '1', name: 'Belladonna', potency: '200C', vehicle: 'Globules #40 (Large Pills)', frequency: '4 globules morning on clean tongue' },
      { id: '2', name: 'Bryonia Alba', potency: '30C', vehicle: 'Globules #40 (Large Pills)', frequency: '4 globules evening dissolved dry' }
    ],
    dailyDosage: '4 globules twice daily directly on tongue.',
    morningDosage: 'Subah aur shaam paanch globules khane ke baad lena hai.',
    afternoonDosage: '',
    eveningDosage: '4 globules bedtime dissolved dry on tongue.',
    duration: '15 Days',
    followupInstructions: 'Review after 14 days on 15 Nov 2026',
    precautions: [CLINIC_PRECAUTIONS[0], CLINIC_PRECAUTIONS[1], CLINIC_PRECAUTIONS[2]],
    isDoctorApproved: true
  });

  const previousValuesRef = useRef({});

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSupported(supported);
    if (supported) {
      voiceManager.init();
    }
  }, []);

  // Load Saved Consultation & Handwriting when Patient changes
  useEffect(() => {
    const patientId = selectedPatient.id;
    const hwKey = `homeocare_hw_${patientId}`;
    const notesKey = `homeocare_notes_${patientId}`;
    const rxKey = `homeocare_rx_${patientId}`;

    const savedHw = localStorage.getItem(hwKey);
    const savedNotes = localStorage.getItem(notesKey);
    const savedRx = localStorage.getItem(rxKey);

    if (savedHw) {
      try { setHandwritingSectionsData(JSON.parse(savedHw)); } catch (e) { /* default */ }
    } else {
      setHandwritingSectionsData({});
    }

    if (savedNotes) {
      try { setHandwritingNotes(JSON.parse(savedNotes)); } catch (e) { /* default */ }
    } else {
      setHandwritingNotes({
        chiefComplaints: 'Patient ko subah uthte samay headache hota hai. Dard forehead area mein hai aur light se problem hoti hai.',
        mentalGenerals: 'Anxious regarding business, hurried disposition, irritable if disturbed.',
        physicalGenerals: 'Thirst for large gulps of ice cold water. Profuse head sweat during sleep.',
        thermalGenerals: 'Distinctly chilly patient. Sensitive to drafts of air.',
        doctorObservations: 'Flushed face, pupils slightly dilated. White fur coating on tongue.',
        dailyDosage: '4 globules twice daily.',
        specialInstructions: 'Avoid raw onion, garlic, black coffee 30 mins before/after.'
      });
    }

    if (savedRx) {
      try { setPrescription(JSON.parse(savedRx)); } catch (e) { /* default */ }
    }
  }, [selectedPatient.id]);

  // Next Patient Queue Transition
  const handleNextPatient = () => {
    const currentIndex = SAMPLE_PATIENTS.findIndex(p => p.id === selectedPatient.id);
    const nextIndex = (currentIndex + 1) % SAMPLE_PATIENTS.length;
    setSelectedPatient(SAMPLE_PATIENTS[nextIndex]);
    setActiveTab('overview');
  };

  // Language Change
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    voiceManager.setLanguage(langCode);
  };

  // Save Handwriting for a specific section
  const handleSaveSectionHandwriting = (sectionId, dataUrl) => {
    setHandwritingSectionsData(prev => {
      const next = { ...prev, [sectionId]: dataUrl };
      localStorage.setItem(`homeocare_hw_${selectedPatient.id}`, JSON.stringify(next));
      return next;
    });
  };

  // Save Notes for a specific section
  const handleChangeSectionNotes = (sectionId, text) => {
    setHandwritingNotes(prev => {
      const next = { ...prev, [sectionId]: text };
      localStorage.setItem(`homeocare_notes_${selectedPatient.id}`, JSON.stringify(next));
      return next;
    });
  };

  // Update Prescription with LocalStorage Auto-Save
  const handleUpdatePrescription = (newRx) => {
    setPrescription(newRx);
    localStorage.setItem(`homeocare_rx_${selectedPatient.id}`, JSON.stringify(newRx));
  };

  // Save Doctor Signature
  const handleSaveDoctorSignature = (dataUrl) => {
    setDoctorSignature(dataUrl);
    localStorage.setItem('homeocare_doctor_signature', dataUrl);
  };

  // Apply Recognized Voice Chunk to Active Field / Section
  const applyDictationToField = (fieldId, finalChunk) => {
    setLastRecognizedChunk(finalChunk);

    // If it's one of the 7 Handwriting / Rubric sections
    if (HANDWRITING_SECTIONS.some(s => s.id === fieldId)) {
      setHandwritingNotes(prev => {
        const next = {
          ...prev,
          [fieldId]: appendDictationText(prev[fieldId], finalChunk)
        };
        localStorage.setItem(`homeocare_notes_${selectedPatient.id}`, JSON.stringify(next));
        return next;
      });
      return;
    }

    // If it's a Prescription field
    if (['dailyDosage', 'morningDosage', 'afternoonDosage', 'eveningDosage', 'duration', 'followupInstructions'].includes(fieldId)) {
      setPrescription(prev => {
        const next = {
          ...prev,
          [fieldId]: appendDictationText(prev[fieldId], finalChunk)
        };
        localStorage.setItem(`homeocare_rx_${selectedPatient.id}`, JSON.stringify(next));
        return next;
      });
      return;
    }
  };

  // Start Voice Recognition
  const handleStartVoice = (fieldId, label) => {
    setPermissionError('');
    setInterimTranscript('');
    setRecordingFieldId(fieldId);
    setActiveFieldName(label || fieldId);

    voiceManager.setLanguage(selectedLanguage);

    const started = voiceManager.start(fieldId, {
      onInterim: (text) => setInterimTranscript(text),
      onFinal: (chunk) => {
        setInterimTranscript('');
        applyDictationToField(fieldId, chunk);
      },
      onError: (err) => {
        console.warn('Voice error:', err);
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

  // Stop Voice Recognition
  const handleStopVoice = () => {
    voiceManager.stop();
    setIsRecording(false);
    setRecordingFieldId(null);
    setInterimTranscript('');
  };

  // Quick Simulation text helper
  const handleQuickSimulateText = (fieldId, sampleText) => {
    applyDictationToField(fieldId, sampleText);
    setActiveFieldName(fieldId);
  };

  // Test Runner handler for Section 8
  const handleRunTestPreset = (preset) => {
    handleLanguageChange(preset.lang);
    if (['dailyDosage', 'morningDosage', 'afternoonDosage', 'eveningDosage', 'duration'].includes(preset.fieldId)) {
      setActiveTab('prescription');
    } else {
      setActiveTab('case-taking');
    }
    applyDictationToField(preset.fieldId, preset.text);
    setActiveFieldName(preset.fieldId);
  };

  const handlePrintPrescription = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col pb-28 selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Smart Doctor Cabin Header & Patient Identification */}
      <SmartDoctorCabinHeader
        selectedPatient={selectedPatient}
        onSelectPatient={setSelectedPatient}
        onNextPatient={handleNextPatient}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenQRModal={() => setIsQRModalOpen(true)}
        onOpenSignatureModal={() => setIsSignatureModalOpen(true)}
        onOpenDispensaryModal={() => setIsDispensaryModalOpen(true)}
        onOpenFollowUpModal={() => setIsFollowUpModalOpen(true)}
        doctorSignature={doctorSignature}
      />

      {/* Main Clinical Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-5 sm:px-6 flex-1 w-full">
        
        {/* Compact Testing Suite Ribbon (Section 8 Verification) */}
        <TestScenariosBar
          onRunTestPreset={handleRunTestPreset}
          onSaveConsultation={() => {
            alert('Consultation and handwritten notes saved successfully.');
          }}
          isRecording={isRecording}
          onStopRecording={handleStopVoice}
          hasSavedConsultation={true}
        />

        {/* Tab 1: Doctor Overview */}
        {activeTab === 'overview' && (
          <DoctorOverviewTab
            patient={selectedPatient}
            onNavigateTab={setActiveTab}
            onOpenReportViewer={() => setIsReportsModalOpen(true)}
            onOpenQRModal={() => setIsQRModalOpen(true)}
          />
        )}

        {/* Tab 2: Digital Handwriting Station (Top Priority!) */}
        {activeTab === 'case-taking' && (
          <DigitalHandwritingStation
            patient={selectedPatient}
            handwritingSectionsData={handwritingSectionsData}
            onSaveSectionHandwriting={handleSaveSectionHandwriting}
            handwritingNotes={handwritingNotes}
            onChangeSectionNotes={handleChangeSectionNotes}
            recordingFieldId={recordingFieldId}
            onStartVoice={handleStartVoice}
            onStopVoice={handleStopVoice}
            onQuickSimulateText={handleQuickSimulateText}
          />
        )}

        {/* Tab 3: Previous Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Diagnostic Reports & Pathology Records
                </h2>
                <p className="text-xs text-slate-500">
                  Uploaded blood work, biochemistry panels and digital radiology for {selectedPatient.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReportsModalOpen(true)}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors"
              >
                Launch High-Res Report Viewer
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPatient.reports?.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => setIsReportsModalOpen(true)}
                  className="p-5 bg-slate-50 hover:bg-teal-50/50 rounded-2xl border border-slate-200 cursor-pointer transition-colors space-y-2 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">
                        {rep.type.toUpperCase()} DOCUMENT
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1.5 group-hover:text-teal-900">
                        {rep.title}
                      </h4>
                      <p className="text-xs text-slate-500">{rep.date} • {rep.lab}</p>
                    </div>
                    <span className="text-teal-700 font-bold text-sm">➔</span>
                  </div>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    <strong>Findings:</strong> {rep.findings}
                  </p>

                  <div className="text-[11px] text-teal-800 italic pt-1">
                    Note: "{rep.doctorNote}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Quick Prescription Builder */}
        {activeTab === 'prescription' && (
          <QuickPrescriptionBuilder
            prescription={prescription}
            onUpdatePrescription={handleUpdatePrescription}
            recordingFieldId={recordingFieldId}
            onStartVoice={handleStartVoice}
            onStopVoice={handleStopVoice}
            onQuickSimulateText={handleQuickSimulateText}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

        {/* Tab 5: Patient Timeline & Before/After Comparison */}
        {activeTab === 'timeline' && (
          <PatientTimelineTab
            patient={selectedPatient}
          />
        )}

      </main>

      {/* Floating Island Voice Dock */}
      <GlobalVoiceDock
        isRecording={isRecording}
        activeFieldId={recordingFieldId}
        activeFieldName={activeFieldName}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        interimTranscript={interimTranscript}
        lastRecognizedChunk={lastRecognizedChunk}
        onStopRecording={handleStopVoice}
        onClearActiveField={() => {
          if (recordingFieldId) {
            handleChangeSectionNotes(recordingFieldId, '');
          }
        }}
        onUndoLastChunk={() => {}}
        permissionError={permissionError}
        isSupported={isSupported}
      />

      {/* Official Prescription Review & Print Modal */}
      <ConsultationReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        patient={selectedPatient}
        caseData={handwritingNotes}
        prescription={prescription}
        handwritingSectionsData={handwritingSectionsData}
        doctorSignature={doctorSignature}
        onPrint={handlePrintPrescription}
      />

      {/* Unique Feature Modals */}
      <PatientQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        patient={selectedPatient}
      />

      <DoctorSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        doctorSignature={doctorSignature}
        onSaveSignature={handleSaveDoctorSignature}
      />

      <DispensaryQueueModal
        isOpen={isDispensaryModalOpen}
        onClose={() => setIsDispensaryModalOpen(false)}
      />

      <FollowUpDashboardModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        onSelectPatient={setSelectedPatient}
      />

      <ReportsViewerModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        patient={selectedPatient}
      />

    </div>
  );
}
