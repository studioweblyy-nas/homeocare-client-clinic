import React, { useState } from 'react';
import { X, FileText, Image, ZoomIn, ZoomOut, Download, Check, AlertCircle, Eye } from 'lucide-react';

export default function ReportsViewerModal({ isOpen, onClose, patient }) {
  const reports = patient?.reports || [];
  const [selectedReportIndex, setSelectedReportIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !patient) return null;

  const currentReport = reports[selectedReportIndex] || reports[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-teal-300 font-bold">
              📑
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Quick Clinical Report Viewer</h3>
              <p className="text-xs text-slate-400">
                Patient: <span className="text-white font-semibold">{patient.name}</span> ({patient.id})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Selector Tabs */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between overflow-x-auto text-xs">
          <div className="flex items-center gap-2">
            {reports.map((rep, idx) => (
              <button
                key={rep.id}
                type="button"
                onClick={() => { setSelectedReportIndex(idx); setZoomLevel(100); }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  selectedReportIndex === idx
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {rep.type === 'pdf' ? <FileText className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                <span>{rep.title}</span>
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 text-slate-500 ml-2">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
              className="p-1 hover:bg-slate-200 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-1">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(160, prev + 15))}
              className="p-1 hover:bg-slate-200 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Viewer Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-100/50">
          {currentReport ? (
            <div 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mx-auto transition-transform origin-top"
              style={{ transform: `scale(${zoomLevel / 100})`, maxWidth: '780px' }}
            >
              {/* Lab Header */}
              <div className="border-b-2 border-slate-800 pb-3 mb-4 flex justify-between items-start text-xs">
                <div>
                  <h4 className="font-black text-slate-900 text-base tracking-tight uppercase">
                    {currentReport.lab}
                  </h4>
                  <p className="text-slate-500 font-medium">Department of Clinical Pathology & Diagnostics</p>
                  <p className="text-slate-400 text-[11px]">Accredited NABL Medical Testing Laboratory</p>
                </div>
                <div className="text-right text-slate-600">
                  <p><strong>Report Date:</strong> {currentReport.date}</p>
                  <p><strong>Patient UID:</strong> {patient.id}</p>
                  <p><strong>Referred by:</strong> Dr. S. K. Sharma</p>
                </div>
              </div>

              {/* Investigation Title */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 mb-4 flex items-center justify-between">
                <span>INVESTIGATION: {currentReport.title.toUpperCase()}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                  VERIFIED REPORT
                </span>
              </div>

              {/* Simulated Diagnostic Content / Findings */}
              <div className="space-y-4 text-xs">
                {currentReport.type === 'pdf' ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">Test Parameter</th>
                          <th className="p-2.5">Patient Value</th>
                          <th className="p-2.5">Biological Ref. Interval</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        <tr>
                          <td className="p-2.5 font-medium">Hemoglobin (Hb)</td>
                          <td className="p-2.5 font-bold text-slate-900">14.2 g/dL</td>
                          <td className="p-2.5 text-slate-500">13.0 - 17.0 g/dL</td>
                          <td className="p-2.5 text-emerald-600 font-semibold">Normal</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-medium">Total Leukocyte Count (TLC)</td>
                          <td className="p-2.5 font-bold text-slate-900">7,400 /mcL</td>
                          <td className="p-2.5 text-slate-500">4,000 - 11,000 /mcL</td>
                          <td className="p-2.5 text-emerald-600 font-semibold">Normal</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-medium">Platelet Count</td>
                          <td className="p-2.5 font-bold text-slate-900">2.4 Lacs/mcL</td>
                          <td className="p-2.5 text-slate-500">1.5 - 4.5 Lacs/mcL</td>
                          <td className="p-2.5 text-emerald-600 font-semibold">Normal</td>
                        </tr>
                        <tr className="bg-amber-50/50">
                          <td className="p-2.5 font-medium">Erythrocyte Sedimentation Rate (ESR)</td>
                          <td className="p-2.5 font-bold text-amber-900">18 mm/hr</td>
                          <td className="p-2.5 text-slate-500">0 - 15 mm/hr</td>
                          <td className="p-2.5 text-amber-700 font-bold">Mild Elevation (▲)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="h-56 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-slate-400 p-4 relative overflow-hidden border border-slate-800">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                      <Eye className="w-10 h-10 text-teal-400 mb-2 opacity-80" />
                      <span className="font-mono text-xs text-slate-300">
                        [DIGITAL RADIOLOGY FILM — AP & LATERAL VIEW]
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1">
                        High-Resolution Radiographic Density Rendered
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Radiologist Impression:</span>
                      <p className="text-slate-700 leading-relaxed">{currentReport.findings}</p>
                    </div>
                  </div>
                )}

                {/* Doctor Note on File */}
                <div className="bg-teal-50 border-l-4 border-teal-600 p-3.5 rounded-r-xl text-xs">
                  <span className="font-bold text-teal-950 block mb-0.5">
                    Dr. S. K. Sharma Clinical Correlation Note:
                  </span>
                  <p className="text-teal-900 leading-relaxed italic">
                    "{currentReport.doctorNote}"
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <p className="text-center py-10 text-slate-400">No reports uploaded for this patient.</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">Viewing authenticated digital diagnostic archive</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
