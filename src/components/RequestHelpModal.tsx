import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Lock,
  PhoneCall,
  Search
} from 'lucide-react';
import { HelpRequest } from '../types';

interface RequestHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<HelpRequest, 'ticketId' | 'status' | 'createdAt'>) => Promise<{ success: boolean; ticketId: string }>;
  onOpenTrack: (ticketId?: string) => void;
  onNotify?: (msg: string) => void;
}

export const RequestHelpModal: React.FC<RequestHelpModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onOpenTrack,
  onNotify,
}) => {
  const [requesterName, setRequesterName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [assistanceType, setAssistanceType] = useState<HelpRequest['assistanceType']>('Emergency Healthcare & Medicines');
  const [urgency, setUrgency] = useState<HelpRequest['urgency']>('Urgent (Within 48h)');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [supportingDocNote, setSupportingDocNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleQuickFillDemo = () => {
    setRequesterName('M. Srinivas Rao (Demo)');
    setContactNumber('+91 94401 23456');
    setEmail('srinivas.demo@example.com');
    setAssistanceType('Emergency Healthcare & Medicines');
    setUrgency('Urgent (Within 48h)');
    setDescription('Urgent prescription medicine supply needed for diabetic mother following recent eye surgery. Unable to visit medical shop due to mobility constraints.');
    setCity('Hyderabad');
    setAddressDetails('Flat 204, Balaji Residency, Kukatpally');
    setSupportingDocNote('Doctor prescription from Gandhi Hospital available for coordinator verification.');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!requesterName.trim() || !contactNumber.trim() || !city.trim() || !description.trim()) {
      setErrorMsg('Please complete all required fields so our coordinators can reach you.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await onSubmit({
        requesterName: requesterName.trim(),
        contactNumber: contactNumber.trim(),
        email: email.trim() || undefined,
        assistanceType,
        urgency,
        description: description.trim(),
        city: city.trim(),
        addressDetails: addressDetails.trim(),
        supportingDocNote: supportingDocNote.trim() || undefined,
      });

      setSubmittedTicketId(res.ticketId);
      if (onNotify) onNotify(`Help request lodged! Your Ticket ID is: ${res.ticketId}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit assistance request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (submittedTicketId) {
      navigator.clipboard.writeText(submittedTicketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (onNotify) onNotify('Ticket ID copied to clipboard');
    }
  };

  const handleReset = () => {
    setRequesterName('');
    setContactNumber('');
    setEmail('');
    setDescription('');
    setCity('');
    setAddressDetails('');
    setSupportingDocNote('');
    setSubmittedTicketId(null);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E9E1D2] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EDE6DC] px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center border border-[#F2D7CE]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#0F1E36]">
                Confidential Request for Help
              </h3>
              <p className="text-xs text-stone-500">
                Hands Together Community Assistance Desk
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {submittedTicketId ? (
            /* Ticket Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E05638]">
                  Request Safely Logged
                </span>
                <h4 className="text-2xl font-extrabold text-[#0F1E36] mt-1">
                  We Have Received Your Request
                </h4>
                <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
                  Your request has been routed to our regional coordinator pool. Our team will verify your requirements with utmost dignity and privacy.
                </p>
              </div>

              {/* Unique Ticket Display */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#E05638]/30 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Your Confidential Tracking Ticket ID:
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Lock className="w-3 h-3 text-emerald-600" /> Private
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#DDD3C4]">
                  <span className="text-xl font-mono font-extrabold text-[#0F1E36]">
                    {submittedTicketId}
                  </span>
                  <button
                    onClick={handleCopyTicket}
                    className="p-2 rounded-lg text-stone-600 hover:text-[#E05638] hover:bg-[#FAF2EB] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-500">
                  Save this Ticket ID to track updates anytime using the &ldquo;Track Help Request&rdquo; option in the top navigation.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const tid = submittedTicketId;
                    handleReset();
                    onClose();
                    onOpenTrack(tid);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  Track Status Now
                </button>
                <button
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Privacy Notice Banner */}
              <div className="p-4 rounded-2xl bg-[#0F1E36] text-white flex items-start gap-3 text-xs leading-relaxed">
                <Lock className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200">Dignity & Privacy Guarantee:</strong> Your request is strictly confidential and never displayed on public feeds or dashboards. Only certified Hands Together community caseworkers can review contact information.
                </div>
              </div>

              {/* Quick Fill Button */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2] text-xs">
                <span className="text-stone-600 font-medium">Testing request submission for project evaluation?</span>
                <button
                  type="button"
                  onClick={handleQuickFillDemo}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#E05638] bg-white border border-[#E05638]/30 hover:bg-[#FAF2EB] transition-colors cursor-pointer"
                >
                  ⚡ Quick Fill Demo Data
                </button>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  {errorMsg}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Your Name (or Initials) <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Contact Phone / WhatsApp <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contact@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    City / Neighborhood <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Hyderabad / Secunderabad"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>
              </div>

              {/* Assistance Type & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Type of Assistance Required <span className="text-[#E05638]">*</span>
                  </label>
                  <select
                    value={assistanceType}
                    onChange={(e) => setAssistanceType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none font-medium"
                  >
                    <option value="Food & Daily Ration">Food & Daily Ration (Meal kits, dry groceries)</option>
                    <option value="Emergency Healthcare & Medicines">Emergency Healthcare & Medicines</option>
                    <option value="Education Support & Fees">Education Support & Fees (Textbooks, stationery)</option>
                    <option value="Elderly / Disability Care">Elderly / Disability Care</option>
                    <option value="Urgent Shelter & Blankets">Urgent Shelter & Blankets</option>
                    <option value="Other Social Need">Other Social Welfare Need</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Urgency Level <span className="text-[#E05638]">*</span>
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none font-medium"
                  >
                    <option value="Immediate (Emergency)">Immediate (Emergency - within 24 hours)</option>
                    <option value="Urgent (Within 48h)">Urgent (Within 48 hours)</option>
                    <option value="Normal (Within 1 week)">Normal (Within 1 week)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                  Description of Request <span className="text-[#E05638]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe what support is needed, family situation, or specific items required..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                />
              </div>

              {/* Address Details */}
              <div>
                <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                  Delivery / Residential Landmark Address
                </label>
                <input
                  type="text"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="Street / Colony / Landmark (kept confidential for delivery coordination)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                />
              </div>

              {/* Optional Supporting Doc Reference */}
              <div>
                <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                  Supporting Information / Document Note (Optional)
                </label>
                <input
                  type="text"
                  value={supportingDocNote}
                  onChange={(e) => setSupportingDocNote(e.target.value)}
                  placeholder="e.g. Hospital prescription reference, school ID card number, or ration card ID"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-stone-400">
                  Documents can be shown in-person to the assigned coordinator during home visit.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] shadow-sm disabled:opacity-60 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting Confidentially...' : 'Submit Assistance Request'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
