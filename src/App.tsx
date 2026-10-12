import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SchemesPortal } from './components/SchemesPortal';
import { InitiativesSection } from './components/InitiativesSection';
import { VolunteerCtaSection } from './components/VolunteerCtaSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VolunteerFormModal } from './components/VolunteerFormModal';
import { RequestHelpModal } from './components/RequestHelpModal';
import { TrackRequestModal } from './components/TrackRequestModal';
import { ProjectDocsModal } from './components/ProjectDocsModal';
import { NotificationToast } from './components/NotificationToast';

import { api } from './services/api';
import { 
  GovernmentScheme, 
  CommunityInitiative, 
  CommunityStats, 
  VolunteerSubmission, 
  HelpRequest, 
  ContactMessage 
} from './types';
import { OFFICIAL_GOVERNMENT_SCHEMES } from './data/schemesData';
import { COMMUNITY_INITIATIVES } from './data/initiativesData';

export default function App() {
  const [stats, setStats] = useState<CommunityStats>({
    volunteersCount: 1240,
    peopleHelpedCount: 3850,
    activeInitiativesCount: 42,
    partnerOrganizationsCount: 18,
    schemesCatalogCount: OFFICIAL_GOVERNMENT_SCHEMES.length,
  });

  const [schemes, setSchemes] = useState<GovernmentScheme[]>(OFFICIAL_GOVERNMENT_SCHEMES);
  const [initiatives, setInitiatives] = useState<CommunityInitiative[]>(COMMUNITY_INITIATIVES);

  // Modals state
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isRequestHelpOpen, setIsRequestHelpOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [activeTrackTicket, setActiveTrackTicket] = useState<string>('');
  const [isProjectDocsOpen, setIsProjectDocsOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load live stats & data on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const s = await api.getStats();
        setStats(s);
        const inits = await api.getInitiatives();
        setInitiatives(inits);
        const scs = await api.getSchemes();
        setSchemes(scs);
      } catch (err) {
        console.warn('Network API fetch note: Using local cached dataset', err);
      }
    };
    loadInitialData();
  }, []);

  const handleNotify = (msg: string) => {
    setToastMessage(msg);
  };

  const handleVolunteerSubmit = async (data: Omit<VolunteerSubmission, 'id' | 'createdAt'>) => {
    const res = await api.registerVolunteer(data);
    // Refresh stats
    const updatedStats = await api.getStats();
    setStats(updatedStats);
    return res;
  };

  const handleRequestHelpSubmit = async (data: Omit<HelpRequest, 'ticketId' | 'status' | 'createdAt'>) => {
    const res = await api.submitHelpRequest(data);
    const updatedStats = await api.getStats();
    setStats(updatedStats);
    return res;
  };

  const handleTrackRequest = async (ticketId: string): Promise<HelpRequest | null> => {
    return await api.trackRequest(ticketId);
  };

  const handleJoinInitiative = async (initiativeId: string, name: string, email: string) => {
    const updated = await api.joinInitiative(initiativeId, name, email);
    setInitiatives((prev) => prev.map((item) => (item.id === initiativeId ? updated : item)));
    const updatedStats = await api.getStats();
    setStats(updatedStats);
  };

  const handleContactSubmit = async (data: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    return await api.submitContactMessage(data);
  };

  const handleOpenTrackModalWithTicket = (ticketId?: string) => {
    setActiveTrackTicket(ticketId || '');
    setIsTrackOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F1E36] flex flex-col font-sans selection:bg-[#E05638]/20 selection:text-[#0F1E36]">
      
      {/* 1. Navigation Bar */}
      <Navbar
        onOpenVolunteer={() => setIsVolunteerOpen(true)}
        onOpenRequestHelp={() => setIsRequestHelpOpen(true)}
        onOpenTrackRequest={() => {
          setActiveTrackTicket('');
          setIsTrackOpen(true);
        }}
        onOpenProjectDocs={() => setIsProjectDocsOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          stats={stats}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenRequestHelp={() => setIsRequestHelpOpen(true)}
        />

        {/* 3. About Hands Together */}
        <AboutSection />

        {/* 4. Our Services */}
        <ServicesSection
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenRequestHelp={() => setIsRequestHelpOpen(true)}
        />

        {/* 5. Government Schemes and Public Services */}
        <SchemesPortal
          schemes={schemes}
          onNotify={handleNotify}
        />

        {/* 6. Community Initiatives */}
        <InitiativesSection
          initiatives={initiatives}
          onJoinInitiative={handleJoinInitiative}
          onNotify={handleNotify}
        />

        {/* 7. Volunteer Registration Call-to-Action */}
        <VolunteerCtaSection
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
        />

        {/* 8. Our Team Section with Three Members */}
        <TeamSection
          onNotify={handleNotify}
        />

        {/* 9. Contact Section */}
        <ContactSection
          onSubmitContact={handleContactSubmit}
          onNotify={handleNotify}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenVolunteer={() => setIsVolunteerOpen(true)}
        onOpenRequestHelp={() => setIsRequestHelpOpen(true)}
        onOpenTrackRequest={() => {
          setActiveTrackTicket('');
          setIsTrackOpen(true);
        }}
        onOpenProjectDocs={() => setIsProjectDocsOpen(true)}
      />

      {/* Interactive Modals */}
      <VolunteerFormModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
        onSubmit={handleVolunteerSubmit}
        onNotify={handleNotify}
      />

      <RequestHelpModal
        isOpen={isRequestHelpOpen}
        onClose={() => setIsRequestHelpOpen(false)}
        onSubmit={handleRequestHelpSubmit}
        onOpenTrack={handleOpenTrackModalWithTicket}
        onNotify={handleNotify}
      />

      <TrackRequestModal
        isOpen={isTrackOpen}
        initialTicketId={activeTrackTicket}
        onClose={() => setIsTrackOpen(false)}
        onTrack={handleTrackRequest}
      />

      <ProjectDocsModal
        isOpen={isProjectDocsOpen}
        onClose={() => setIsProjectDocsOpen(false)}
        onNotify={handleNotify}
      />

      {/* Global Toast Notification */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
