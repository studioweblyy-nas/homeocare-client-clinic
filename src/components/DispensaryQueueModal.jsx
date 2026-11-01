import React, { useState } from 'react';
import { X, CheckCircle, Clock, Pill, RefreshCw, AlertCircle, ChevronRight, Check } from 'lucide-react';
import { DISPENSARY_QUEUE_DATA } from '../data/homeopathicData';

export default function DispensaryQueueModal({ isOpen, onClose }) {
  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem('homeocare_dispensary_queue');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return DISPENSARY_QUEUE_DATA;
  });

  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const handleUpdateStatus = (id, newStatus) => {
    const updated = queue.map(item => item.id === id ? { ...item, status: newStatus } : item);
    setQueue(updated);
    localStorage.setItem('homeocare_dispensary_queue', JSON.stringify(updated));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Dispensed':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1"><Check className="w-3 h-3" /> Dispensed</span>;
      case 'Ready':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">Ready for Patient</span>;
      case 'Preparing':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Preparing</span>;
      default:
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold text-[11px]">Pending Dispense</span>;
    }
  };

  const filteredQueue = filter === 'all' ? queue : queue.filter(item => item.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400 flex items-center justify-center text-teal-400 font-bold">
              💊
            </div>
            <div>
              <h3 className="font-bold text-base">Dispensary & Pharmacy Live Queue</h3>
              <p className="text-xs text-slate-400">Real-time status of homeopathic remedy preparation</p>
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

        {/* Filter Pills */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            {['all', 'pending', 'preparing', 'ready', 'dispensed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-3 py-1 rounded-lg font-semibold capitalize transition-colors ${
                  filter === st
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <span className="text-slate-400 text-xs">
            {filteredQueue.length} Orders
          </span>
        </div>

        {/* Queue List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filteredQueue.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Pill className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">No prescriptions in this queue category</p>
            </div>
          ) : (
            filteredQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 flex flex-col items-center justify-center font-black flex-shrink-0">
                    <span className="text-[10px] uppercase font-semibold leading-none">Token</span>
                    <span className="text-sm leading-tight">#{item.token}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{item.patientName}</h4>
                      <span className="text-xs font-mono text-slate-400">({item.patientId})</span>
                    </div>
                    <p className="text-xs font-semibold text-teal-800 mt-0.5">
                      Rx: {item.remedies}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Timing: {item.timing} • <Clock className="w-3 h-3 inline mr-0.5 text-slate-400" />{item.orderedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end md:self-center">
                  {getStatusBadge(item.status)}

                  {/* 1-Click Status Advancement Selector */}
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                    className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 cursor-pointer hover:bg-slate-100"
                  >
                    <option value="Pending">Mark Pending</option>
                    <option value="Preparing">Mark Preparing</option>
                    <option value="Ready">Mark Ready</option>
                    <option value="Dispensed">Mark Dispensed</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Synced with clinic inventory & patient checkout</span>
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
