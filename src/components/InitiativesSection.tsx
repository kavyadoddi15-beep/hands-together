import React, { useState } from 'react';
import { 
  FolderHeart, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { CommunityInitiative } from '../types';
import { InitiativeDetailModal } from './InitiativeDetailModal';

interface InitiativesSectionProps {
  initiatives: CommunityInitiative[];
  onJoinInitiative: (id: string, name: string, email: string) => Promise<void>;
  onNotify?: (msg: string) => void;
}

export const InitiativesSection: React.FC<InitiativesSectionProps> = ({
  initiatives,
  onJoinInitiative,
  onNotify,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');
  const [selectedInitiative, setSelectedInitiative] = useState<CommunityInitiative | null>(null);

  const filteredInitiatives = initiatives.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.status === activeFilter;
  });

  return (
    <section id="initiatives" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#E05638] border border-[#E7DDD0]">
            <FolderHeart className="w-3.5 h-3.5 text-[#E05638]" />
            Community Action in Motion
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight">
            Active Community Initiatives & Drives
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Real grassroots projects—from hot cooked food distributions to free slum tutoring and tree plantations. Join hands to participate!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {(['All', 'Active', 'Upcoming', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#E05638] text-white shadow-sm shadow-[#E05638]/25'
                  : 'bg-white text-stone-700 border border-[#DDD3C4] hover:border-[#E05638] hover:text-[#E05638]'
              }`}
            >
              {tab === 'All' ? 'All Initiatives' : `${tab} Drives`}
            </button>
          ))}
        </div>

        {/* Initiatives Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInitiatives.map((item) => {
            const percentage = Math.min(100, Math.round((item.currentVolunteers / item.targetVolunteers) * 100));

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white border border-[#E8DFD0] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#E05638]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category pill */}
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-[#0F1E36] shadow-xs">
                      {item.category}
                    </span>

                    {/* Status pill */}
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
                        item.status === 'Active'
                          ? 'bg-emerald-600 text-white'
                          : item.status === 'Upcoming'
                          ? 'bg-amber-500 text-white'
                          : 'bg-stone-600 text-white'
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Impact Metric tag on image */}
                    <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{item.impactMetric}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0F1E36] group-hover:text-[#E05638] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Logistics metadata */}
                    <div className="mt-4 pt-3 border-t border-[#F2ECE2] space-y-2 text-xs text-stone-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#E05638] shrink-0" />
                        <span className="font-medium text-stone-800">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E05638] shrink-0" />
                        <span className="truncate">{item.location}, {item.city}</span>
                      </div>
                    </div>

                    {/* Volunteer Goal Bar */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-semibold text-stone-600 flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#E05638]" /> Volunteers
                        </span>
                        <span className="font-bold text-[#0F1E36]">
                          {item.currentVolunteers} / {item.targetVolunteers} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#EAE2D5] overflow-hidden">
                        <div
                          className="h-full bg-[#E05638] rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedInitiative(item)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-[#0F1E36] bg-[#FAF7F2] border border-[#DDD3C4] hover:bg-[#E05638] hover:text-white hover:border-[#E05638] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Learn More & Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal */}
      <InitiativeDetailModal
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
        onJoin={onJoinInitiative}
        onNotify={onNotify}
      />
    </section>
  );
};
