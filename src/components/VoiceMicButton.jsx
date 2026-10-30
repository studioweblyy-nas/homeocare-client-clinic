import React from 'react';
import { Mic, Square, Loader2, Check, AlertCircle } from 'lucide-react';

/**
 * Modern, Breathable VoiceMicButton Component
 * - Clean medical styling with high visual clarity
 * - Crisp state transitions: Idle (Soft Blue) -> Recording (Pulsing Red) -> Processing -> Done
 * - Clear dual English/Hindi labels
 */
export default function VoiceMicButton({
  isRecording = false,
  isProcessing = false,
  isCompleted = false,
  errorMessage = '',
  onClick,
  onStop,
  label = 'Tap to Speak',
  stopLabel = 'Stop',
  size = 'medium',
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (isRecording) {
      if (onStop) onStop();
      else if (onClick) onClick();
    } else {
      if (onClick) onClick();
    }
  };

  if (size === 'large') {
    return (
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={handleClick}
          aria-label={isRecording ? stopLabel : label}
          className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm active:scale-95 ${
            isRecording
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 shadow-md ring-4 ring-rose-100 animate-pulse'
              : isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : errorMessage
              ? 'bg-amber-600 text-white'
              : 'bg-med-600 hover:bg-med-700 text-white shadow-med-100'
          }`}
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4 fill-white" />
              <span>{stopLabel}</span>
              <span className="text-xs bg-rose-800/50 px-2 py-0.5 rounded-md font-normal">
                बंद करें
              </span>
            </>
          ) : isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Listening...</span>
            </>
          ) : isCompleted ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>{label}</span>
              <span className="text-xs bg-med-800/40 px-2 py-0.5 rounded-md font-normal">
                बोलें
              </span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Standard Field-Level Button
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isRecording ? stopLabel : label}
      title={isRecording ? 'Click to stop recording' : 'Click to dictate with voice'}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs active:scale-95 ${
        isRecording
          ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-200 shadow-sm'
          : isProcessing
          ? 'bg-amber-50 text-amber-800 border border-amber-200'
          : isCompleted
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          : 'bg-med-50 hover:bg-med-100 text-med-700 hover:text-med-800 border border-med-200/80 hover:border-med-300'
      }`}
    >
      {isRecording ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Square className="w-3.5 h-3.5 fill-white" />
          <span className="font-bold">{stopLabel}</span>
        </>
      ) : isProcessing ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
          <span>Listening...</span>
        </>
      ) : isCompleted ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Added</span>
        </>
      ) : (
        <>
          <Mic className="w-3.5 h-3.5 text-med-600" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
