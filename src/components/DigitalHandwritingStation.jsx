import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  PenTool, 
  Eraser, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  Download, 
  Save, 
  Maximize2, 
  Minimize2, 
  Check, 
  Mic, 
  Square,
  Sparkles,
  Info,
  Layers,
  FileCheck2,
  ChevronRight
} from 'lucide-react';
import VoiceMicButton from './VoiceMicButton';

export const HANDWRITING_SECTIONS = [
  { id: 'chiefComplaints', label: 'Chief Complaints', hindi: 'मुख्य लक्षण', icon: '🩺' },
  { id: 'mentalGenerals', label: 'Mental Generals', hindi: 'मानसिक प्रकृति', icon: '🧠' },
  { id: 'physicalGenerals', label: 'Physical Generals', hindi: 'शारीरिक सामान्य', icon: '🍎' },
  { id: 'thermalGenerals', label: 'Thermal Generals', hindi: 'तापीय प्रकृति', icon: '🌡️' },
  { id: 'doctorObservations', label: 'Doctor Observations', hindi: 'चिकित्सक प्रेक्षण', icon: '👁️' },
  { id: 'dailyDosage', label: 'Daily Dosage', hindi: 'दैनिक खुराक', icon: '🕒' },
  { id: 'specialInstructions', label: 'Special Instructions', hindi: 'विशेष निर्देश', icon: '⚠️' }
];

