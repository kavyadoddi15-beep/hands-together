export interface GovernmentScheme {
  id: string;
  name: string;
  shortCode: string;
  category: 'Healthcare' | 'Education' | 'Women & Children' | 'Senior Citizens' | 'Financial & Livelihood' | 'Housing & Sanitation' | 'Agriculture';
  jurisdiction: 'Central (All India)' | 'State Specific';
  targetBeneficiaries: string;
  shortDescription: string;
  keyBenefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  officialPortalUrl: string;
  officialDepartment: string;
  isVerified: boolean;
  lastUpdated: string;
}

export interface CommunityInitiative {
  id: string;
  title: string;
  category: 'Food Relief' | 'Education Campaign' | 'Healthcare Camp' | 'Environmental Drive' | 'Clothing & Shelter';
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  targetVolunteers: number;
  currentVolunteers: number;
  imageUrl: string;
  organizer: string;
  impactMetric: string;
}

export interface VolunteerSubmission {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  availability: string;
  preferredCategory: string;
  motivation?: string;
  agreedToTerms: boolean;
  createdAt?: string;
}

export interface HelpRequest {
  id?: string;
  ticketId: string;
  requesterName: string;
  contactNumber: string;
  email?: string;
  assistanceType: 'Food & Daily Ration' | 'Emergency Healthcare & Medicines' | 'Education Support & Fees' | 'Elderly / Disability Care' | 'Urgent Shelter & Blankets' | 'Other Social Need';
  urgency: 'Immediate (Emergency)' | 'Urgent (Within 48h)' | 'Normal (Within 1 week)';
  description: string;
  city: string;
  addressDetails: string;
  supportingDocNote?: string;
  status: 'Received' | 'Assigned to Coordinator' | 'In Progress' | 'Fulfilled';
  createdAt: string;
  confidentialNotes?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
}

export interface CommunityStats {
  volunteersCount: number;
  peopleHelpedCount: number;
  activeInitiativesCount: number;
  partnerOrganizationsCount: number;
  schemesCatalogCount: number;
}
