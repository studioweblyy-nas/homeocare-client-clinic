/**
 * HOMEOCARE - Web Speech Recognition Service
 * Handles browser speech recognition, language selection (hi-IN, en-IN, en-US),
 * interim transcripts, microphone permission errors, and safe non-destructive appending.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', label: 'Hindi (भारत - हिन्दी)', shortLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en-IN', label: 'English (India - Hinglish)', shortLabel: 'EN-IN', flag: '🇮🇳' },
  { code: 'en-US', label: 'English (US)', shortLabel: 'EN-US', flag: '🇺🇸' },
];

export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
};

export class VoiceRecognitionManager {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.currentLanguage = 'en-IN'; // default to English (India) / Hinglish
    this.onInterimCallback = null;
    this.onFinalCallback = null;
    this.onErrorCallback = null;
    this.onStatusChangeCallback = null;
    this.targetFieldId = null;
    this.restartAttempts = 0;
    this.shouldKeepListening = false;
  }

  init() {
    if (!isSpeechRecognitionSupported()) {
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    // Enable continuous listening and interim real-time results
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = this.currentLanguage;

    this.recognition.onstart = () => {
      this.isRecording = true;
      this.restartAttempts = 0;
      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback({
          status: 'recording',
          fieldId: this.targetFieldId,
          lang: this.currentLanguage
        });
      }
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' ';
        } else {
          interimTranscript += transcriptPart;
        }
      }

      if (interimTranscript && this.onInterimCallback) {
        this.onInterimCallback(interimTranscript);
      }

      if (finalTranscript && this.onFinalCallback) {
        this.onFinalCallback(finalTranscript.trim());
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition error event:', event.error);
      let userFriendlyMessage = 'Speech recognition error occurred.';

      switch (event.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          userFriendlyMessage = 'Microphone access was denied. Please allow microphone permissions in your browser address bar (lock/tune icon) to speak.';
          this.shouldKeepListening = false;
          break;
        case 'no-speech':
          userFriendlyMessage = 'No speech was detected. Please speak closer to the microphone.';
          // don't abort immediately on no-speech if continuous
          return;
        case 'audio-capture':
          userFriendlyMessage = 'No microphone was found. Please ensure a microphone is connected and configured.';
          this.shouldKeepListening = false;
          break;
        case 'network':
          userFriendlyMessage = 'Network connection issue with speech service. Check your internet connection.';
          break;
        case 'aborted':
          // User aborted manually
          return;
        default:
          userFriendlyMessage = `Recognition issue: ${event.error}. You can retry or edit text manually.`;
      }

      if (this.onErrorCallback) {
        this.onErrorCallback({
          error: event.error,
          message: userFriendlyMessage,
          fieldId: this.targetFieldId
        });
      }

      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback({
          status: 'error',
          error: userFriendlyMessage,
          fieldId: this.targetFieldId
        });
      }
    };

    this.recognition.onend = () => {
      if (this.shouldKeepListening && this.isRecording) {
        // Automatically resume if user hasn't explicitly clicked stop
        try {
          this.recognition.start();
          return;
        } catch (e) {
          // ignore already started error
        }
      }

      this.isRecording = false;
      this.shouldKeepListening = false;
      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback({
          status: 'idle',
          fieldId: this.targetFieldId
        });
      }
    };

    return true;
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
      // If currently recording, restart with new language
      if (this.isRecording) {
        this.stop();
        setTimeout(() => {
          this.start(this.targetFieldId);
        }, 150);
      }
    }
  }

  start(fieldId, callbacks = {}) {
    if (!this.recognition) {
      this.init();
    }

    if (!this.recognition) {
      if (callbacks.onError) {
        callbacks.onError({
          error: 'not-supported',
          message: 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'
        });
      }
      return false;
    }

    // If already recording for another field, stop first
    if (this.isRecording) {
      this.stop();
    }

    this.targetFieldId = fieldId;
    this.shouldKeepListening = true;
    this.onInterimCallback = callbacks.onInterim || null;
    this.onFinalCallback = callbacks.onFinal || null;
    this.onErrorCallback = callbacks.onError || null;
    this.onStatusChangeCallback = callbacks.onStatusChange || null;

    try {
      this.recognition.lang = this.currentLanguage;
      this.recognition.start();
      return true;
    } catch (err) {
      console.warn('Recognition start caught error:', err);
      if (callbacks.onError) {
        callbacks.onError({
          error: 'start-failed',
          message: 'Failed to start microphone. Please check permissions.'
        });
      }
      return false;
    }
  }

  stop() {
    this.shouldKeepListening = false;
    if (this.recognition && this.isRecording) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Error stopping recognition:', e);
      }
    }
    this.isRecording = false;
  }

  abort() {
    this.shouldKeepListening = false;
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        console.warn('Error aborting recognition:', e);
      }
    }
    this.isRecording = false;
  }
}

// Global Singleton Instance
export const voiceManager = new VoiceRecognitionManager();

/**
 * Helper to safely append voice recognized text to existing content
 * Preserves text already entered, avoids overwriting notes.
 */
export const appendDictationText = (existingText = '', newText = '') => {
  if (!newText || !newText.trim()) return existingText;
  const trimmedExisting = (existingText || '').trim();
  const trimmedNew = newText.trim();

  if (!trimmedExisting) return trimmedNew;

  // If existing ends with a period, comma, colon or newline, append with space
  const lastChar = trimmedExisting.slice(-1);
  if (['.', ',', '!', '?', ':', ';'].includes(lastChar)) {
    return `${trimmedExisting} ${trimmedNew}`;
  }
  if (lastChar === '\n') {
    return `${trimmedExisting}${trimmedNew}`;
  }

  // Otherwise add a space between them
  return `${trimmedExisting} ${trimmedNew}`;
};
