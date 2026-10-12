import React from 'react';
import { 
  Building, 
  GraduationCap, 
  UtensilsCrossed, 
  HeartPulse, 
  Users, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  BadgeInfo
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenVolunteer: () => void;
  onOpenRequestHelp: () => void;
  onSelectCategory?: (category: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenVolunteer,
  onOpenRequestHelp,
}) => {
  const services = [
    {
      id: 'govt-schemes',
      title: 'Government Schemes & Public Services',
      description: 'Discover central and state welfare programs, clear eligibility guidelines, monetary benefits, and official step-by-step application instructions.',
      icon: Building,
      badgeText: 'Verified Govt Portals',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      actionLabel: 'Browse Schemes Directory',
      actionHref: '#schemes',
      keyPoints: [
        'Healthcare & Ayushman coverage guides',
        'Scholarships for underprivileged students',
        'Direct links to official .gov.in portals'
      ]
    },
    {
      id: 'education-support',
      title: 'Education & Mentorship Support',
      description: 'Connecting deserving school and college students with supplementary learning resources, donated textbooks, stationery, and volunteer mentors.',
      icon: GraduationCap,
      badgeText: 'Grassroots Community',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      actionLabel: 'Request Study Aid',
      isHelpAction: true,
      keyPoints: [
        'Free weekend bridge tutoring sessions',
        'Textbooks & stationery collection drives',
        'Exam counseling and career guidance'
      ]
    },
    {
      id: 'food-supplies',
      title: 'Food Relief & Essential Supplies',
      description: 'Mobilizing community kitchens and dry ration support for daily-wage households, homeless shelters, and families facing sudden hardship.',
      icon: UtensilsCrossed,
      badgeText: 'Direct Relief',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      actionLabel: 'Request Ration Support',
      isHelpAction: true,
      keyPoints: [
        'Weekly cooked meal distribution kits',
        'Monthly dry grains & pulses kits',
        'Warm clothes & winter blanket drives'
      ]
    },
    {
      id: 'healthcare-assistance',
      title: 'Healthcare Assistance & Medical Aid',
      description: 'Connecting needy patients with free health screening camps, emergency medicines assistance, and guidance for government medical insurance.',
      icon: HeartPulse,
      badgeText: 'Compassionate Care',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      actionLabel: 'Request Medical Aid',
      isHelpAction: true,
      keyPoints: [
        'Emergency prescription medicine support',
        'Free community health & eye camps',
        'Senior citizen wellness visits'
      ]
    },
    {
      id: 'volunteer-opps',
      title: 'Volunteer Opportunities & Youth Drives',
      description: 'Find local social initiatives and weekend community drives where your time, compassion, and professional skills create immediate tangible impact.',
      icon: Users,
      badgeText: 'Community Powered',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      actionLabel: 'Register as Volunteer',
      isVolunteerAction: true,
      keyPoints: [
        'Weekend community teaching & cleanups',
        'Disaster response & emergency distribution',
        'Recognized volunteer certification'
      ]
    },
    {
      id: 'skill-sharing',
      title: 'Skill Sharing & Vocational Guidance',
      description: 'Bridging those with marketable skills—computer literacy, spoken English, tailoring, accounting—with youth seeking self-reliance.',
      icon: Sparkles,
      badgeText: 'Capacity Building',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      actionLabel: 'Join Skill Circles',
      actionHref: '#initiatives',
      keyPoints: [
        'Basic digital skills for small vendors',
        'Spoken English & communication practice',
        'Resume drafting & interview confidence'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#E05638] border border-[#E7DDD0]">
            <HeartPulse className="w-3.5 h-3.5 text-[#E05638]" />
            What Hands Together Does
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight">
            Comprehensive Community Social Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            A trusted hub providing direct relief, volunteer mobilization, and transparent access to government welfare schemes.
          </p>
        </div>

        {/* Disclaimer / Transparency Note */}
        <div className="mt-8 max-w-3xl mx-auto bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
          <BadgeInfo className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Transparency Notice:</strong> Hands Together provides both verified public guidance (e.g. authenticated government schemes with direct links) and community-driven social services. Direct assistance requests are coordinated through our volunteer review desk and kept strictly confidential.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-3xl bg-white p-7 sm:p-8 border border-[#E8DFD0] shadow-xs hover:shadow-lg hover:border-[#E05638]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAF5ED] group-hover:bg-[#E05638] text-[#E05638] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                      {service.badgeText}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F1E36] group-hover:text-[#E05638] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-stone-700 font-medium border-t border-[#F1EBE0] pt-4">
                    {service.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#E05638] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-[#F5F0E6]">
                  {service.isHelpAction ? (
                    <button
                      onClick={onOpenRequestHelp}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-[#0F1E36] bg-[#FAF7F2] border border-[#DDD4C5] hover:bg-[#E05638] hover:text-white hover:border-[#E05638] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {service.actionLabel}
                    </button>
                  ) : service.isVolunteerAction ? (
                    <button
                      onClick={onOpenVolunteer}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Users className="w-3.5 h-3.5" />
                      {service.actionLabel}
                    </button>
                  ) : (
                    <a
                      href={service.actionHref}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-[#0F1E36] bg-[#FAF7F2] border border-[#DDD4C5] hover:bg-[#0F1E36] hover:text-white hover:border-[#0F1E36] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{service.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
