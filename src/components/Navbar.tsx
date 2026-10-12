import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  HelpCircle, 
  UserPlus, 
  ShieldCheck, 
  PhoneCall,
  Search,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenVolunteer: () => void;
  onOpenRequestHelp: () => void;
  onOpenTrackRequest: () => void;
  onOpenProjectDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVolunteer,
  onOpenRequestHelp,
  onOpenTrackRequest,
  onOpenProjectDocs,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Govt Schemes', href: '#schemes' },
    { name: 'Initiatives', href: '#initiatives' },
    { name: 'Our Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification Strip */}
      <div className="bg-[#0F1E36] text-amber-50 text-xs py-2 px-4 transition-all border-b border-[#1E2E48]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E05638] text-white tracking-wider uppercase">
              Community Helpline
            </span>
            <span className="text-stone-300 hidden sm:inline">
              Toll-free social & emergency support available 24/7:
            </span>
            <a href="tel:1800123456" className="font-semibold text-amber-200 hover:text-white flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#E05638]" /> 1800-123-456
            </a>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <button
              onClick={onOpenTrackRequest}
              className="hover:text-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <Search className="w-3 h-3 text-[#E05638]" />
              Track Help Request
            </button>
            <span className="text-stone-600">|</span>
            <button
              onClick={onOpenProjectDocs}
              className="hover:text-amber-200 flex items-center gap-1.5 text-xs text-amber-300 font-medium cursor-pointer"
              title="View Project Architecture & Demo Guide"
            >
              <BookOpen className="w-3 h-3 text-[#E05638]" />
              Project Docs & Demo Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8E1D5]'
            : 'bg-[#FAF7F2] border-b border-[#EDE6DC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E05638] to-[#F1785D] flex items-center justify-center text-white shadow-md shadow-[#E05638]/20 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-[#0F1E36] font-display flex items-center gap-1">
                  Hands Together
                  <span className="w-2 h-2 rounded-full bg-[#E05638] inline-block animate-pulse"></span>
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#E05638]">
                  Together We Care, Together We Change
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-[#1B2A4A] hover:text-[#E05638] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E05638] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenRequestHelp}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0F1E36] bg-white border border-[#DDD4C5] hover:border-[#E05638] hover:text-[#E05638] shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#E05638]" />
                Get Help
              </button>

              <button
                onClick={onOpenVolunteer}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#E05638] hover:bg-[#C94326] shadow-sm shadow-[#E05638]/25 hover:shadow-md hover:shadow-[#E05638]/35 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Become a Volunteer
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onOpenRequestHelp}
                className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold text-[#E05638] bg-white border border-[#DDD4C5]"
              >
                Get Help
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#0F1E36] hover:bg-[#EFE8DD] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E1D5] px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-semibold text-[#0F1E36] hover:bg-white hover:text-[#E05638] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8E1D5] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRequestHelp();
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-[#0F1E36] bg-white border border-[#DDD4C5] flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#E05638]" />
                Get Help (Confidential Request)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVolunteer();
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#E05638] flex items-center justify-center gap-2 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Become a Volunteer
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrackRequest();
                }}
                className="w-full py-2 text-xs font-medium text-stone-600 hover:text-[#0F1E36] flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-[#E05638]" />
                Track Existing Help Request
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
