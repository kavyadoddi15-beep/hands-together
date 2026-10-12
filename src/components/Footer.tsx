import React from 'react';
import { 
  HeartHandshake, 
  Heart, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onOpenVolunteer: () => void;
  onOpenRequestHelp: () => void;
  onOpenTrackRequest: () => void;
  onOpenProjectDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVolunteer,
  onOpenRequestHelp,
  onOpenTrackRequest,
  onOpenProjectDocs,
}) => {
  return (
    <footer className="bg-[#0F1E36] text-white pt-16 pb-12 border-t border-[#1C2C47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E05638] flex items-center justify-center text-white shadow-md">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight font-display text-white">
                  Hands Together
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#E05638]">
                  Together We Care, Together We Change
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              A community social service platform bridging those who need support with empathetic volunteers, direct relief supplies, and verified government welfare schemes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenRequestHelp}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#E05638] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Get Help
              </button>
              <button
                onClick={onOpenVolunteer}
                className="px-3.5 py-1.5 rounded-xl bg-[#E05638] hover:bg-[#C84326] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Become Volunteer
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#schemes" className="hover:text-white transition-colors">Govt Schemes</a></li>
              <li><a href="#initiatives" className="hover:text-white transition-colors">Community Drives</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Support Pillars
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={onOpenTrackRequest} className="hover:text-white text-left cursor-pointer text-amber-300">
                  Track Assistance Request Ticket →
                </button>
              </li>
              <li><a href="#schemes" className="hover:text-white">Healthcare & Ayushman Help</a></li>
              <li><a href="#schemes" className="hover:text-white">Scholarships for Students</a></li>
              <li><a href="#initiatives" className="hover:text-white">Food & Ration Donation Drives</a></li>
              <li><a href="#team" className="hover:text-white">Founding Team Overview</a></li>
              <li>
                <button onClick={onOpenProjectDocs} className="hover:text-white text-left cursor-pointer flex items-center gap-1 text-xs text-stone-400">
                  <BookOpen className="w-3 h-3 text-[#E05638]" />
                  College Project Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* National Helplines Directory */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Emergency & Welfare Helplines
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-[11px]">National Emergency:</span>
                  <a href="tel:112" className="font-bold text-white hover:text-[#E05638]">112</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-[11px]">Childline Support:</span>
                  <a href="tel:1098" className="font-bold text-white hover:text-[#E05638]">1098</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-[11px]">Women Helpline:</span>
                  <a href="tel:181" className="font-bold text-white hover:text-[#E05638]">181</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-[11px]">Senior Citizen Helpline:</span>
                  <a href="tel:14567" className="font-bold text-white hover:text-[#E05638]">14567</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} Hands Together. Built with care for community empowerment.
          </p>

          <div className="flex items-center gap-6">
            <span>Tagline: <em>Together We Care, Together We Change</em></span>
            <span className="hidden md:inline text-stone-600">|</span>
            <button
              onClick={onOpenProjectDocs}
              className="text-stone-300 hover:text-white underline cursor-pointer"
            >
              Project Viva & Architecture Guide
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
