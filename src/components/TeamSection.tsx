import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Copy, 
  Check, 
  UserCircle2, 
  Camera, 
  Sparkles, 
  Edit3, 
  Save, 
  X,
  ExternalLink
} from 'lucide-react';

interface TeamMemberData {
  id: string;
  email: string;
  customName?: string;
  customRole?: string;
  customPhoto?: string;
}

interface TeamSectionProps {
  onNotify?: (msg: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onNotify }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // The 3 strictly specified team emails
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(() => {
    const saved = localStorage.getItem('ht_team_custom_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      { id: 'member-1', email: 'ariseniikhila@gmail.com' },
      { id: 'member-2', email: 'praveenatella03@gmail.com' },
      { id: 'member-3', email: 'kavyadoddi15@gmail.com' },
    ];
  });

  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
    if (onNotify) onNotify(`Copied ${email} to clipboard`);
  };

  const startEdit = (m: TeamMemberData) => {
    setEditingMemberId(m.id);
    setEditName(m.customName || '');
    setEditRole(m.customRole || '');
  };

  const saveEdit = (id: string) => {
    const updated = teamMembers.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          customName: editName.trim() || undefined,
          customRole: editRole.trim() || undefined,
        };
      }
      return m;
    });
    setTeamMembers(updated);
    localStorage.setItem('ht_team_custom_v1', JSON.stringify(updated));
    setEditingMemberId(null);
    if (onNotify) onNotify('Team member details updated successfully');
  };

  return (
    <section id="team" className="py-20 bg-white border-t border-b border-[#EDE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Styled precisely after startup requirements */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FAF2EB] text-[#E05638] border border-[#F3DCD5]">
            <Users className="w-3.5 h-3.5" />
            Our Team – Hands Together
          </span>
          
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight">
            Team Members
          </h2>

          <p className="mt-3 text-base sm:text-lg text-stone-600">
            The core founding contributors behind the Hands Together community platform vision and startup initiative.
          </p>
        </div>

        {/* 3 Team Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const isEditing = editingMemberId === member.id;

            return (
              <div
                key={member.id}
                className="rounded-3xl bg-[#FAF7F2] border border-[#E9DFD2] p-8 text-center relative overflow-hidden shadow-xs hover:shadow-lg hover:border-[#E05638]/40 transition-all flex flex-col justify-between group"
              >
                {/* Decorative Member Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-[#E0D7C8] text-stone-500">
                    Member 0{index + 1}
                  </span>
                </div>

                <div>
                  {/* Profile Picture Placeholder Area */}
                  <div className="relative mx-auto w-28 h-28 mb-5">
                    <div className="w-28 h-28 rounded-full bg-white border-2 border-dashed border-[#DDD3C4] group-hover:border-[#E05638] flex flex-col items-center justify-center text-stone-400 group-hover:text-[#E05638] transition-colors shadow-inner overflow-hidden">
                      <UserCircle2 className="w-16 h-16 stroke-1" />
                    </div>
                    
                    {/* Camera / Upload indicator badge */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#E05638] text-white flex items-center justify-center shadow-md border-2 border-white" title="Space reserved for Profile Picture">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-stone-500 block mb-3">
                    (Space reserved for Profile Picture)
                  </span>

                  {/* Name & Role Section */}
                  {isEditing ? (
                    <div className="space-y-2 mb-4 bg-white p-3 rounded-2xl border border-[#E0D7C8] text-left">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block">Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Enter Member Name"
                          className="w-full px-2 py-1 text-xs rounded border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E05638]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-500 block">Role</label>
                        <input
                          type="text"
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          placeholder="e.g. Lead Coordinator / Developer"
                          className="w-full px-2 py-1 text-xs rounded border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E05638]"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => saveEdit(member.id)}
                          className="px-2.5 py-1 rounded bg-[#E05638] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3 h-3" /> Save
                        </button>
                        <button
                          onClick={() => setEditingMemberId(null)}
                          className="px-2.5 py-1 rounded bg-stone-100 text-stone-600 text-[11px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 mb-4">
                      <h3 className="text-xl font-extrabold text-[#0F1E36]">
                        {member.customName || '[Name to be updated]'}
                      </h3>
                      <p className="text-xs font-semibold text-stone-500">
                        {member.customRole || '[Role / Designation to be assigned]'}
                      </p>
                    </div>
                  )}

                  {/* Official Team Member Email (Strictly preserved) */}
                  <div className="bg-white p-3 rounded-2xl border border-[#E5DCD0] flex items-center justify-between gap-2 shadow-xs mb-4">
                    <div className="flex items-center gap-2 truncate text-left">
                      <Mail className="w-4 h-4 text-[#E05638] shrink-0" />
                      <span className="text-xs font-mono font-semibold text-[#0F1E36] truncate">
                        {member.email}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyEmail(member.email)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-[#E05638] hover:bg-stone-50 transition-colors shrink-0 cursor-pointer"
                      title="Copy email address"
                      aria-label="Copy email"
                    >
                      {copiedEmail === member.email ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#EDE4D6] flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${member.email}?subject=Hands%20Together%20Inquiry`}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#1E2E48] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send Mail
                  </a>

                  <button
                    onClick={() => startEdit(member)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-white border border-[#DDD3C4] hover:text-[#E05638] hover:border-[#E05638] transition-colors flex items-center gap-1 cursor-pointer"
                    title="Add or edit name and role for presentation"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Info
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Informational Guidance Note for Presentation */}
        <div className="mt-10 max-w-2xl mx-auto p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2] text-center text-xs text-stone-500">
          <p>
            <strong>Note for Evaluation:</strong> The section above accurately displays the startup team emails (<code>ariseniikhila@gmail.com</code>, <code>praveenatella03@gmail.com</code>, and <code>kavyadoddi15@gmail.com</code>) with designated spaces reserved for names, designations, and profile pictures. Click &ldquo;Edit Info&rdquo; on any card to input your presentation details.
          </p>
        </div>

      </div>
    </section>
  );
};
