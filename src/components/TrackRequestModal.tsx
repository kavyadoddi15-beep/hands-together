import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle,
  Lock,
  UserCheck
} from 'lucide-react';
import { HelpRequest } from '../types';

interface TrackRequestModalProps {
  isOpen: boolean;
  initialTicketId?: string;
  onClose: () => void;
  onTrack: (ticketId: string) => Promise<HelpRequest | null>;
}

export const TrackRequestModal: React.FC<TrackRequestModalProps> = ({
  isOpen,
  initialTicketId = '',
  onClose,
  onTrack,
}) => {
  const [ticketInput, setTicketInput] = useState(initialTicketId);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [foundRequest, setFoundRequest] = useState<HelpRequest | null>(null);

  useEffect(() => {
    if (initialTicketId) {
      setTicketInput(initialTicketId);
      doSearch(initialTicketId);
    }
  }, [initialTicketId, isOpen]);

  if (!isOpen) return null;

  const doSearch = async (tid: string) => {
    if (!tid.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await onTrack(tid.trim());
      setFoundRequest(res);
    } catch {
      setFoundRequest(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(ticketInput);
  };

  const handleTestDemoTicket = () => {
    setTicketInput('HT-DEMO-2026');
    doSearch('HT-DEMO-2026');
  };

  const getStepStatus = (status: HelpRequest['status'], stepNumber: number) => {
    const order = ['Received', 'Assigned to Coordinator', 'In Progress', 'Fulfilled'];
    const currentIndex = order.indexOf(status);
    if (currentIndex >= stepNumber) return 'completed';
    if (currentIndex === stepNumber - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E9E1D2] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EDE6DC] px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center border border-[#F2D7CE]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#0F1E36]">
                Track Assistance Status
              </h3>
              <p className="text-xs text-stone-500">
                Check confidential casework progress
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <label className="block text-xs font-bold text-[#0F1E36]">
              Enter Your Ticket ID (e.g. HT-DEMO-2026 or HT-REQ-xxxx)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
                placeholder="e.g. HT-DEMO-2026"
                className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C4] text-sm font-mono uppercase focus:ring-2 focus:ring-[#E05638] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 rounded-2xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] transition-all disabled:opacity-60 cursor-pointer shadow-xs"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Don&apos;t have a ticket yet?</span>
              <button
                type="button"
                onClick={handleTestDemoTicket}
                className="text-[#E05638] font-bold hover:underline cursor-pointer"
              >
                ⚡ Use Pre-seeded Demo Ticket (HT-DEMO-2026)
              </button>
            </div>
          </form>

          {/* Results Display */}
          {searched && (
            <div>
              {foundRequest ? (
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2] space-y-6">
                  
                  {/* Top Header of Ticket */}
                  <div className="flex items-start justify-between border-b border-[#E8DFD0] pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Assistance Request Record
                      </span>
                      <h4 className="text-xl font-mono font-extrabold text-[#0F1E36] mt-0.5">
                        {foundRequest.ticketId}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">
                        Category: <strong className="text-stone-800">{foundRequest.assistanceType}</strong>
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E05638]/10 text-[#E05638] border border-[#E05638]/20">
                      {foundRequest.status}
                    </span>
                  </div>

                  {/* Privacy Guard Notice */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E0D7C8] text-xs text-stone-600">
                    <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Requester: <strong>{foundRequest.requesterName.slice(0, 2)}***</strong> • City: <strong>{foundRequest.city}</strong></span>
                  </div>

                  {/* 4-Step Visual Timeline */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                      Workflow Progress Timeline
                    </h5>

                    <div className="space-y-4">
                      {[
                        { step: 0, title: 'Received & Logged', desc: 'Securely recorded in coordinator queue.' },
                        { step: 1, title: 'Assigned to Coordinator', desc: 'Regional casework volunteer assigned for verification.' },
                        { step: 2, title: 'In Progress (Resource Mobilization)', desc: 'Supplies, medicine, or volunteer aid being dispatched.' },
                        { step: 3, title: 'Fulfilled & Closed', desc: 'Assistance successfully handed over to beneficiary.' },
                      ].map((s) => {
                        const status = getStepStatus(foundRequest.status, s.step);
                        return (
                          <div key={s.step} className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {status === 'completed' ? (
                                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                                  ✓
                                </div>
                              ) : status === 'current' ? (
                                <div className="w-6 h-6 rounded-full bg-[#E05638] text-white flex items-center justify-center text-xs font-bold animate-pulse">
                                  •
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center text-xs">
                                  {s.step + 1}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className={`text-xs font-bold ${status === 'upcoming' ? 'text-stone-400' : 'text-[#0F1E36]'}`}>
                                {s.title}
                              </p>
                              <p className="text-[11px] text-stone-500">
                                {s.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Caseworker notes */}
                  {foundRequest.confidentialNotes && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#E0D7C8] text-xs">
                      <span className="font-bold text-stone-700 block mb-1">Coordinator Update:</span>
                      <p className="text-stone-600 italic">
                        &ldquo;{foundRequest.confidentialNotes}&rdquo;
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                  <h4 className="text-sm font-bold text-[#0F1E36]">Ticket ID Not Found</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Please verify that the ticket ID matches the exact letters and numbers issued upon submitting the request.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FAF7F2] border-t border-[#EDE6DC] px-6 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
