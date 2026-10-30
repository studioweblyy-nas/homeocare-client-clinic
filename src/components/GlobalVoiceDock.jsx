import React from 'react';
import { Mic, Square, Trash2, RotateCcw, Volume2, Globe, AlertCircle, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/speechRecognition';

export default function GlobalVoiceDock({
  isRecording,
  activeFieldId,
  activeFieldName,
  selectedLanguage,
  onLanguageChange,
  interimTranscript,
  lastRecognizedChunk,
  onStopRecording,
  onClearActiveField,
  onUndoLastChunk,
  permissionError,
  isSupported,
}) {
  return (
    <aside 
      aria-label="Doctor Voice Dictation Dock"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-5xl mx-auto no-print pointer-events-none"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-float rounded-2xl p-2.5 px-4 transition-all pointer-events-auto">
        {/* Support Warning Banner */}
        {!isSupported && (
          <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Note:</strong> Browser speech recognition not supported. Use Google Chrome or Edge for live microphone input (or use the test presets).
            </span>
          </div>
        )}

        {/* Permission Error Banner */}
        {permissionError && (
          <div className="mb-2 p-2 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between gap-2 text-xs text-rose-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{permissionError}</span>
            </div>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-rose-200 font-semibold">
              Check Browser Mic Icon
            </span>
          </div>
        )}

        {/* Main Dock Flex Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          
          {/* Left: Active Dictation Target & Status */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {isRecording ? (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
                <span className="text-xs font-bold text-rose-700 tracking-wide">
                  Listening
                </span>
                {/* Visual Audio Wave */}
                <div className="flex items-center gap-0.5 ml-1 h-3.5">
                  <span className="wave-bar w-0.5 bg-rose-500 rounded-full inline-block"></span>
                  <span className="wave-bar w-0.5 bg-rose-600 rounded-full inline-block"></span>
                  <span className="wave-bar w-0.5 bg-rose-500 rounded-full inline-block"></span>
                  <span className="wave-bar w-0.5 bg-rose-600 rounded-full inline-block"></span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <Mic className="w-3.5 h-3.5 text-med-600" />
                <span>Voice Ready</span>
              </div>
            )}

            <div className="text-xs truncate max-w-[180px] sm:max-w-[220px]">
              <span className="text-slate-400 mr-1">Target:</span>
              <span className="font-semibold text-slate-800">
                {activeFieldName || 'Click any field mic'}
              </span>
            </div>
          </div>

          {/* Middle: Transcript Display */}
          <div className="w-full sm:flex-1 max-w-xl bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 min-h-[36px] flex items-center overflow-x-auto text-xs">
            {isRecording ? (
              interimTranscript ? (
                <div className="flex items-center gap-1.5 text-slate-800">
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold uppercase">
                    Live:
                  </span>
                  <span className="font-medium italic animate-pulse">
                    "{interimTranscript}"
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 italic flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                  Speak now in Hindi, English, or Hinglish...
                </span>
              )
            ) : lastRecognizedChunk ? (
              <div className="text-slate-600 truncate">
                <span className="text-[10px] font-semibold text-slate-400 uppercase mr-1">Captured:</span>
                "{lastRecognizedChunk}"
              </div>
            ) : (
              <span className="text-slate-400 text-[11px] truncate">
                Tap "Speak" on any field to dictate symptoms or dosages hands-free.
              </span>
            )}
          </div>

          {/* Right: Language & Action Controls */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            {/* Language Selector */}
            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors flex items-center gap-1 ${
                    selectedLanguage === lang.code
                      ? 'bg-white text-med-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={lang.label}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* Stop / Actions */}
            {isRecording ? (
              <button
                type="button"
                onClick={onStopRecording}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Square className="w-3 h-3 fill-white" />
                <span>Stop</span>
              </button>
            ) : (
              activeFieldId && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={onUndoLastChunk}
                    title="Undo last text chunk"
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded text-xs flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={onClearActiveField}
                    title="Clear current field text"
                    className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
