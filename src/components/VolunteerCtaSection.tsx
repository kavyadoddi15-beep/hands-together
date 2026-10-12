import React from 'react';
import { 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface VolunteerCtaSectionProps {
  onOpenVolunteer: () => void;
}

export const VolunteerCtaSection: React.FC<VolunteerCtaSectionProps> = ({ onOpenVolunteer }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0F1E36] via-[#162744] to-[#0F1E36] text-white relative overflow-hidden">
      {/* Decorative Warm Glowing Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E05638]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Step Forward For Your Community
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Make a Difference? <br />
              <span className="text-[#E05638]">Become a Hands Together Volunteer.</span>
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              Whether you can spare two hours on a Sunday morning to teach children, distribute food packets, or assist elderly neighbors with government pension forms—every single hand makes our community stronger.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-stone-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E05638] shrink-0" />
                <span>Flexible schedules (Weekends or On-call)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E05638] shrink-0" />
                <span>Official Volunteer Digital ID & Certificate</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E05638] shrink-0" />
                <span>Zero cost, 100% community-driven</span>
              </div>
            </div>
          </div>

          {/* Right Action Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-7 text-[#0F1E36] shadow-2xl border border-white/20 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center mx-auto shadow-sm">
                <HeartHandshake className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Join 1,240+ Volunteers
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Registration takes less than 2 minutes. Receive your digital welcome kit immediately.
                </p>
              </div>

              <button
                onClick={onOpenVolunteer}
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-[#E05638] hover:bg-[#C84326] shadow-md shadow-[#E05638]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Register as a Volunteer Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-500 font-medium">
                Verified community volunteer network • All ages welcome
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
