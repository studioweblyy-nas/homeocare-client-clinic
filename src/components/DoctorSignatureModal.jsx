import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, Trash2, FileSignature, Sparkles } from 'lucide-react';

export default function DoctorSignatureModal({
  isOpen,
  onClose,
  doctorSignature,
  onSaveSignature
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#0f172a';

    if (doctorSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setHasDrawn(true);
      };
      img.src = doctorSignature;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
    setHistory([]);
  }, [isOpen, doctorSignature]);

  if (!isOpen) return null;

  const getCanvasCoords = (e) => {
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoords(e);
    
    // Save state for undo
    setHistory(prev => [...prev.slice(-10), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const prevStack = [...history];
    const lastState = prevStack.pop();
    setHistory(prevStack);
    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setHistory([]);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSaveSignature(dataUrl);
    onClose();
  };

  const handleLoadSampleSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw elegant cursive doctor signature
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.font = 'italic 34px "Brush Script MT", "Caveat", "Segoe Script", cursive';
    ctx.fillText('Dr. S. K. Sharma', 40, 75);
    ctx.beginPath();
    ctx.moveTo(40, 85);
    ctx.bezierCurveTo(90, 80, 160, 92, 280, 82);
    ctx.stroke();
    setHasDrawn(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-bold text-sm">Doctor Digital Signature</h3>
              <p className="text-[10px] text-slate-400">Dr. S. K. Sharma, B.H.M.S., M.D.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Canvas Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Sign below with your mouse, stylus, or touchscreen. This signature will automatically authenticate all generated clinic prescriptions.
          </p>

          <div className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-white overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              width={420}
              height={140}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-32 block touch-none cursor-crosshair"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-300 text-xs font-medium">
                Sign inside this box
              </div>
            )}
          </div>

          {/* Signature Tools */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30"
                title="Undo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                title="Clear"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleLoadSampleSignature}
              className="text-teal-700 hover:underline text-[11px] font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Use Dr. S. K. Sharma Sample</span>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Signature</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
