import React from 'react';
import { 
  Target, 
  Compass, 
  Heart, 
  ShieldCheck, 
  Users2, 
  Sparkles,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-t border-b border-[#EDE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FAF2EB] text-[#E05638] border border-[#F3DCD5]">
            <Heart className="w-3.5 h-3.5 fill-[#E05638]" />
            About Hands Together
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight">
            Connecting Hearts, Mobilizing Resources, Creating Change
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Founded with the conviction that no one should struggle in isolation. We bridge the gap between people facing hardship and compassionate neighbors, volunteers, and welfare programs.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="rounded-3xl bg-[#FAF7F2] p-8 sm:p-10 border border-[#E9DFD2] relative overflow-hidden group hover:border-[#E05638]/40 transition-colors shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#E05638] text-white flex items-center justify-center shadow-md shadow-[#E05638]/25 mb-6">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E05638]">
              Our Mission
            </span>
            <h3 className="mt-2 text-2xl font-bold text-[#0F1E36]">
              Connecting People, Resources, and Opportunities
            </h3>
            <p className="mt-4 text-stone-700 leading-relaxed text-base">
              “To connect people, resources, and opportunities to create stronger and more supportive communities.”
            </p>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed">
              We empower local citizens, students, and community organizers to identify urgent local needs—whether food scarcity, school dropout risks, or medical emergencies—and solve them with dignity and speed.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-[#0F1E36] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#E05638]" />
                Direct assistance without bureaucratic hurdles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#E05638]" />
                Transparent resource routing to verified beneficiaries
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#E05638]" />
                Democratizing access to government social safety nets
              </li>
            </ul>
          </div>

          {/* Vision Card */}
          <div className="rounded-3xl bg-[#FAF7F2] p-8 sm:p-10 border border-[#E9DFD2] relative overflow-hidden group hover:border-[#0F1E36]/40 transition-colors shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#0F1E36] text-white flex items-center justify-center shadow-md shadow-[#0F1E36]/25 mb-6">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-600">
              Our Vision
            </span>
            <h3 className="mt-2 text-2xl font-bold text-[#0F1E36]">
              A World of Dignity, Mutual Care, and Active Empathy
            </h3>
            <p className="mt-4 text-stone-700 leading-relaxed text-base">
              “A world where everyone can access help, contribute their skills, and participate in positive social change.”
            </p>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed">
              We envision neighborhoods where seeking help is met with respect rather than stigma, where volunteerism is an everyday culture, and where critical public schemes actually reach the last person in need.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-[#0F1E36] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F1E36]" />
                Universal awareness of public welfare entitlements
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F1E36]" />
                Active youth engagement through structured volunteer programs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F1E36]" />
                Resilient community networks prepared for emergencies
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Core Pillars of Action */}
        <div className="mt-16 pt-12 border-t border-[#EDE7DF]">
          <h3 className="text-center text-xl font-bold text-[#0F1E36] mb-8">
            The Four Core Pillars of Hands Together
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#E05638]/10 text-[#E05638] flex items-center justify-center font-bold text-lg mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Dignity First</h4>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Assistance is provided with privacy and respect. Beneficiary data is kept strictly confidential and never displayed for sensationalism.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Grassroots Reach</h4>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                From daily wage earners to students in government schools, our initiatives operate directly at the community ground level.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Verified Guidance</h4>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Government schemes and welfare guidelines are checked against official government department sources to prevent misinformation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                04
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Collaborative Power</h4>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                We believe social service succeeds through teamwork—uniting youth energy, donor goodwill, and NGO execution capacity.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
