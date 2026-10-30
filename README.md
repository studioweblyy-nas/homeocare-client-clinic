# HOMEOCARE — Homeopathic Clinic Management System
## Voice-to-Text Clinical Suite for Senior Practitioners

HOMEOCARE is an elder-accessible clinical workstation designed specifically for homeopathic doctors. It features complete hands-free and voice-assisted case-taking, repertory analysis, classical homeopathic prescription generation, and synchronized digital stylus handwriting.

### Location
- **Project Directory:** `C:\Users\Admin\homeocare`
- **Active Dev Server:** `http://127.0.0.1:5173/`

---

### Key Capabilities

1. **Global Voice Dictation (Web Speech API)**
   - High-contrast, large-format microphone controls with tactile feedback.
   - States: Idle (`Tap to Speak`), Recording (Pulsing Red + Audio Waveform), Processing, Completed, and Error handling.
   - Non-destructive text appending: retains existing clinical observations without overwriting.
   - Real-time live transcript feed with interim and final speech recognition.

2. **Full Classical Case-Taking Coverage (11 Rubric Fields)**
   - Chief Complaints (मुख्य शिकायतें)
   - Location & Sensation (स्थान एवं अनुभूति)
   - Duration & Frequency (अवधि एवं आवृत्ति)
   - Aggravating Factors (< Modalities / तकलीफ बढ़ाने वाले कारक)
   - Ameliorating Factors (> Modalities / आराम देने वाले कारक)
   - Mental Generals (मानसिक लक्षण)
   - Physical Generals (शारीरिक लक्षण: भूख, प्यास, नींद, पसीना)
   - Thermal Generals (तापीय प्रकृति: Chilly / Hot / Ambithermal)
   - Medical & Family History (चिकित्सीय इतिहास)
   - Doctor's Observations (चिकित्सक का प्रेक्षण: जीभ, नाड़ी, चाल)
   - Case Summary & Miasmatic Synthesis (केस सारांश)

3. **Multilingual & Hinglish Support**
   - 🇮🇳 **Hindi (`hi-IN`)**: Full Devanagari speech recognition.
   - 🇮🇳 **English (India - `en-IN`)**: Optimized for Indian clinical accents and Hinglish mixed phrases.
   - 🇺🇸 **English (US - `en-US`)**: Standard international English.
   - Preserves original doctor phrases without forced translation.

4. **Homeopathic Prescription Builder & Ambiguity Protection**
   - Voice dictation for:
     - Daily Dosage
     - Morning Dosage
     - Afternoon Dosage
     - Evening Dosage
     - Duration of treatment
     - Dietary restrictions & special instructions (No raw onion, garlic, coffee)
     - Follow-up instructions
   - Strictly enforces doctor review: ambiguous dosages are not guessed by AI to protect patient safety.

5. **Digital Handwriting Pad + Synchronized Voice**
   - High-precision canvas supporting stylus, mouse, and touchscreen drawing.
   - Multi-color palette (Clinical Black, Blue, Red, Green), stroke width control, eraser, and undo.
   - Side-by-side voice dictation note pad.
   - Both handwritten diagrams and voice dictations are stored together in the patient record.

6. **Persistent Consultations & Printing**
   - Full persistence to browser `localStorage` per patient.
   - Refreshing or reopening the app preserves all case rubrics, prescriptions, and drawings.
   - Printable clinical prescription with formal clinic letterhead, doctor credentials, and signature block.

7. **Interactive 9-Step Verification Suite**
   - Covers all Section 8 test scenarios with 1-click test triggers and live indicators.

---

### Running the Application

```powershell
cd C:\Users\Admin\homeocare
npm run dev
```

Open `http://127.0.0.1:5173/` in Google Chrome or Microsoft Edge.
