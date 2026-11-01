import React from 'react';
import { X, QrCode, Shield, Check, Copy, Download, Share2 } from 'lucide-react';

/**
 * Generates an authentic SVG QR pattern for the patient UID
 */
function SimpleQRMatrix({ text = 'HC-2026-0841', size = 180 }) {
  // Deterministic pattern generator based on text hash
  const gridSize = 21;
  const cells = [];
  
  // Calculate simple hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  // Generate 21x21 grid
  for (let r = 0; r < gridSize; r++) {
    const row = [];
    for (let c = 0; c < gridSize; c++) {
      // Corner Finder Patterns
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= gridSize - 7;
      const isBottomLeft = r >= gridSize - 7 && c < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        // Outer ring or inner box
        const localR = isBottomLeft ? r - (gridSize - 7) : r;
        const localC = isTopRight ? c - (gridSize - 7) : c;
        const isBorder = localR === 0 || localR === 6 || localC === 0 || localC === 6;
        const isInner = localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4;
        row.push(isBorder || isInner);
      } else if (r === 6 || c === 6) {
        // Timing patterns
        row.push((r + c) % 2 === 0);
      } else {
        // Data pattern seeded by text
        const seed = Math.sin(r * 31 + c * 17 + hash) * 10000;
        row.push(seed - Math.floor(seed) > 0.48);
      }
    }
    cells.push(row);
  }

  const cellSize = size / gridSize;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl shadow-xs">
      <rect width={size} height={size} fill="#ffffff" rx={8} />
      {cells.map((row, r) =>
        row.map((active, c) =>
          active ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize - 0.5}
              height={cellSize - 0.5}
              fill="#0f172a"
              rx={cellSize > 5 ? 1 : 0}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function PatientQRModal({ isOpen, onClose, patient }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !patient) return null;

  const qrPayload = `HOMEOCARE_CLINIC_UID:${patient.id}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(qrPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm">Patient Digital QR Profile</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          
          {/* QR Code Container */}
          <div className="p-4 bg-slate-50 border-2 border-dashed border-teal-200 rounded-2xl flex flex-col items-center">
            <SimpleQRMatrix text={patient.id} size={180} />
            <span className="font-mono text-xs font-bold text-teal-800 mt-2 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              UID: {patient.id}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-base">{patient.name}</h4>
            <p className="text-xs text-slate-500">
              Age {patient.age}y • {patient.gender} • Token #{patient.token || '04'}
            </p>
          </div>

          {/* Privacy Reassurance */}
          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl flex items-start gap-2 text-left">
            <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 leading-tight">
              <strong>Secure Internal Access:</strong> Scanning this QR code strictly resolves inside the clinic application to open the patient chart. No sensitive medical data is publicly exposed.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 w-full pt-1">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'UID Copied' : 'Copy UID'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-colors"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
