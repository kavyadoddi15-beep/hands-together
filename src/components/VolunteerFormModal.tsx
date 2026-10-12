import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Download, 
  Share2,
  Calendar,
  Award
} from 'lucide-react';
import { VolunteerSubmission } from '../types';

interface VolunteerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<VolunteerSubmission, 'id' | 'createdAt'>) => Promise<{ success: boolean; volunteerId: string }>;
  onNotify?: (msg: string) => void;
}

export const VolunteerFormModal: React.FC<VolunteerFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onNotify,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Teaching & Tutoring']);
  const [availability, setAvailability] = useState('Weekends (Saturdays & Sundays)');
  const [preferredCategory, setPreferredCategory] = useState('Education Support');
  const [motivation, setMotivation] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState<{ volunteerId: string; name: string } | null>(null);

  if (!isOpen) return null;

  const availableSkills = [
    'Teaching & Tutoring',
    'Food Distribution & Logistics',
    'Healthcare & First Aid',
    'Driving & Transport',
    'Digital Skills & Tech',
    'Elderly Care & Counseling',
    'Event Coordination',
    'Photography & Social Media'
  ];

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleQuickFillDemo = () => {
    setFullName('Kavya Doddi (Demo)');
    setEmail('kavyadoddi15@gmail.com');
    setPhone('+91 98765 12345');
    setCity('Hyderabad');
    setSelectedSkills(['Teaching & Tutoring', 'Digital Skills & Tech', 'Event Coordination']);
    setAvailability('Flexible / On-call');
    setPreferredCategory('Education Support');
    setMotivation('Passionate about social welfare and empowering underprivileged youth through digital literacy.');
    setAgreedToTerms(true);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim()) {
      setErrorMsg('Please fill in all mandatory contact information.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg('Please accept the volunteer code of conduct and consent.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await onSubmit({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        skills: selectedSkills,
        availability,
        preferredCategory,
        motivation: motivation.trim(),
        agreedToTerms: true,
      });

      setSuccessData({ volunteerId: res.volunteerId, name: fullName.trim() });
      if (onNotify) onNotify(`Welcome to Hands Together, ${fullName.trim()}! ID: ${res.volunteerId}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit volunteer registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setSelectedSkills(['Teaching & Tutoring']);
    setMotivation('');
    setAgreedToTerms(false);
    setSuccessData(null);
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
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#0F1E36]">
                Volunteer Registration
              </h3>
              <p className="text-xs text-stone-500">
                Join Hands Together Community Support Network
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
          
          {successData ? (
            /* Success Celebration Card */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E05638]">
                  Registration Confirmed
                </span>
                <h4 className="text-2xl font-extrabold text-[#0F1E36] mt-1">
                  Welcome to Hands Together, {successData.name}!
                </h4>
                <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
                  Your volunteer profile has been officially registered in the community database. A regional coordinator will contact you for orientation.
                </p>
              </div>

              {/* Digital Volunteer Badge Card */}
              <div className="max-w-md mx-auto rounded-3xl bg-gradient-to-br from-[#0F1E36] to-[#1E2E48] text-white p-6 shadow-xl relative overflow-hidden text-left border border-stone-800">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#E05638] fill-[#E05638]" />
                    <span className="font-bold text-sm tracking-wide">Hands Together</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-amber-300">
                    OFFICIAL VOLUNTEER
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-stone-400">Volunteer Name</p>
                  <p className="text-lg font-bold text-white">{successData.name}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-3">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Volunteer ID</span>
                    <span className="font-mono font-bold text-amber-300">{successData.volunteerId}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Issued Date</span>
                    <span className="font-medium text-stone-200">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-300">
                  <span>Together We Care, Together We Change</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#1E2E48] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Quick Fill Button for Demo Evaluators */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2] text-xs">
                <span className="text-stone-600 font-medium">Testing this feature for project demo?</span>
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

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Full Name <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Email Address <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. volunteer@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Phone / WhatsApp Number <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
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
                    placeholder="e.g. Hyderabad / Begumpet"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>
              </div>

              {/* Skills & Interests Multi-select */}
              <div>
                <label className="block text-xs font-bold text-[#0F1E36] mb-2">
                  Skills & Interests (Select all that apply) <span className="text-[#E05638]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleToggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E05638] text-white shadow-xs'
                            : 'bg-[#FAF7F2] text-stone-700 border border-[#DDD3C4] hover:border-[#E05638]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability & Preferred Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Availability Schedule <span className="text-[#E05638]">*</span>
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none font-medium"
                  >
                    <option value="Weekends (Saturdays & Sundays)">Weekends (Saturdays & Sundays)</option>
                    <option value="Weekday Mornings">Weekday Mornings</option>
                    <option value="Weekday Evenings">Weekday Evenings</option>
                    <option value="Flexible / On-call for Emergencies">Flexible / On-call for Emergencies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Preferred Volunteering Area <span className="text-[#E05638]">*</span>
                  </label>
                  <select
                    value={preferredCategory}
                    onChange={(e) => setPreferredCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none font-medium"
                  >
                    <option value="Education Support">Education Support (Teaching & Supplies)</option>
                    <option value="Food Relief">Food Relief & Daily Meals</option>
                    <option value="Healthcare Camps">Healthcare Camps & First Aid</option>
                    <option value="Environmental Drives">Environmental & Tree Plantation</option>
                    <option value="Govt Welfare Scheme Awareness">Govt Welfare Scheme Awareness Desk</option>
                  </select>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                  Why do you want to join Hands Together? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Share a few words about what inspires you to give back..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2]">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#E05638] focus:ring-[#E05638]"
                  />
                  <span>
                    I confirm my commitment to support community welfare in a respectful, non-discriminatory manner and agree to adhere to Hands Together volunteer safety guidelines.
                  </span>
                </label>
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
                  {isSubmitting ? 'Registering...' : 'Complete Volunteer Registration'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
