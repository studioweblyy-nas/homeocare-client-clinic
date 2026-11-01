import React, { useState } from 'react';
import { X, Calendar, Clock, AlertTriangle, Phone, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { UPCOMING_FOLLOWUPS } from '../data/homeopathicData';

export default function FollowUpDashboardModal({ isOpen, onClose, onSelectPatient }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'overdue'

  if (!isOpen) return null;

  const upcomingList = UPCOMING_FOLLOWUPS.filter(item => item.daysRemaining >= 0);
  const overdueList = UPCOMING_FOLLOWUPS.filter(item => item.daysRemaining < 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400 flex items-center justify-center text-teal-400 font-bold">
              📅
            </div>
            <div>
              <h3 className="font-bold text-base">Patient Follow-up & Appointment Tracker</h3>
              <p className="text-xs text-slate-400">Monitoring chronic homeopathic case trajectories</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Upcoming ({upcomingList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('overdue')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'overdue'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Overdue Follow-ups ({overdueList.length})
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {activeTab === 'upcoming' ? (
            upcomingList.map((fu) => (
              <div
                key={fu.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{fu.patientName}</h4>
                    <span className="text-xs font-mono text-slate-400">({fu.patientId})</span>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      In {fu.daysRemaining} Days
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Complaint: <strong>{fu.chiefComplaint}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Scheduled: {fu.scheduledDate} • Contact: {fu.phone}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${fu.phone}`}
                    className="p-2 text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Patient</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            overdueList.map((fu) => (
              <div
                key={fu.id}
                className="p-4 bg-rose-50/40 rounded-2xl border border-rose-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-rose-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{fu.patientName}</h4>
                    <span className="text-xs font-mono text-slate-400">({fu.patientId})</span>
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      {fu.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    Complaint: <strong>{fu.chiefComplaint}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Missed Date: {fu.scheduledDate} • Phone: {fu.phone}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${fu.phone}`}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call to Reschedule</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Automatic SMS reminder logs archived</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
