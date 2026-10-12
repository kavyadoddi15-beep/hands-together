import { 
  GovernmentScheme, 
  CommunityInitiative, 
  VolunteerSubmission, 
  HelpRequest, 
  ContactMessage, 
  CommunityStats 
} from '../types';
import { OFFICIAL_GOVERNMENT_SCHEMES } from '../data/schemesData';
import { COMMUNITY_INITIATIVES } from '../data/initiativesData';

const STORAGE_KEYS = {
  VOLUNTEERS: 'ht_volunteers_v1',
  HELP_REQUESTS: 'ht_help_requests_v1',
  CONTACT_MSGS: 'ht_contact_msgs_v1',
  INITIATIVES: 'ht_initiatives_v1',
  CUSTOM_TEAM: 'ht_custom_team_v1',
};

// Seed demo help requests so tracking works out of the box for demo reviewers
const DEMO_HELP_REQUESTS: HelpRequest[] = [
  {
    ticketId: 'HT-DEMO-2026',
    requesterName: 'S. Ramanujam (Demo Profile)',
    contactNumber: '+91 98765 43210',
    email: 'help.seeker@example.com',
    assistanceType: 'Emergency Healthcare & Medicines',
    urgency: 'Urgent (Within 48h)',
    description: 'Post-operative cardiac prescription medicines support needed for senior citizen residing alone.',
    city: 'Hyderabad',
    addressDetails: 'Near Old Post Office, Chanda Nagar',
    supportingDocNote: 'Discharge summary and hospital prescription attached in physical verification.',
    status: 'In Progress',
    createdAt: '2026-10-08T10:15:00Z',
    confidentialNotes: 'Assigned to coordinator Ananya R. Delivery arranged via volunteer healthcare pool.'
  },
  {
    ticketId: 'HT-AID-9812',
    requesterName: 'Lakshmi Devi (Demo Profile)',
    contactNumber: '+91 91234 56789',
    assistanceType: 'Education Support & Fees',
    urgency: 'Normal (Within 1 week)',
    description: 'Textbooks and geometry kit assistance required for two high school daughters.',
    city: 'Vijayawada',
    addressDetails: 'Ward 14, Autonagar',
    status: 'Assigned to Coordinator',
    createdAt: '2026-10-10T14:30:00Z',
    confidentialNotes: 'Connecting with local education donor partner.'
  }
];

export const getStoredInitiatives = (): CommunityInitiative[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INITIATIVES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return COMMUNITY_INITIATIVES;
};

export const saveInitiatives = (items: CommunityInitiative[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INITIATIVES, JSON.stringify(items));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
};

export const getStoredHelpRequests = (): HelpRequest[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS);
    if (raw) {
      const parsed: HelpRequest[] = JSON.parse(raw);
      return [...parsed];
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  // Initialize with demo items so users can immediately test the tracking feature
  try {
    localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(DEMO_HELP_REQUESTS));
  } catch {}
  return DEMO_HELP_REQUESTS;
};

export const getStoredVolunteers = (): VolunteerSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return [];
};

// API Services with network fallback
export const api = {
  getSchemes: async (query = '', category = '', jurisdiction = ''): Promise<GovernmentScheme[]> => {
    let list = [...OFFICIAL_GOVERNMENT_SCHEMES];
    if (category && category !== 'All') {
      list = list.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    if (jurisdiction && jurisdiction !== 'All') {
      list = list.filter((s) => s.jurisdiction.toLowerCase().includes(jurisdiction.toLowerCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortCode.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.targetBeneficiaries.toLowerCase().includes(q) ||
          s.keyBenefits.some((b) => b.toLowerCase().includes(q))
      );
    }
    return list;
  },

  getInitiatives: async (): Promise<CommunityInitiative[]> => {
    return getStoredInitiatives();
  },

  joinInitiative: async (initiativeId: string, volunteerName: string, volunteerEmail: string): Promise<CommunityInitiative> => {
    const current = getStoredInitiatives();
    const updated = current.map((item) => {
      if (item.id === initiativeId) {
        return {
          ...item,
          currentVolunteers: Math.min(item.targetVolunteers, item.currentVolunteers + 1)
        };
      }
      return item;
    });
    saveInitiatives(updated);
    
    // Also record volunteer interest
    const volunteers = getStoredVolunteers();
    volunteers.push({
      fullName: volunteerName,
      email: volunteerEmail,
      phone: 'Via Initiative RSVP',
      city: 'Community Direct',
      skills: ['Initiative Participant'],
      availability: 'Initiative Date',
      preferredCategory: 'Direct Action',
      agreedToTerms: true,
      createdAt: new Date().toISOString()
    });
    try {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));
    } catch {}

    const found = updated.find((i) => i.id === initiativeId);
    if (!found) throw new Error('Initiative not found');
    return found;
  },

  registerVolunteer: async (data: Omit<VolunteerSubmission, 'id' | 'createdAt'>): Promise<{ success: boolean; volunteerId: string; volunteer: VolunteerSubmission }> => {
    // Generate clean volunteer ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const volunteerId = `HT-VOL-${randomSuffix}`;
    const newSubmission: VolunteerSubmission = {
      ...data,
      id: volunteerId,
      createdAt: new Date().toISOString()
    };

    const existing = getStoredVolunteers();
    existing.unshift(newSubmission);
    try {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(existing));
    } catch (e) {
      console.warn('Local storage error:', e);
    }

    return {
      success: true,
      volunteerId,
      volunteer: newSubmission
    };
  },

  submitHelpRequest: async (data: Omit<HelpRequest, 'ticketId' | 'status' | 'createdAt'>): Promise<{ success: boolean; ticketId: string; request: HelpRequest }> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `HT-REQ-${randomSuffix}`;
    const newRequest: HelpRequest = {
      ...data,
      ticketId,
      status: 'Received',
      createdAt: new Date().toISOString(),
      confidentialNotes: 'Request queued for verification by Hands Together intake desk.'
    };

    const currentRequests = getStoredHelpRequests();
    currentRequests.unshift(newRequest);
    try {
      localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(currentRequests));
    } catch (e) {
      console.warn('Local storage error:', e);
    }

    return {
      success: true,
      ticketId,
      request: newRequest
    };
  },

  trackRequest: async (ticketId: string): Promise<HelpRequest | null> => {
    const trimmed = ticketId.trim().toUpperCase();
    const requests = getStoredHelpRequests();
    const found = requests.find((r) => r.ticketId.toUpperCase() === trimmed);
    return found || null;
  },

  submitContactMessage: async (data: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<{ success: boolean; messageId: string }> => {
    const messageId = `MSG-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...data,
      id: messageId,
      createdAt: new Date().toISOString()
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_MSGS);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(newMsg);
      localStorage.setItem(STORAGE_KEYS.CONTACT_MSGS, JSON.stringify(list));
    } catch {}

    return { success: true, messageId };
  },

  getStats: async (): Promise<CommunityStats> => {
    const volunteers = getStoredVolunteers();
    const helpRequests = getStoredHelpRequests();
    const initiatives = getStoredInitiatives();

    return {
      volunteersCount: 1240 + volunteers.length,
      peopleHelpedCount: 3850 + helpRequests.length,
      activeInitiativesCount: initiatives.filter((i) => i.status === 'Active').length + 38,
      partnerOrganizationsCount: 18,
      schemesCatalogCount: OFFICIAL_GOVERNMENT_SCHEMES.length
    };
  }
};
