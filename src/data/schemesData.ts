import { GovernmentScheme } from '../types';

export const OFFICIAL_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pmjay',
    name: 'Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    shortCode: 'PM-JAY',
    category: 'Healthcare',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Bottom 40% vulnerable and poor families identified by SECC 2011 database',
    shortDescription: 'World’s largest government-funded healthcare assurance scheme offering cash-free secondary and tertiary hospitalization treatment.',
    keyBenefits: [
      'Cashless and paperless treatment at public & empaneled private hospitals',
      'Coverage of up to ₹5,00,000 per eligible family per year',
      'No cap on family size, gender, or age of family members',
      'Covers pre-existing conditions from Day 1 including 3 days pre-hospitalization and 15 days post-hospitalization costs'
    ],
    eligibilityCriteria: [
      'Listed under Socio-Economic Caste Census (SECC) 2011 or active RSBY beneficiaries',
      'Rural households with kutcha walls/roof, no adult earner aged 16-59, or landless manual labor families',
      'Urban households belonging to designated occupational categories (rickshaw pullers, ragpickers, domestic helpers, etc.)',
      'Active Ayushman Card issued under verified state health agencies'
    ],
    requiredDocuments: [
      'Aadhaar Card or Government Photo Identity Card',
      'Ration Card / Proof of family relationship',
      'Active Mobile number linked with Aadhaar (for OTP verification)'
    ],
    applicationSteps: [
      'Visit the official portal or your nearest Common Service Centre (CSC) / Empaneled Hospital helpdesk.',
      'Check eligibility using your Aadhaar number or Ration card via the "Am I Eligible" tool.',
      'Submit biometric KYC at the Ayushman Mitra desk at any empaneled hospital or CSC.',
      'Download your PVC / Digital Ayushman Golden Card from the BIS portal for immediate hospital admission.'
    ],
    officialPortalUrl: 'https://pmjay.gov.in',
    officialDepartment: 'National Health Authority (NHA), Ministry of Health & Family Welfare, Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'pmay-u',
    name: 'Pradhan Mantri Awas Yojana – Housing for All',
    shortCode: 'PMAY',
    category: 'Housing & Sanitation',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Economically Weaker Sections (EWS), Low Income Groups (LIG), and homeless urban/rural families',
    shortDescription: 'Comprehensive housing scheme providing financial interest subsidies and direct pucca house assistance with basic water, power, and sanitation amenities.',
    keyBenefits: [
      'Central assistance up to ₹1,50,000 to ₹2,50,000 for constructing a pucca dwelling',
      'Credit Linked Subsidy Scheme (CLSS) interest subsidy up to 6.5% on home loans',
      'Mandatory co-ownership or female ownership to promote women empowerment',
      'Inclusive sanitation, water tap, and electrical connection via convergence'
    ],
    eligibilityCriteria: [
      'Beneficiary family must not own a pucca house in any part of India',
      'Annual family income: Up to ₹3,00,000 for EWS, and ₹3,00,001 to ₹6,00,000 for LIG',
      'Female head of household must be the owner or co-owner of the property (for urban component)',
      'Must possess valid local residential documentation'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card of all adult family members',
      'Proof of Income (Salary slip, employer certificate, or Tehsildar income certificate)',
      'Bank Account passbook copy with IFSC code',
      'Affidavit / Self-declaration confirming no pucca house ownership anywhere in India',
      'Land title documents (for Beneficiary-led Construction)'
    ],
    applicationSteps: [
      'Log on to the official PMAY portal (pmay-urban.gov.in) or visit your local Municipal Corporation/CSC.',
      'Select "Citizen Assessment" and choose either "Slum Dwellers" or "Benefit Under Other 3 Components".',
      'Input Aadhaar number and verify via OTP.',
      'Fill out comprehensive household, income, and bank account particulars.',
      'Save and note your Application Assessment ID to track physical geo-tagging verification by local officials.'
    ],
    officialPortalUrl: 'https://pmay-urban.gov.in',
    officialDepartment: 'Ministry of Housing and Urban Affairs (MoHUA), Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'nmmss',
    name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    shortCode: 'NMMSS',
    category: 'Education',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Meritorious students studying in Class IX to XII from economically weaker sections',
    shortDescription: 'Provides financial scholarships to meritorious students of economically weaker sections to arrest dropout rates after class VIII and encourage secondary schooling.',
    keyBenefits: [
      'Scholarship grant of ₹12,000 per annum (₹1,000 per month) from Class IX through Class XII',
      'Direct Benefit Transfer (DBT) deposited straight into the student’s bank account',
      'Prevents school dropouts in underprivileged rural and semi-urban communities'
    ],
    eligibilityCriteria: [
      'Students enrolled in State Government, Government-aided, or Local Body schools',
      'Parental annual income from all sources must not exceed ₹3,50,000 per annum',
      'Minimum 55% marks (50% for SC/ST) in Class VII examination to appear in the selection test',
      'Must qualify the State-level Mental Ability (MAT) and Scholastic Aptitude (SAT) examinations'
    ],
    requiredDocuments: [
      'Class VII and VIII marks memo',
      'Parental Income Certificate issued by competent revenue authority',
      'Aadhaar card of the student',
      'Bank account details in a nationalized bank (Aadhaar linked)',
      'Community / Caste certificate (if applicable)'
    ],
    applicationSteps: [
      'Register on the National Scholarship Portal (scholarships.gov.in) using your Aadhaar/One-Time Registration (OTR).',
      'Select State and Department of School Education & Literacy.',
      'Submit the NMMSS application with uploaded certificates and school affiliation code.',
      'School principal and district nodal officer verify the student credentials online.',
      'Scholarship amount is credited via Public Financial Management System (PFMS).'
    ],
    officialPortalUrl: 'https://scholarships.gov.in',
    officialDepartment: 'Department of School Education & Literacy, Ministry of Education, Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'pmsvanidhi',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    shortCode: 'PM SVANidhi',
    category: 'Financial & Livelihood',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Urban, peri-urban, and rural street vendors engaged in vending before or during current fiscal',
    shortDescription: 'Micro-credit working capital facility helping roadside and street vendors access affordable collateral-free loans to rebuild and expand their micro-businesses.',
    keyBenefits: [
      '1st Tranche collateral-free working capital loan of ₹10,000 with 1-year tenure',
      '2nd Tranche loan of ₹20,000 and 3rd Tranche loan of up to ₹50,000 on timely repayments',
      'Interest subsidy of 7% per annum credited directly to bank account quarterly',
      'Cashback incentives up to ₹1,200 per annum on conducting digital UPI transactions'
    ],
    eligibilityCriteria: [
      'Street vendors in possession of Certificate of Vending (CoV) / Identity Card issued by Urban Local Bodies (ULBs)',
      'Vendors identified in the municipal survey or holding a Letter of Recommendation (LoR)',
      'Street vendors of surrounding rural areas vending in urban geographical limits'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Voter ID or Driving License (if Aadhaar mobile not active)',
      'Certificate of Vending / Identity Card / Letter of Recommendation from ULB',
      'Bank Account Passbook / Statement'
    ],
    applicationSteps: [
      'Visit pmsvanidhi.mohua.gov.in or apply via the PM SVANidhi mobile app or local municipal ward office.',
      'Authenticate with mobile number linked to Aadhaar.',
      'Check vending status via your ULB ward list or obtain an LoR.',
      'Select preferred Lending Institution (Public sector bank, NBFC, or Microfinance institution).',
      'Submit loan request; funds are disbursed directly without any collateral requirement.'
    ],
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in',
    officialDepartment: 'Ministry of Housing and Urban Affairs (MoHUA), Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'pmmvy',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    shortCode: 'PMMVY',
    category: 'Women & Children',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Pregnant women and lactating mothers for the first and second child (if girl child)',
    shortDescription: 'Maternity benefit cash incentive program promoting adequate nutrition, safe institutional delivery, and wage compensation for expecting mothers.',
    keyBenefits: [
      'Direct financial incentive of ₹5,000 in two installments for the first child',
      'Incentive of ₹6,000 in a single installment for the second girl child to curb female foeticide',
      'Conditional on early pregnancy registration, antenatal check-ups (ANC), and child immunization',
      'Helps prevent undernutrition and infant mortality'
    ],
    eligibilityCriteria: [
      'All Pregnant Women and Lactating Mothers (PW&LM) who are not in regular employment with Central/State Govt or PSUs',
      'Beneficiaries belong to socially and economically disadvantaged sections (e.g. BPL, SC/ST, EWS, MGNREGA job card holders, PM-JAY card holders)',
      'Date of LMP (Last Menstrual Period) within designated program timeframes'
    ],
    requiredDocuments: [
      'Mother and Child Protection (MCP) card issued by Anganwadi / Primary Health Centre',
      'Aadhaar card of the mother and father',
      'Bank/Post Office Passbook in the mother’s sole name (Aadhaar linked)',
      'Eligibility proof certificate (e.g., e-Shram card, MGNREGA job card, BPL ration card)'
    ],
    applicationSteps: [
      'Register at your local Anganwadi Centre (AWC) or accredited ASHA worker desk.',
      'Alternatively, apply online at the PMMVY citizen portal (pmmvy.wcd.gov.in).',
      'Fill Form 1A within 150 days from LMP date along with MCP card details.',
      'Undergo mandatory Antenatal Check-up at government healthcare clinic.',
      'Funds are credited directly to the mother’s DBT-enabled bank account.'
    ],
    officialPortalUrl: 'https://pmmvy.wcd.gov.in',
    officialDepartment: 'Ministry of Women and Child Development, Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'ignoaps',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    shortCode: 'IGNOAPS',
    category: 'Senior Citizens',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'BPL senior citizens aged 60 years and above',
    shortDescription: 'Monthly social security financial pension ensuring dignified living for destitute and low-income elderly citizens.',
    keyBenefits: [
      'Monthly pension assistance credited directly to the senior citizen’s bank or post office account',
      '₹200 to ₹500 Central component plus significant State government top-up contribution (ranging ₹1,000 - ₹3,000/month depending on state)',
      'Lifetime financial dignity with no repayment or asset mortgage requirement'
    ],
    eligibilityCriteria: [
      'Applicant must be 60 years of age or older',
      'Household must belong to a living Below Poverty Line (BPL) family according to government criteria',
      'Resident of the corresponding applying state or union territory'
    ],
    requiredDocuments: [
      'Age proof (Aadhaar Card, Voter ID, or Medical Age Certificate)',
      'BPL Ration Card or BPL Survey listing number',
      'Bank Account Passbook / Post Office Savings Account details',
      'Passport sized photograph'
    ],
    applicationSteps: [
      'Visit the local Panchayat / Municipal office or apply via National Social Assistance Programme portal (nsap.nic.in).',
      'Submit Form NSAP-1 along with BPL verification and Aadhaar copy.',
      'Verification conducted by the Social Welfare Inspector / Gram Panchayat Secretary.',
      'Once sanctioned by District Collector / Sub-Divisional Officer, monthly DBT pension begins.'
    ],
    officialPortalUrl: 'https://nsap.nic.in',
    officialDepartment: 'Ministry of Rural Development, Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'pmkvy',
    name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    shortCode: 'PMKVY',
    category: 'Education',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Youth seeking skill certification, school/college dropouts, and informal sector workers',
    shortDescription: 'Flagship skill certification scheme offering free industry-relevant technical training, certification, and job placement assistance across high-demand sectors.',
    keyBenefits: [
      '100% free government-sponsored skill training across IT, Healthcare, Solar, Electronics, Logistics & Construction',
      'Government of India recognized NSQF-aligned skill certificate',
      'Monetary reward and stipend assistance upon successful certification',
      'Apprenticeship and job placement support via Rozgar Melas'
    ],
    eligibilityCriteria: [
      'Indian citizens aged between 15 to 45 years',
      'Unemployed youth or school/college dropouts possessing basic literacy',
      'Possess valid Aadhaar card and active bank account'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Educational certificate / Highest qualification memo (Class 8th / 10th / 12th / ITI)',
      'Active mobile number and bank account details'
    ],
    applicationSteps: [
      'Register on the Skill India Digital portal (skillindiadigital.gov.in).',
      'Browse nearby accredited PMKVY Training Centres and preferred job roles.',
      'Enroll in batch for Short Term Training (STT) or Recognition of Prior Learning (RPL).',
      'Complete hands-on training and undergo third-party assessment.',
      'Receive official digital Skill Card and participate in placement drives.'
    ],
    officialPortalUrl: 'https://www.skillindiadigital.gov.in',
    officialDepartment: 'Ministry of Skill Development and Entrepreneurship (MSDE), Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  },
  {
    id: 'nfsa-onorc',
    name: 'National Food Security Act & One Nation One Ration Card (NFSA - ONORC)',
    shortCode: 'NFSA / ONORC',
    category: 'Financial & Livelihood',
    jurisdiction: 'Central (All India)',
    targetBeneficiaries: 'Priority Households (PHH) and Antyodaya Anna Yojana (AAY) families, including migrant workers',
    shortDescription: 'Ensures food security by providing highly subsidized or free food grains with nationwide portability across any Fair Price Shop in India.',
    keyBenefits: [
      '5 kg of food grains per person per month for Priority Households and 35 kg per family for Antyodaya households',
      'Nationwide portability: Migrant laborers can collect their ration anywhere in India without changing ration cards',
      'Digital biometric authentication ensuring transparent, leakage-free grain disbursement'
    ],
    eligibilityCriteria: [
      'Identified under state Priority Household (PHH) or Antyodaya Anna Yojana (AAY) lists',
      'Aadhaar seeded ration card holders',
      'Migrant workers living away from home state'
    ],
    requiredDocuments: [
      'Aadhaar card of all family members',
      'Digital Ration Card / Family ID',
      'Biometric fingerprint/iris at ePoS shop'
    ],
    applicationSteps: [
      'Visit any Fair Price Shop (FPS) equipped with an electronic Point of Sale (ePoS) device anywhere in India.',
      'Provide your existing ration card number or Aadhaar number.',
      'Complete biometric authentication on the ePoS device.',
      'Collect food grain entitlement immediately.'
    ],
    officialPortalUrl: 'https://nfsa.gov.in',
    officialDepartment: 'Department of Food and Public Distribution, Govt. of India',
    isVerified: true,
    lastUpdated: 'October 2026'
  }
];