export default function DigitalHandwritingStation({
  patient,
  handwritingSectionsData = {},
  onSaveSectionHandwriting,
  handwritingNotes = {},
  onChangeSectionNotes,
  recordingFieldId,
  onStartVoice,
  onStopVoice,
  onQuickSimulateText
}) {
  const [activeSection, setActiveSection] = useState('chiefComplaints');
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Drawing states
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0f172a'); // default navy/slate
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState('pen'); // 'pen' | 'eraser'
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const lastPointRef = useRef(null);

  // Load section handwriting into canvas when activeSection or patient changes
  const loadCanvasData = useCallback((dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasDrawn(true);
      };
      img.src = dataUrl;
    } else {
      setHasDrawn(false);
    }
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  useEffect(() => {
    const dataUrl = handwritingSectionsData[activeSection] || '';
    loadCanvasData(dataUrl);
  }, [activeSection, patient?.id, loadCanvasData]);

  // Snapshot current canvas state for undo
  const saveStateForUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev.slice(-20), imageData]); // keep last 20 states
    setRedoStack([]); // reset redo on new stroke
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    saveStateForUndo();
    const { x, y } = getCanvasCoordinates(e);
    lastPointRef.current = { x, y };
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const currentPoint = getCanvasCoordinates(e);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = lineWidth * 2.5; // wider eraser for comfort
    } else {
      ctx.strokeStyle = color;
    }

    // Smooth quadratic curve between points
    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      const midPoint = {
        x: (lastPointRef.current.x + currentPoint.x) / 2,
        y: (lastPointRef.current.y + currentPoint.y) / 2
      };
      ctx.quadraticCurveTo(lastPointRef.current.x, lastPointRef.current.y, midPoint.x, midPoint.y);
      ctx.stroke();
    }

    lastPointRef.current = currentPoint;
    setHasDrawn(true);
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    lastPointRef.current = null;

    // Automatically persist to section state
    const canvas = canvasRef.current;
    if (canvas && onSaveSectionHandwriting) {
      const dataUrl = canvas.toDataURL('image/png');
      onSaveSectionHandwriting(activeSection, dataUrl);
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Save current to redo stack
    const currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRedoStack(prev => [...prev, currentImageData]);

    const prevStack = [...undoStack];
    const previousState = prevStack.pop();
    setUndoStack(prevStack);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      if (onSaveSectionHandwriting) {
        onSaveSectionHandwriting(activeSection, canvas.toDataURL('image/png'));
      }
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Save current to undo
    const currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev, currentImageData]);

    const nextStack = [...redoStack];
    const nextState = nextStack.pop();
    setRedoStack(nextStack);

    if (nextState) {
      ctx.putImageData(nextState, 0, 0);
      if (onSaveSectionHandwriting) {
        onSaveSectionHandwriting(activeSection, canvas.toDataURL('image/png'));
      }
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.confirm(`Clear all handwritten notes for "${currentSectionInfo?.label}"?`)) {
      return;
    }
    saveStateForUndo();
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    if (onSaveSectionHandwriting) {
      onSaveSectionHandwriting(activeSection, '');
    }
  };

  const handleManualSave = () => {
    const canvas = canvasRef.current;
    if (canvas && onSaveSectionHandwriting) {
      onSaveSectionHandwriting(activeSection, canvas.toDataURL('image/png'));
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a styled export canvas with clinic stamp
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height + 60;
    const expCtx = exportCanvas.getContext('2d');

    // Fill clean white background
    expCtx.fillStyle = '#ffffff';
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw clinic header banner on export
    expCtx.fillStyle = '#0f766e';
    expCtx.fillRect(0, 0, exportCanvas.width, 36);
    expCtx.fillStyle = '#ffffff';
    expCtx.font = 'bold 14px sans-serif';
    expCtx.fillText(`HOMEOCARE CLINIC — ${currentSectionInfo?.label.toUpperCase()}`, 16, 23);

    expCtx.fillStyle = '#64748b';
    expCtx.font = '12px sans-serif';
    expCtx.fillText(`Patient: ${patient?.name || 'Walk-in'} (${patient?.id}) | Date: ${new Date().toLocaleDateString('en-IN')}`, 16, exportCanvas.height - 10);

    // Draw main drawing
    expCtx.drawImage(canvas, 0, 42);

    // Trigger download
    const link = document.createElement('a');
    link.download = `HOMEOCARE_${patient?.id || 'Patient'}_${activeSection}_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const currentSectionInfo = HANDWRITING_SECTIONS.find(s => s.id === activeSection);
  const currentNotesValue = handwritingNotes[activeSection] || '';

  return (
    <div className={`space-y-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto' : ''}`}>
      
      {/* Top Section Navigation Ribbon */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm">
            ✍️
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Doctor's Digital Writing Pad</span>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Stylus & Touch Ready
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Select any rubric section below to write symptoms, diagrams, or dosages naturally.
            </p>
          </div>
        </div>

        {/* Action Buttons: Fullscreen & Save */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            type="button"
            onClick={handleManualSave}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
              justSaved 
                ? 'bg-emerald-600 text-white' 
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {justSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{justSaved ? 'Saved Locally' : 'Save Notes'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPNG}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
            title="Download handwritten sketch as high-resolution PNG"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">PNG Export</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
            title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen Writing Mode"}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5 text-teal-700" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-600" />}
            <span className="hidden sm:inline">{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* 7 Dedicated Rubric Section Tabs */}
      <div className="bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        {HANDWRITING_SECTIONS.map((sec) => {
          const isSelected = activeSection === sec.id;
          const sectionHasDrawing = !!handwritingSectionsData[sec.id];
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-white text-teal-900 shadow-sm border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>{sec.icon}</span>
              <span>{sec.label}</span>
              {sectionHasDrawing && (
                <span className="w-2 h-2 rounded-full bg-teal-500" title="Contains saved drawing" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Handwriting Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Big Canvas + Floating Controls (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col">
          
          {/* Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
            
            {/* Pen & Eraser Selection */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTool('pen')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  tool === 'pen'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-teal-700" />
                <span>Stylus / Pen</span>
              </button>

              <button
                type="button"
                onClick={() => setTool('eraser')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  tool === 'eraser'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eraser className="w-3.5 h-3.5 text-rose-600" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Color Palette (5 Classical Medical Colors) */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl">
              <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">Color:</span>
              {[
                { hex: '#0f172a', label: 'Doctor Navy Black' },
                { hex: '#1d4ed8', label: 'Clinical Blue' },
                { hex: '#059669', label: 'Homeopathic Emerald' },
                { hex: '#dc2626', label: 'Modality Red' },
                { hex: '#7c3aed', label: 'Miasmatic Purple' }
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => { setColor(c.hex); setTool('pen'); }}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    color === c.hex && tool === 'pen'
                      ? 'scale-125 border-slate-900 ring-2 ring-teal-400'
                      : 'border-white hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                  aria-label={c.label}
                />
              ))}
            </div>

            {/* Thickness Chips & Slider */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-xl">
              <span className="text-[11px] text-slate-400 mr-1 hidden md:inline">Stroke:</span>
              {[
                { width: 2, label: 'Fine' },
                { width: 4, label: 'Medium' },
                { width: 7, label: 'Thick' },
                { width: 12, label: 'Marker' }
              ].map((w) => (
                <button
                  key={w.width}
                  type="button"
                  onClick={() => setLineWidth(w.width)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
                    lineWidth === w.width
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>

            {/* Undo, Redo & Clear */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleUndo}
                disabled={undoStack.length === 0}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Undo last stroke"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleRedo}
                disabled={redoStack.length === 0}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Redo stroke"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                title="Clear section writing pad"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Drawing Canvas Element with Touch, Stylus and Mouse Handling */}
          <div className="relative border-2 border-dashed border-slate-200/90 rounded-2xl bg-white overflow-hidden shadow-inner cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={900}
              height={isFullScreen ? 600 : 440}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className={`w-full block touch-none select-none ${isFullScreen ? 'h-[65vh]' : 'h-[380px] sm:h-[420px]'}`}
            />

            {/* Subtle Watermark Indicator when empty */}
            {!hasDrawn && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-300 gap-2">
                <span className="text-3xl opacity-50">{currentSectionInfo?.icon}</span>
                <p className="text-sm font-semibold text-slate-400">
                  Write or sketch {currentSectionInfo?.label} with your stylus, mouse or finger
                </p>
                <p className="text-xs text-slate-300">
                  Touchscreen & stylus pressure enabled • Auto-saved to patient record
                </p>
              </div>
            )}
          </div>

          {/* Section Indicator Footer */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Writing Section:</span>
              <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {currentSectionInfo?.label} ({currentSectionInfo?.hindi})
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Preserved across tab switches & consultations
            </span>
          </div>

        </div>

        {/* Right Column: Voice Dictation & Text Synchronized Area (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold">
                  🎙️
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">
                    {currentSectionInfo?.label} Voice Notes
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Natural speech in Hindi, English or Hinglish
                  </p>
                </div>
              </div>

              <VoiceMicButton
                isRecording={recordingFieldId === activeSection}
                onClick={() => onStartVoice(activeSection, `${currentSectionInfo?.label} (Voice)`)}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>

            <textarea
              rows={isFullScreen ? 18 : 12}
              value={currentNotesValue}
              onChange={(e) => onChangeSectionNotes(activeSection, e.target.value)}
              placeholder={`Dictate or type clinical details for ${currentSectionInfo?.label}... \ne.g. "Patient ko subah uthte samay headache hota hai..."`}
              className={`w-full p-3 rounded-xl text-slate-800 text-xs sm:text-sm leading-relaxed border transition-colors resize-none ${
                recordingFieldId === activeSection
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200 ring-2'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-teal-600'
              }`}
            />
          </div>

          {/* Quick Voice Sample Generator for Testing & Ease */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-[11px] text-slate-400">Audio sync enabled</span>
            <button
              type="button"
              onClick={() => {
                const sampleQuotes = {
                  chiefComplaints: 'Patient ko subah uthte samay headache hota hai. Dard forehead area mein hai aur light se problem hoti hai.',
                  mentalGenerals: 'Extremely irritable when questioned. Hurry in all activities. Anxiety regarding health and business.',
                  physicalGenerals: 'Thirst for large gulps of ice-cold water. Craves sour pickles and spicy foods. Profuse head sweat.',
                  thermalGenerals: 'Distinctly chilly patient. Wants fan off and covered in light blanket even during mild autumn.',
                  doctorObservations: 'Flushed face, pupils slightly dilated. White fur coating posterior tongue. BP 130/84 mmHg.',
                  dailyDosage: 'Subah aur shaam paanch globules khane ke baad lena hai.',
                  specialInstructions: 'Do not touch globules with bare fingers. Avoid raw onion, garlic, coffee 30 mins before/after.'
                };
                onQuickSimulateText(activeSection, sampleQuotes[activeSection] || 'Patient responds favorably to indicated remedy.');
              }}
              className="text-teal-700 hover:text-teal-900 font-semibold bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>Sample Voice</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
