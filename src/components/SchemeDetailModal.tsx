import React from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Users, 
  Building, 
  Clock, 
  Share2, 
  Printer,
  AlertCircle
} from 'lucide-react';
import { GovernmentScheme } from '../types';

interface SchemeDetailModalProps {
  scheme: GovernmentScheme | null;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onNotify,
}) => {
  if (!scheme) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme.name,
        text: `${scheme.name}: ${scheme.shortDescription} (Official Portal: ${scheme.officialPortalUrl})`,
        url: scheme.officialPortalUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${scheme.name} - Official Application Link: ${scheme.officialPortalUrl}`);
      if (onNotify) onNotify('Official scheme link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E9E1D2] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EDE6DC] px-6 py-5 flex items-start justify-between z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF3EA] text-[#E05638] border border-[#F1DC CF]">
                {scheme.category}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                {scheme.jurisdiction}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Official Portal
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1E36]">
              {scheme.name}
            </h3>
            <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-stone-400" />
              {scheme.officialDepartment}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7 text-[#0F1E36]">
          
          {/* Summary */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D7]">
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              {scheme.shortDescription}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Catalog Guideline Verified: {scheme.lastUpdated}</span>
            </div>
          </div>

          {/* Target Beneficiaries */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#E05638]" />
              Target Beneficiaries & Scope
            </h4>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-800">
              {scheme.targetBeneficiaries}
            </div>
          </div>

          {/* Main Benefits */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Key Entitlements & Monetary Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scheme.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Eligibility Criteria
            </h4>
            <ul className="space-y-2 text-sm text-stone-700">
              {scheme.eligibilityCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05638] mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#0F1E36]" />
              Required Documents Checklist
            </h4>
            <div className="flex flex-wrap gap-2">
              {scheme.requiredDocuments.map((doc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-xs font-medium text-stone-800"
                >
                  ✓ {doc}
                </span>
              ))}
            </div>
          </div>

          {/* Application Steps */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-[#E05638]" />
              Official Step-by-Step Application Process
            </h4>
            <ol className="space-y-3">
              {scheme.applicationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE7DC]">
                  <span className="w-6 h-6 rounded-full bg-[#0F1E36] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Official Portal Notice */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <strong>Official Government Portal Link Notice:</strong> All links provided below redirect directly to the authentic Government of India or respective State Government servers (e.g. .gov.in / .nic.in). Hands Together does not collect application processing fees.
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#FAF7F2] border-t border-[#EDE6DC] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Guide
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50"
            >
              Close
            </button>
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
