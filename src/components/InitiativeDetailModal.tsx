import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Share2,
  Building,
  AlertCircle
} from 'lucide-react';
import { CommunityInitiative } from '../types';

interface InitiativeDetailModalProps {
  initiative: CommunityInitiative | null;
  onClose: () => void;
  onJoin: (initiativeId: string, name: string, email: string) => Promise<void>;
  onNotify?: (msg: string) => void;
}

export const InitiativeDetailModal: React.FC<InitiativeDetailModalProps> = ({
  initiative,
  onClose,
  onJoin,
  onNotify,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  if (!initiative) return null;

  const percentage = Math.min(100, Math.round((initiative.currentVolunteers / initiative.targetVolunteers) * 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      setIsSubmitting(true);
      await onJoin(initiative.id, name.trim(), email.trim());
      setHasJoined(true);
      if (onNotify) onNotify(`Thank you ${name}! You are registered for "${initiative.title}".`);
    } catch (err) {
      console.error(err);
      if (onNotify) onNotify('Could not register RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E9E1D2] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-100 rounded-t-3xl">
          <img
            src={initiative.imageUrl}
            alt={initiative.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E05638] uppercase tracking-wider inline-block mb-1.5">
              {initiative.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold leading-snug">
              {initiative.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 text-[#0F1E36]">
          
          {/* Key Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D7] text-xs">
            <div className="flex items-center gap-2.5 text-stone-700">
              <Calendar className="w-4 h-4 text-[#E05638] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Date</span>
                <span className="font-semibold text-stone-800">{initiative.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-stone-700">
              <Clock className="w-4 h-4 text-[#E05638] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Timing</span>
                <span className="font-semibold text-stone-800">{initiative.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-stone-700">
              <MapPin className="w-4 h-4 text-[#E05638] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-semibold text-stone-800">{initiative.location}, {initiative.city}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-stone-700">
              <Building className="w-4 h-4 text-[#E05638] shrink-0" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Organized By</span>
                <span className="font-semibold text-stone-800">{initiative.organizer}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-2">
              About This Initiative
            </h4>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {initiative.description}
            </p>
          </div>

          {/* Progress & Target Volunteers */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-stone-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#E05638]" />
                Volunteers Enrolled:
              </span>
              <span className="font-extrabold text-[#0F1E36]">
                {initiative.currentVolunteers} / {initiative.targetVolunteers} Volunteers ({percentage}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#EAE2D5] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E05638] to-[#F59E0B] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Impact Target: <strong className="text-stone-800">{initiative.impactMetric}</strong>
            </p>
          </div>

          {/* Join / RSVP Form */}
          {hasJoined ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-900">You Are Registered!</h4>
              <p className="text-xs text-emerald-800">
                A coordinator from Hands Together will reach out to you with venue coordinates and drive briefing. Thank you for showing care!
              </p>
            </div>
          ) : initiative.status === 'Completed' ? (
            <div className="p-4 rounded-2xl bg-stone-100 text-stone-600 text-center text-xs">
              This initiative has successfully concluded. Thank you to all community participants!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#0F1E36] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E05638]" />
                  Join This Community Drive
                </h4>
                <span className="text-[11px] text-stone-500">Free Participation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. priya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-xs"
              >
                {isSubmitting ? 'Registering...' : 'Confirm RSVP & Join as Volunteer'}
              </button>
            </form>
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
