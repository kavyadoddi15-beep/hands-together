import React from 'react';
import { 
  HeartHandshake, 
  Users, 
  HelpingHand, 
  FolderHeart, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { CommunityStats } from '../types';

interface HeroProps {
  stats: CommunityStats;
  onOpenVolunteer: () => void;
  onOpenRequestHelp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onOpenVolunteer,
  onOpenRequestHelp,
}) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E6] to-[#FAF7F2]">
      {/* Decorative Warm Background Blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#E05638]/10 to-[#F59E0B]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 -ml-24 w-96 h-96 rounded-full bg-gradient-to-tr from-[#E05638]/8 to-amber-200/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Startup Badge */}
        <div className="flex items-center justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E4DCD0] shadow-xs text-xs font-semibold text-[#0F1E36]">
            <span className="w-2 h-2 rounded-full bg-[#E05638]"></span>
            <span className="text-[#E05638] uppercase tracking-wider font-bold">Hands Together</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-700">Community Social Service & Support</span>
          </div>
        </div>

        {/* Two-Column Grid: Hero Content & Community Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1E36] tracking-tight leading-[1.12]">
              Small Acts, <br />
              <span className="text-[#E05638] relative inline-block">
                Big Changes.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C60 3 190 2 247 9" stroke="#E05638" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4"/>
                </svg>
              </span>
            </h1>

            <p className="mt-4 text-lg font-medium text-[#E05638]/90 tracking-wide uppercase">
              Together We Care, Together We Change
            </p>

            <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              Hands Together connects individuals and families needing assistance with compassionate volunteers, community food and education drives, and verified public welfare schemes. Because real community strength starts when hands join hands.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button
                onClick={onOpenRequestHelp}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-[#E05638] hover:bg-[#C84326] shadow-md shadow-[#E05638]/25 hover:shadow-lg hover:shadow-[#E05638]/35 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <HelpingHand className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get Help
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenVolunteer}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-base font-bold text-[#0F1E36] bg-white border-2 border-[#DDD4C5] hover:border-[#E05638] hover:text-[#E05638] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-5 h-5 text-[#E05638]" />
                Become a Volunteer
              </button>

              <a
                href="#schemes"
                className="text-sm font-semibold text-stone-700 hover:text-[#E05638] flex items-center gap-1.5 py-2 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#E05638]" />
                Explore Govt Schemes
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="mt-8 pt-6 border-t border-[#E8DFC9] flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-stone-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Confidential Help Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Public Welfare Portals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Community-Driven Non-Profit Vision</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Illustration Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Warm Illustration */}
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-stone-300/50 border border-[#E9E1D2] relative overflow-hidden">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#E05638]"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Community Action Network
                  </span>
                </div>

                {/* Custom SVG Community Illustration */}
                <div className="py-6 flex items-center justify-center">
                  <svg className="w-full max-w-[340px] h-auto drop-shadow-sm" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background circle */}
                    <circle cx="200" cy="150" r="125" fill="#FAF6EE" stroke="#EFE6D8" strokeWidth="2" />
                    
                    {/* Central Heart of Support */}
                    <path d="M200 195C200 195 135 150 135 110C135 85 155 70 180 70C192 70 200 78 200 78C200 78 208 70 220 70C245 70 265 85 265 110C265 150 200 195 200 195Z" fill="#E05638" opacity="0.9" />
                    <path d="M200 185C198 183 145 145 145 112C145 92 160 80 180 80C190 80 197 86 200 89C203 86 210 80 220 80C240 80 255 92 255 112C255 145 202 183 200 185Z" fill="#F1684C" />
                    
                    {/* Hands reaching inwards */}
                    {/* Left hand */}
                    <path d="M75 190 C 110 170, 140 165, 175 160 C 185 157, 185 150, 170 148 C 145 145, 120 148, 80 165" stroke="#0F1E36" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    
                    {/* Right hand */}
                    <path d="M325 190 C 290 170, 260 165, 225 160 C 215 157, 215 150, 230 148 C 255 145, 280 148, 320 165" stroke="#0F1E36" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                    {/* Community People Icons */}
                    {/* Person 1 Left */}
                    <circle cx="105" cy="85" r="16" fill="#0F1E36" />
                    <path d="M85 130 C 85 105, 125 105, 125 130" stroke="#0F1E36" strokeWidth="5" fill="#EFE8DD" />
                    
                    {/* Person 2 Right */}
                    <circle cx="295" cy="85" r="16" fill="#0F1E36" />
                    <path d="M275 130 C 275 105, 315 105, 315 130" stroke="#0F1E36" strokeWidth="5" fill="#EFE8DD" />

                    {/* Star / Sparkle elements */}
                    <path d="M200 40 L203 48 L211 51 L203 54 L200 62 L197 54 L189 51 L197 48 Z" fill="#F59E0B" />
                    <path d="M125 45 L127 51 L133 53 L127 55 L125 61 L123 55 L117 53 L123 51 Z" fill="#E05638" />
                    <path d="M275 45 L277 51 L283 53 L277 55 L275 61 L273 55 L267 53 L273 51 Z" fill="#E05638" />

                    {/* Ground line */}
                    <line x1="80" y1="235" x2="320" y2="235" stroke="#DDD3C4" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
                    <text x="200" y="260" textAnchor="middle" fill="#0F1E36" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                      BRIDGING NEED & KINDNESS
                    </text>
                  </svg>
                </div>

                {/* Floating Micro-Badge */}
                <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFD0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E05638]/10 text-[#E05638] flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 font-medium">Community Response Time</p>
                      <p className="text-sm font-bold text-[#0F1E36]">Within 24–48 Hours</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Intake
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Statistics Cards Strip */}
        <div className="mt-14 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E05638]"></span>
              Hands Together Platform Impact
            </h2>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-[#EDE6DC] text-stone-700">
              Verified Project Demonstration Figures
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Stat 1: Volunteers */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFD0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Volunteers</span>
                <div className="w-9 h-9 rounded-xl bg-[#E05638]/10 text-[#E05638] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#0F1E36]">
                {stats.volunteersCount.toLocaleString()}+
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Registered community helpers
              </p>
            </div>

            {/* Stat 2: People Helped */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFD0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Lives Impacted</span>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <HelpingHand className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#0F1E36]">
                {stats.peopleHelpedCount.toLocaleString()}+
              </p>
              <p className="mt-1 text-xs text-stone-500">
                People & families assisted
              </p>
            </div>

            {/* Stat 3: Active Initiatives */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFD0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Initiatives</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <FolderHeart className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#0F1E36]">
                {stats.activeInitiativesCount}+
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Grassroots food, education & health drives
              </p>
            </div>

            {/* Stat 4: Partner Organizations */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DFD0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Partner NGOs</span>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#0F1E36]">
                {stats.partnerOrganizationsCount}+
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Welfare trusts & grassroots partners
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
