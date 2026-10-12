import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { OFFICIAL_GOVERNMENT_SCHEMES } from './src/data/schemesData';
import { COMMUNITY_INITIATIVES } from './src/data/initiativesData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory data store with seeds
let volunteersStore: Array<{
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  availability: string;
  preferredCategory: string;
  createdAt: string;
}> = [];

let helpRequestsStore: Array<{
  ticketId: string;
  requesterName: string;
  contactNumber: string;
  email?: string;
  assistanceType: string;
  urgency: string;
  description: string;
  city: string;
  addressDetails: string;
  status: string;
  createdAt: string;
  confidentialNotes?: string;
}> = [
  {
    ticketId: 'HT-DEMO-2026',
    requesterName: 'S. Ramanujam (Verified Seeker)',
    contactNumber: '+91 98765 43210',
    email: 'help.seeker@example.com',
    assistanceType: 'Emergency Healthcare & Medicines',
    urgency: 'Urgent (Within 48h)',
    description: 'Post-operative cardiac prescription medicines support needed for senior citizen residing alone.',
    city: 'Hyderabad',
    addressDetails: 'Near Old Post Office, Chanda Nagar',
    status: 'In Progress',
    createdAt: new Date().toISOString(),
    confidentialNotes: 'Assigned to coordinator Ananya R. Delivery arranged via volunteer healthcare pool.'
  }
];

let contactMessagesStore: Array<{
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
}> = [];

let initiativesStore = [...COMMUNITY_INITIATIVES];

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Hands Together API', timestamp: new Date().toISOString() });
});

app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    volunteersCount: 1240 + volunteersStore.length,
    peopleHelpedCount: 3850 + helpRequestsStore.length,
    activeInitiativesCount: initiativesStore.filter((i) => i.status === 'Active').length + 38,
    partnerOrganizationsCount: 18,
    schemesCatalogCount: OFFICIAL_GOVERNMENT_SCHEMES.length,
    isDemoDataset: true,
  });
});

app.get('/api/schemes', (req: Request, res: Response) => {
  const { q, category, jurisdiction } = req.query;
  let results = [...OFFICIAL_GOVERNMENT_SCHEMES];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }
  if (jurisdiction && typeof jurisdiction === 'string' && jurisdiction !== 'All') {
    results = results.filter((s) => s.jurisdiction.toLowerCase().includes(jurisdiction.toLowerCase()));
  }
  if (q && typeof q === 'string' && q.trim()) {
    const search = q.toLowerCase().trim();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.shortCode.toLowerCase().includes(search) ||
        s.shortDescription.toLowerCase().includes(search) ||
        s.targetBeneficiaries.toLowerCase().includes(search) ||
        s.keyBenefits.some((b) => b.toLowerCase().includes(search))
    );
  }

  res.json({ schemes: results, total: results.length });
});

app.get('/api/initiatives', (_req: Request, res: Response) => {
  res.json({ initiatives: initiativesStore });
});

app.post('/api/initiatives/:id/join', (req: Request, res: Response) => {
  const { id } = req.params;
  const { volunteerName, volunteerEmail } = req.body;

  const initiative = initiativesStore.find((i) => i.id === id);
  if (!initiative) {
    return res.status(404).json({ error: 'Initiative not found' });
  }

  initiative.currentVolunteers = Math.min(initiative.targetVolunteers, initiative.currentVolunteers + 1);

  if (volunteerName && volunteerEmail) {
    volunteersStore.push({
      id: `HT-VOL-${Date.now().toString().slice(-4)}`,
      fullName: volunteerName,
      email: volunteerEmail,
      phone: 'Direct RSVP',
      city: initiative.city,
      skills: ['Initiative RSVP Participant'],
      availability: 'Event Date',
      preferredCategory: initiative.category,
      createdAt: new Date().toISOString(),
    });
  }

  res.json({ success: true, initiative });
});

app.post('/api/volunteers', (req: Request, res: Response) => {
  const { fullName, email, phone, city, skills, availability, preferredCategory } = req.body;

  if (!fullName || !email || !phone || !city) {
    return res.status(400).json({ error: 'Missing required volunteer fields' });
  }

  const volunteerId = `HT-VOL-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    id: volunteerId,
    fullName,
    email,
    phone,
    city,
    skills: Array.isArray(skills) ? skills : [skills],
    availability: availability || 'Flexible',
    preferredCategory: preferredCategory || 'Community Action',
    createdAt: new Date().toISOString(),
  };

  volunteersStore.unshift(record);
  res.status(201).json({ success: true, volunteerId, volunteer: record });
});

app.post('/api/help-requests', (req: Request, res: Response) => {
  const { requesterName, contactNumber, email, assistanceType, urgency, description, city, addressDetails, supportingDocNote } = req.body;

  if (!requesterName || !contactNumber || !assistanceType || !description || !city) {
    return res.status(400).json({ error: 'Missing required assistance request fields' });
  }

  const ticketId = `HT-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    ticketId,
    requesterName,
    contactNumber,
    email,
    assistanceType,
    urgency: urgency || 'Normal (Within 1 week)',
    description,
    city,
    addressDetails: addressDetails || '',
    supportingDocNote,
    status: 'Received',
    createdAt: new Date().toISOString(),
    confidentialNotes: 'Confidential request registered. Assigned to community welfare verification pool.',
  };

  helpRequestsStore.unshift(record);
  res.status(201).json({ success: true, ticketId, request: record });
});

app.get('/api/help-requests/:ticketId', (req: Request, res: Response) => {
  const ticketId = req.params.ticketId?.trim().toUpperCase();
  const found = helpRequestsStore.find((r) => r.ticketId.toUpperCase() === ticketId);

  if (!found) {
    return res.status(404).json({ error: 'Request ticket not found' });
  }

  // Sanitize to protect personal address from public snooping
  res.json({
    ticketId: found.ticketId,
    requesterInitial: found.requesterName.slice(0, 1) + '***',
    assistanceType: found.assistanceType,
    urgency: found.urgency,
    city: found.city,
    status: found.status,
    createdAt: found.createdAt,
    description: found.description,
    confidentialNotes: found.confidentialNotes,
  });
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, topic, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const id = `MSG-${Date.now()}`;
  const record = { id, name, email, topic: topic || 'General Inquiry', message, createdAt: new Date().toISOString() };
  contactMessagesStore.unshift(record);

  res.status(201).json({ success: true, messageId: id });
});

// Dev vs Prod Vite Integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Hands Together server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
