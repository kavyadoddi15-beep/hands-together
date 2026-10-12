import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  onSubmitContact: (data: Omit<ContactMessage, 'id' | 'createdAt'>) => Promise<{ success: boolean }>;
  onNotify?: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSubmitContact,
  onNotify,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Community Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Hands Together verify community help requests?',
      a: 'All submitted requests are screened by our volunteer intake desk. A regional coordinator verifies basic circumstances via phone or accredited local partners to confirm essential details while maintaining 100% privacy and dignity.'
    },
    {
      q: 'Is there any fee or charge to receive help or join as a volunteer?',
      a: 'No. Hands Together is a non-profit social welfare and volunteer initiative. Joining as a volunteer, accessing our government scheme directories, and requesting help are completely free.'
    },
    {
      q: 'How do you ensure government scheme information is accurate?',
      a: 'We direct all users to authentic government domains (.gov.in / .nic.in) and regularly update eligibility checklists and required documentation against official ministry portals (such as National Health Authority, MoHUA, and NSAP).'
    },
    {
      q: 'Can local NGOs, student clubs, and welfare trusts partner with us?',
      a: 'Absolutely! We actively partner with verified grassroots trusts, universities, and student community clubs to mobilize volunteers and streamline food drives and tutoring sessions.'
    },
    {
      q: 'How is user and beneficiary privacy protected?',
      a: 'Help requests are kept confidential and are never published publicly. Only assigned coordinators have access to contact coordinates for direct aid distribution.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmitContact({
        name: name.trim(),
        email: email.trim(),
        topic,
        message: message.trim(),
      });
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      if (onNotify) onNotify('Message sent! Our support team will respond shortly.');
    } catch (err) {
      console.error(err);
      if (onNotify) onNotify('Could not send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#E05638] border border-[#E7DDD0]">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight">
            Connect With Hands Together
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Have questions, want to propose a partnership, or suggest a new welfare scheme? Reach out to our community support desk.
          </p>
        </div>

        {/* Contact Grid: Form & Info */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#E8DFD0] shadow-xs">
            <h3 className="text-xl font-bold text-[#0F1E36] mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Fill out the form below and we will get back to you within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Message Delivered Successfully!</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for reaching out to Hands Together. A community coordinator has received your query and will reply via email.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                      Your Name <span className="text-[#E05638]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Roy"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
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
                      placeholder="e.g. ananya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Subject / Topic <span className="text-[#E05638]">*</span>
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none font-medium"
                  >
                    <option value="General Community Inquiry">General Community Inquiry</option>
                    <option value="NGO / Trust Collaboration">NGO / Welfare Trust Collaboration</option>
                    <option value="Sponsor a Community Drive">Sponsor a Community Initiative</option>
                    <option value="Government Scheme Suggestion">Suggest a New Government Scheme</option>
                    <option value="College / Student Chapter">College / Student Volunteer Chapter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F1E36] mb-1">
                    Message <span className="text-[#E05638]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can Hands Together assist or collaborate with you?..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C4] text-xs focus:ring-2 focus:ring-[#E05638] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold text-white bg-[#E05638] hover:bg-[#C84326] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Support Highlights */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-7 rounded-3xl border border-[#E8DFD0] shadow-xs space-y-5">
              <h3 className="text-lg font-bold text-[#0F1E36]">
                Community Support Desk
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block text-[10px] uppercase">Official Startup Team Email</span>
                    <a href="mailto:contact@handstogether.org" className="text-xs font-semibold text-[#0F1E36] hover:text-[#E05638]">
                      contact@handstogether.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block text-[10px] uppercase">Toll-Free Helpline</span>
                    <a href="tel:1800123456" className="text-xs font-semibold text-[#0F1E36] hover:text-[#E05638]">
                      1800-123-456 (24/7 Community Support)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block text-[10px] uppercase">Operational Hours</span>
                    <span className="text-xs font-semibold text-[#0F1E36]">
                      Mon – Sat: 08:30 AM to 07:30 PM IST (Emergency Desk 24/7)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF2EB] text-[#E05638] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block text-[10px] uppercase">Headquarters / Region</span>
                    <span className="text-xs font-semibold text-[#0F1E36]">
                      Hands Together Community Support Center, Telangana & Andhra Pradesh, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helpline Box */}
            <div className="bg-[#0F1E36] text-white p-6 rounded-3xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E05638]">
                Emergency Assistance
              </span>
              <h4 className="text-base font-bold">
                Facing an Urgent Food or Medical Emergency?
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Use the dedicated &ldquo;Get Help&rdquo; button or call our emergency volunteer on-call coordinator directly.
              </p>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 pt-14 border-t border-[#EDE7DF]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-extrabold text-[#0F1E36]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Clear answers regarding our community platform, volunteer work, and government welfare guidance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#E8DFD0] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-[#0F1E36]">
                      {faq.q}
                    </span>
                    <span className="text-[#E05638] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-[#F3EDE2]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
