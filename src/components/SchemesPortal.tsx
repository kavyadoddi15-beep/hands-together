import React, { useState, useMemo } from 'react';
import { 
  Building, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  FileCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { GovernmentScheme } from '../types';
import { SchemeDetailModal } from './SchemeDetailModal';

interface SchemesPortalProps {
  schemes: GovernmentScheme[];
  onNotify?: (msg: string) => void;
}

export const SchemesPortal: React.FC<SchemesPortalProps> = ({
  schemes,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('All');
  const [activeModalScheme, setActiveModalScheme] = useState<GovernmentScheme | null>(null);

  const categories = [
    'All',
    'Healthcare',
    'Education',
    'Financial & Livelihood',
    'Women & Children',
    'Senior Citizens',
    'Housing & Sanitation',
  ];

  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      const matchCat = selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchJur = selectedJurisdiction === 'All' || s.jurisdiction.includes(selectedJurisdiction);
      const q = searchQuery.toLowerCase().trim();
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.shortCode.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.targetBeneficiaries.toLowerCase().includes(q) ||
        s.keyBenefits.some((b) => b.toLowerCase().includes(q));

      return matchCat && matchJur && matchQ;
    });
  }, [schemes, selectedCategory, selectedJurisdiction, searchQuery]);

  return (
    <section id="schemes" className="py-20 bg-white border-b border-[#EDE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FAF2EB] text-[#E05638] border border-[#F3DCD5]">
            <Building className="w-3.5 h-3.5" />
            Verified Citizen Support Portal
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight">
            Government Welfare Schemes Directory
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Connecting eligible citizens with verified public welfare initiatives, healthcare benefits, and direct financial subsidies without intermediaries.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-12 bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#E9DFD2] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes by name, keyword (e.g. Health, Pension, Student, Ration, Housing)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#DDD3C4] focus:outline-none focus:ring-2 focus:ring-[#E05638] focus:border-transparent text-sm text-[#0F1E36] placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Jurisdiction Dropdown */}
            <div className="md:col-span-4 relative">
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#DDD3C4] focus:outline-none focus:ring-2 focus:ring-[#E05638] text-sm text-[#0F1E36] font-medium"
              >
                <option value="All">All Jurisdictions (National & State)</option>
                <option value="Central">Central Govt (All India)</option>
                <option value="State">State Specific Welfare</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 pt-4 border-t border-[#EDE4D6] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#E05638]" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F1E36] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-[#DDD3C4] hover:border-[#E05638] hover:text-[#E05638]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Transparency Notice */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 px-1">
          <p>
            Showing <strong className="text-[#0F1E36]">{filteredSchemes.length}</strong> official verified public welfare programs
          </p>
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Government Domain Direct Links</span>
          </div>
        </div>

        {/* Schemes Cards Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="mt-12 text-center py-16 bg-[#FAF7F2] rounded-3xl border border-dashed border-[#DDD3C4] p-8">
            <Info className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0F1E36]">No schemes match your criteria</h3>
            <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or selecting &ldquo;All&rdquo; categories to view the complete public welfare directory.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedJurisdiction('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#E05638]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-7">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="rounded-3xl bg-white p-7 border border-[#E8DFD0] shadow-xs hover:shadow-lg hover:border-[#E05638]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF3EA] text-[#E05638] border border-[#F1DCCF]">
                        {scheme.category}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        {scheme.jurisdiction}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-xl font-bold text-[#0F1E36] leading-snug">
                    {scheme.name}
                  </h3>

                  <p className="mt-2.5 text-xs text-stone-500 font-medium">
                    Department: {scheme.officialDepartment}
                  </p>

                  <p className="mt-3 text-sm text-stone-700 leading-relaxed">
                    {scheme.shortDescription}
                  </p>

                  {/* Target Beneficiaries Chip */}
                  <div className="mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE7DC] text-xs">
                    <span className="font-bold text-stone-700 block mb-0.5">Target Beneficiaries:</span>
                    <span className="text-stone-600">{scheme.targetBeneficiaries}</span>
                  </div>

                  {/* Highlights of Benefits */}
                  <div className="mt-4">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {scheme.keyBenefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents Pill Preview */}
                  <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-stone-500 mr-1">Required:</span>
                    {scheme.requiredDocuments.slice(0, 3).map((doc, idx) => (
                      <span key={idx} className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                        {doc}
                      </span>
                    ))}
                    {scheme.requiredDocuments.length > 3 && (
                      <span className="text-[11px] text-stone-400">+{scheme.requiredDocuments.length - 3} more</span>
                    )}
                  </div>

                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-[#F2ECE2] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalScheme(scheme)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-[#0F1E36] bg-[#FAF7F2] border border-[#DDD3C4] hover:bg-[#E05638] hover:text-white hover:border-[#E05638] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Full Guide & Steps
                  </button>

                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-[#E05638] hover:text-[#C84326] bg-white border border-[#E05638]/40 hover:border-[#E05638] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={activeModalScheme}
        onClose={() => setActiveModalScheme(null)}
        onNotify={onNotify}
      />
    </section>
  );
};
