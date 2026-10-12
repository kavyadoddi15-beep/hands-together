import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Code, 
  Database, 
  Terminal, 
  Server, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  Globe,
  Share2
} from 'lucide-react';

interface ProjectDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

export const ProjectDocsModal: React.FC<ProjectDocsModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'schema' | 'instructions' | 'deployment'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copySnippet = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
    if (onNotify) onNotify('Code snippet copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E9E1D2] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F1E36] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E05638] flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display">
                Hands Together – Project Architecture & Technical Guide
              </h3>
              <p className="text-xs text-stone-300">
                Documentation for Startup Demonstration & College Evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#FAF7F2] border-b border-[#E8DFD0] px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#E05638] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-[#DDD3C4] hover:border-[#E05638]'
            }`}
          >
            1. Project Overview & Team
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-[#E05638] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-[#DDD3C4] hover:border-[#E05638]'
            }`}
          >
            2. Folder Structure & Tech Stack
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'schema'
                ? 'bg-[#E05638] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-[#DDD3C4] hover:border-[#E05638]'
            }`}
          >
            3. Database Schema & API
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'instructions'
                ? 'bg-[#E05638] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-[#DDD3C4] hover:border-[#E05638]'
            }`}
          >
            4. Local Execution & Testing
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'deployment'
                ? 'bg-[#E05638] text-white shadow-xs'
                : 'bg-white text-stone-600 border border-[#DDD3C4] hover:border-[#E05638]'
            }`}
          >
            5. Production Deployment
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-[#0F1E36] text-xs sm:text-sm space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD2]">
                <h4 className="text-base font-bold text-[#0F1E36] mb-1">
                  Project: Hands Together (Social Service & Community Support Platform)
                </h4>
                <p className="text-xs text-[#E05638] font-bold uppercase tracking-wider mb-2">
                  Tagline: Together We Care, Together We Change
                </p>
                <p className="text-stone-700 leading-relaxed">
                  Hands Together is designed to connect people who need help with people who are willing to help. It bridges grassroots resource mobilization, volunteer coordination, and authentic awareness of official government welfare schemes (PM-JAY, PMAY, NMMSS scholarships, and more).
                </p>
              </div>

              <div>
                <h5 className="font-bold text-stone-800 text-sm mb-2">Startup Founding Team Members</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-mono text-xs text-[#0F1E36] font-semibold block">ariseniikhila@gmail.com</span>
                    <span className="text-[11px] text-stone-500 mt-1 block">Founding Contributor</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-mono text-xs text-[#0F1E36] font-semibold block">praveenatella03@gmail.com</span>
                    <span className="text-[11px] text-stone-500 mt-1 block">Founding Contributor</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="font-mono text-xs text-[#0F1E36] font-semibold block">kavyadoddi15@gmail.com</span>
                    <span className="text-[11px] text-stone-500 mt-1 block">Founding Contributor</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-stone-800 text-sm mb-2">Core Deliverables Implemented</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                  <li className="flex items-center gap-2">✓ Modern warm cream & coral-red responsive UI</li>
                  <li className="flex items-center gap-2">✓ Verified Government Schemes portal with search & filters</li>
                  <li className="flex items-center gap-2">✓ Confidential Request Help desk with tracking ID</li>
                  <li className="flex items-center gap-2">✓ Volunteer registration with ID certificate generation</li>
                  <li className="flex items-center gap-2">✓ Community Initiatives with live RSVP tracking</li>
                  <li className="flex items-center gap-2">✓ Full-stack Express backend + resilient client storage</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-[#0F1E36]">Project Folder Structure</h4>
              <pre className="p-4 rounded-2xl bg-[#0F1E36] text-amber-100 font-mono text-xs overflow-x-auto leading-relaxed">
{`/hands-together
├── index.html                  # HTML entry point with meta tags & fonts
├── package.json                # Dependencies, Express scripts & Tailwind
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler & path aliases
├── server.ts                   # Full-stack Node/Express server & Vite middleware
├── metadata.json               # AI Studio application metadata
└── src/
    ├── main.tsx                # React DOM mounting
    ├── App.tsx                 # Root component orchestrating modals & state
    ├── index.css               # Tailwind CSS v4 directives & typography
    ├── types/
    │   └── index.ts            # Interfaces: Scheme, Initiative, Volunteer, HelpRequest
    ├── data/
    │   ├── schemesData.ts      # Curated official Indian government schemes & links
    │   └── initiativesData.ts  # Community drives, metrics, & dates
    ├── services/
    │   └── api.ts              # Resilient API client with LocalStorage fallback
    └── components/
        ├── Navbar.tsx          # Responsive navigation & helpline banner
        ├── Hero.tsx            # Hero with stats cards & custom community SVG
        ├── AboutSection.tsx    # Mission, Vision & 4 core pillars
        ├── ServicesSection.tsx # 6 Social service categories
        ├── SchemesPortal.tsx   # Searchable Govt Welfare Schemes catalog
        ├── SchemeDetailModal.tsx # Full scheme breakdown & official link
        ├── InitiativesSection.tsx # Community projects & drives
        ├── InitiativeDetailModal.tsx # Initiative details & RSVP form
        ├── VolunteerFormModal.tsx # Volunteer registration & ID badge
        ├── RequestHelpModal.tsx # Confidential assistance request desk
        ├── TrackRequestModal.tsx # Ticket tracking workflow timeline
        ├── TeamSection.tsx     # Startup team with specified emails
        ├── ContactSection.tsx  # Inquiries form & FAQ accordion
        └── Footer.tsx          # Helplines directory & copyright`}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-[#0F1E36]">Database Schema (PostgreSQL / Firestore Blueprint)</h4>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <h5 className="font-bold text-[#0F1E36] mb-1 font-mono">Table: volunteers</h5>
                  <p className="text-stone-600 mb-2">Stores registered volunteer profiles.</p>
                  <pre className="bg-[#0F1E36] text-stone-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`CREATE TABLE volunteers (
  id VARCHAR(64) PRIMARY KEY, -- e.g. HT-VOL-4821
  full_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  city VARCHAR(64) NOT NULL,
  skills TEXT[] NOT NULL,
  availability VARCHAR(64) NOT NULL,
  preferred_category VARCHAR(64) NOT NULL,
  motivation TEXT,
  agreed_to_terms BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                  </pre>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <h5 className="font-bold text-[#0F1E36] mb-1 font-mono">Table: help_requests</h5>
                  <p className="text-stone-600 mb-2">Confidential assistance intake; contact details protected by role access.</p>
                  <pre className="bg-[#0F1E36] text-stone-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`CREATE TABLE help_requests (
  ticket_id VARCHAR(32) PRIMARY KEY, -- e.g. HT-REQ-7912
  requester_name VARCHAR(128) NOT NULL,
  contact_number VARCHAR(32) NOT NULL,
  email VARCHAR(128),
  assistance_type VARCHAR(64) NOT NULL,
  urgency VARCHAR(32) NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(64) NOT NULL,
  address_details TEXT,
  status VARCHAR(32) DEFAULT 'Received', -- 'Received', 'Assigned', 'In Progress', 'Fulfilled'
  confidential_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-[#0F1E36]">Local Setup & Testing Instructions</h4>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="font-bold text-stone-800">Step 1: Install Dependencies</span>
                  <div className="flex items-center justify-between bg-[#0F1E36] text-stone-200 p-2.5 rounded-xl font-mono text-xs">
                    <code>npm install</code>
                    <button
                      onClick={() => copySnippet('npm', 'npm install')}
                      className="text-stone-400 hover:text-white"
                    >
                      {copiedKey === 'npm' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="font-bold text-stone-800">Step 2: Start Development Server</span>
                  <div className="flex items-center justify-between bg-[#0F1E36] text-stone-200 p-2.5 rounded-xl font-mono text-xs">
                    <code>npm run dev</code>
                    <button
                      onClick={() => copySnippet('dev', 'npm run dev')}
                      className="text-stone-400 hover:text-white"
                    >
                      {copiedKey === 'dev' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-stone-600 text-xs">
                    The app boots on <code>http://localhost:3000</code> mounting both the Express API routes and the Vite frontend.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="font-bold text-stone-800">Step 3: Verification & Feature Checklist</span>
                  <ul className="space-y-1.5 text-stone-700 text-xs">
                    <li>• Click <strong>&ldquo;Become a Volunteer&rdquo;</strong> → Click &ldquo;Quick Fill Demo&rdquo; → Submit → View generated ID Badge.</li>
                    <li>• Click <strong>&ldquo;Get Help&rdquo;</strong> → Fill request or click &ldquo;Quick Fill&rdquo; → Receive unique Ticket ID.</li>
                    <li>• Click <strong>&ldquo;Track Help Request&rdquo;</strong> in header → Test pre-seeded ticket <code>HT-DEMO-2026</code> → Observe 4-stage timeline.</li>
                    <li>• Filter and search schemes by &ldquo;Healthcare&rdquo; or &ldquo;Education&rdquo; → Click &ldquo;Full Guide &amp; Steps&rdquo;.</li>
                    <li>• Scroll to <strong>&ldquo;Our Team – Hands Together&rdquo;</strong> → Inspect the 3 emails: <code>ariseniikhila@gmail.com</code>, <code>praveenatella03@gmail.com</code>, <code>kavyadoddi15@gmail.com</code>.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-[#0F1E36]">Deployment to Production</h4>
              
              <div className="space-y-3 text-stone-700 text-xs leading-relaxed">
                <p>
                  Hands Together can be deployed to any modern cloud runtime (Google Cloud Run, Vercel, Render, or Railway):
                </p>
                <div className="p-4 rounded-2xl bg-[#0F1E36] text-amber-100 font-mono text-xs space-y-2">
                  <p># 1. Build production bundle</p>
                  <p className="text-emerald-300">npm run build</p>
                  <p className="mt-2"># 2. Start full-stack server</p>
                  <p className="text-emerald-300">npm run start</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <strong>Production Ready:</strong> In production mode, <code>server.ts</code> statically serves the compiled <code>dist/</code> assets while handling <code>/api/*</code> endpoints on the same port!
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF7F2] border-t border-[#EDE6DC] px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Hands Together – Social Service & Community Support Startup
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#1E2E48] cursor-pointer"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
