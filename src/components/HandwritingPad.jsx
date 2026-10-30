import React, { useRef, useState, useEffect } from 'react';
import VoiceMicButton from './VoiceMicButton';
import { 
  PenTool, 
  Eraser, 
  RotateCcw, 
  Trash2, 
  Mic, 
  Check, 
  FileSignature, 
  Sparkles
} from 'lucide-react';

export default function HandwritingPad({
  handwritingDataUrl,
  onSaveHandwriting,
  handwritingNotes,
  onChangeHandwritingNotes,
  recordingFieldId,
  onStartVoice,
  onStopVoice,
  onQuickSimulateText
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0f172a');
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState('pen');
  const [history, setHistory] = useState([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (handwritingDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setHasDrawn(true);
      };
      img.src = handwritingDataUrl;
    }
  }, [handwritingDataUrl]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-15), imageData]);
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
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
    saveState();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoordinates(e);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas && onSaveHandwriting) {
      onSaveHandwriting(canvas.toDataURL('image/png'));
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const prevHistory = [...history];
    const previousState = prevHistory.pop();
    setHistory(prevHistory);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      if (onSaveHandwriting) {
        onSaveHandwriting(canvas.toDataURL('image/png'));
      }
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveState();
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    if (onSaveHandwriting) {
      onSaveHandwriting('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Sleek Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Digital Handwriting Pad & Synchronized Voice Notes
          </h2>
          <p className="text-xs text-slate-500">
            Scribble clinical diagrams or rubrics with stylus/mouse, and dictate accompanying notes with voice.
          </p>
        </div>

        {hasDrawn && (
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200 flex items-center gap-1 self-start sm:self-auto">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>Sketch Saved</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Canvas Column */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col">
          {/* Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTool('pen')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                  tool === 'pen' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <PenTool className="w-3 h-3" />
                <span>Pen</span>
              </button>

              <button
                type="button"
                onClick={() => setTool('eraser')}
                className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                  tool === 'eraser' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Eraser className="w-3 h-3" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
              {[
                { hex: '#0f172a', label: 'Black' },
                { hex: '#2563eb', label: 'Blue' },
                { hex: '#dc2626', label: 'Red' },
                { hex: '#059669', label: 'Green' }
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => { setColor(c.hex); setTool('pen'); }}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    color === c.hex && tool === 'pen' ? 'scale-125 border-slate-900 ring-2 ring-med-400' : 'border-white'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>

            {/* Thickness & Undo */}
            <div className="flex items-center gap-1.5">
              <select
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-1 font-medium text-slate-700"
              >
                <option value={2}>Fine</option>
                <option value={4}>Medium</option>
                <option value={7}>Thick</option>
              </select>

              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="p-1 rounded text-slate-500 hover:text-slate-800 disabled:opacity-30"
                title="Undo stroke"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded text-slate-400 hover:text-rose-500"
                title="Clear pad"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative border border-slate-200 rounded-lg bg-white overflow-hidden cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={700}
              height={380}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[320px] block touch-none"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-300 gap-1.5">
                <PenTool className="w-7 h-7 stroke-[1.5]" />
                <p className="text-xs font-medium">Draw with stylus, finger, or mouse</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes Column */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-800 text-xs">
                Accompanying Voice Notes
              </span>
              <VoiceMicButton
                isRecording={recordingFieldId === 'handwritingNotes'}
                onClick={() => onStartVoice('handwritingNotes', 'Handwriting & Voice Notes')}
                onStop={onStopVoice}
                label="Speak"
                stopLabel="Stop"
              />
            </div>

            <textarea
              rows={11}
              value={handwritingNotes || ''}
              onChange={(e) => onChangeHandwritingNotes(e.target.value)}
              placeholder="Dictate or type clinical notes and impressions..."
              className={`w-full p-2.5 rounded-lg text-slate-800 text-xs leading-relaxed border transition-colors ${
                recordingFieldId === 'handwritingNotes'
                  ? 'border-rose-400 bg-rose-50/20'
                  : 'border-slate-200 bg-slate-50/30 hover:bg-white focus:bg-white focus:border-med-500'
              }`}
            />
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Voice & sketch saved together</span>
            <button
              type="button"
              onClick={() => onQuickSimulateText('handwritingNotes', 'Patient exhibits marked anxiety. Tongue shows mapped patches with red papillae.')}
              className="text-med-600 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Sample</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
