export interface Standard {
  id: string;
  number: string;
  title: string;
  category: string;
  status: 'Active' | 'Under Revision' | 'Withdrawn';
  relevance: 'High' | 'Medium' | 'Low';
  applicability: string;
  certificationRequired: boolean;
  scope: string;
  evidenceCoverage: number;
  relatedStandards: string[];
  testMethods: string[];
  certificationScheme?: string;
}

export interface Laboratory {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  capabilities: string[];
  standards: string[];
  accreditation: string;
  contact: string;
  email: string;
  type: 'Government' | 'Private' | 'University';
}

export interface EvidenceSource {
  id: string;
  title: string;
  docType: string;
  page: string;
  section: string;
  excerpt: string;
  relevance: string;
  date?: string;
}

export const mockStandards: Standard[] = [
  {
    id: 'std-1',
    number: 'IS XXXXX',
    title: 'Stainless Steel Utensils and Cookware — Specification',
    category: 'Household Products',
    status: 'Active',
    relevance: 'High',
    applicability: 'Mandatory under BIS Certification Scheme for articles of stainless steel intended for food contact',
    certificationRequired: true,
    scope: 'Covers stainless steel vessels, containers, and utensils intended for food preparation, storage, and serving.',
    evidenceCoverage: 88,
    relatedStandards: ['IS YYYYY', 'IS ZZZZZ', 'IS AAAAA'],
    testMethods: ['IS TTTTT', 'IS UUUUU'],
    certificationScheme: 'ISI Mark (Scheme I)',
  },
  {
    id: 'std-2',
    number: 'IS YYYYY',
    title: 'Wrought Stainless Steels — Plates, Sheets and Strips — Specification',
    category: 'Metals & Alloys',
    status: 'Active',
    relevance: 'Medium',
    applicability: 'Covers raw material requirements for stainless steel products',
    certificationRequired: false,
    scope: 'Specifies requirements for wrought stainless steel plates, sheets and strips.',
    evidenceCoverage: 76,
    relatedStandards: ['IS XXXXX', 'IS BBBBB'],
    testMethods: ['IS VVVVV'],
    certificationScheme: undefined,
  },
  {
    id: 'std-3',
    number: 'IS ZZZZZ',
    title: 'Drinking Water — Specification',
    category: 'Water & Environment',
    status: 'Active',
    relevance: 'Medium',
    applicability: 'Applies to vessels intended for drinking water storage',
    certificationRequired: false,
    scope: 'Specifies quality requirements for drinking water and containers used for water storage.',
    evidenceCoverage: 92,
    relatedStandards: ['IS XXXXX', 'IS CCCCC'],
    testMethods: ['IS WWWWW'],
    certificationScheme: undefined,
  },
  {
    id: 'std-4',
    number: 'IS AAAAA',
    title: 'Food Safety and Hygiene Requirements for Metal Containers',
    category: 'Food Safety',
    status: 'Active',
    relevance: 'High',
    applicability: 'Mandatory for food contact metal containers',
    certificationRequired: true,
    scope: 'Specifies food safety and hygiene requirements for metal containers used in food processing and storage.',
    evidenceCoverage: 84,
    relatedStandards: ['IS XXXXX', 'IS ZZZZZ'],
    testMethods: ['IS XXXXX-Test'],
    certificationScheme: 'ISI Mark (Scheme II)',
  },
  {
    id: 'std-5',
    number: 'IS BBBBB',
    title: 'Electrical Water Heaters — Safety Requirements',
    category: 'Electrical Appliances',
    status: 'Active',
    relevance: 'High',
    applicability: 'Mandatory BIS certification for all domestic electrical water heaters',
    certificationRequired: true,
    scope: 'Covers safety requirements for domestic electrical water heaters including instantaneous and storage type.',
    evidenceCoverage: 95,
    relatedStandards: ['IS CCCCC', 'IS DDDDD'],
    testMethods: ['IS EEEEE', 'IS FFFFF'],
    certificationScheme: 'ISI Mark (Scheme I)',
  },
  {
    id: 'std-6',
    number: 'IS CCCCC',
    title: 'LED Luminaires — Performance Requirements',
    category: 'Electrical & Electronics',
    status: 'Active',
    relevance: 'High',
    applicability: 'Mandatory BIS certification under Quality Control Order',
    certificationRequired: true,
    scope: 'Specifies performance requirements for LED luminaires for general lighting purposes.',
    evidenceCoverage: 91,
    relatedStandards: ['IS DDDDD', 'IS GGGGG'],
    testMethods: ['IS HHHHH'],
    certificationScheme: 'ISI Mark (Scheme I)',
  },
];

export const mockLaboratories: Laboratory[] = [
  {
    id: 'lab-1',
    name: 'National Test House (NTH)',
    location: 'Salt Lake, Sector V',
    city: 'Kolkata',
    state: 'West Bengal',
    capabilities: ['Chemical Analysis', 'Physical Testing', 'Mechanical Testing', 'Food Safety Testing'],
    standards: ['IS XXXXX', 'IS YYYYY', 'IS ZZZZZ'],
    accreditation: 'NABL Accredited',
    contact: '+91-XX-XXXXXXXX',
    email: 'nth.kolkata@example.gov.in',
    type: 'Government',
  },
  {
    id: 'lab-2',
    name: 'Central Institute of Plastics Engineering & Technology (CIPET)',
    location: 'Industrial Area',
    city: 'Chennai',
    state: 'Tamil Nadu',
    capabilities: ['Polymer Testing', 'Mechanical Testing', 'Thermal Analysis', 'Chemical Resistance'],
    standards: ['IS BBBBB', 'IS CCCCC'],
    accreditation: 'NABL Accredited',
    contact: '+91-XX-XXXXXXXX',
    email: 'cipet.chennai@example.gov.in',
    type: 'Government',
  },
  {
    id: 'lab-3',
    name: 'Bureau of Indian Standards — Central Laboratory',
    location: 'Manak Bhavan, 9 Bahadur Shah Zafar Marg',
    city: 'New Delhi',
    state: 'Delhi',
    capabilities: ['Standards Testing', 'Calibration', 'Chemical Analysis', 'Electrical Testing'],
    standards: ['IS XXXXX', 'IS CCCCC', 'IS DDDDD'],
    accreditation: 'BIS Recognized',
    contact: '+91-11-XXXXXXXX',
    email: 'bis.lab@example.gov.in',
    type: 'Government',
  },
  {
    id: 'lab-4',
    name: 'SGS India Private Limited',
    location: 'Turbhe MIDC',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    capabilities: ['Consumer Products', 'Electrical Testing', 'Chemical Analysis', 'Performance Testing'],
    standards: ['IS CCCCC', 'IS AAAAA', 'IS BBBBB'],
    accreditation: 'NABL + BIS Recognized',
    contact: '+91-XX-XXXXXXXX',
    email: 'sgs.mumbai@example.com',
    type: 'Private',
  },
];

export const mockEvidenceSources: EvidenceSource[] = [
  {
    id: 'ev-1',
    title: 'IS XXXXX: Stainless Steel Utensils — Specification',
    docType: 'Indian Standard',
    page: 'Page 3',
    section: 'Clause 4.1 — Scope',
    excerpt: 'This standard covers stainless steel vessels, containers, water bottles, and related articles used for domestic purposes including food and beverage contact applications.',
    relevance: 'Directly defines the product scope for stainless steel water bottles',
    date: '2021',
  },
  {
    id: 'ev-2',
    title: 'Quality Control Order — Household Stainless Steel Products',
    docType: 'Government Gazette Notification',
    page: 'Page 7',
    section: 'Schedule I — Mandatory Products',
    excerpt: 'The articles specified in Schedule I shall comply with the relevant Indian Standard and shall bear the Standard Mark under a licence from the Bureau of Indian Standards.',
    relevance: 'Establishes mandatory BIS certification requirement for the product category',
    date: '2022',
  },
  {
    id: 'ev-3',
    title: 'BIS Certification — Scheme of Testing and Inspection',
    docType: 'BIS Scheme Document',
    page: 'Page 12',
    section: '3.2 — Testing Requirements',
    excerpt: 'Grant of licence under this scheme shall require the product to pass tests for dimensional accuracy, material composition, surface finish, and food safety migration limits as specified.',
    relevance: 'Defines testing requirements applicable to stainless steel water bottles seeking BIS certification',
    date: '2023',
  },
  {
    id: 'ev-4',
    title: 'IS ZZZZZ: Drinking Water — Specification',
    docType: 'Indian Standard',
    page: 'Page 18',
    section: 'Annex B — Container Requirements',
    excerpt: 'Containers used for storage and transport of drinking water shall be made of materials that do not impart taste, odour, or toxic substances to the water stored therein.',
    relevance: 'Sets material safety requirements for water storage containers',
    date: '2020',
  },
];

export const certificationSteps = [
  {
    step: '01',
    title: 'Identify Product & Standard',
    description: 'Determine the applicable Indian Standard and certification scheme for your product.',
    details: 'Use BIS Mitra to discover potentially relevant standards and verify mandatory certification requirements.',
    documents: ['Product description', 'Technical specifications', 'Manufacturing process details'],
    aiHelp: 'Ask BIS Mitra: What standard applies to my product?',
  },
  {
    step: '02',
    title: 'Understand Certification Scheme',
    description: 'Understand the applicable scheme (Scheme I, II, III) and its requirements.',
    details: 'Different products have different certification pathways. ISI Mark, Compulsory Registration, and other schemes have distinct requirements.',
    documents: ['Scheme document', 'Fee structure', 'Application format'],
    aiHelp: 'Ask BIS Mitra: What are the certification scheme requirements?',
  },
  {
    step: '03',
    title: 'Product Testing',
    description: 'Get your product tested at a BIS-recognized laboratory against the applicable standard.',
    details: 'Testing must be conducted at a laboratory recognized by BIS for the specific standard.',
    documents: ['Sample products', 'Test request form', 'Manufacturing details'],
    aiHelp: 'Ask BIS Mitra: Which laboratory can test my product?',
  },
  {
    step: '04',
    title: 'Submit Application',
    description: 'Submit your application with test reports and required documents to the BIS office.',
    details: 'Applications are submitted online through the BIS portal with supporting documentation.',
    documents: ['Test report', 'Form V', 'Factory details', 'Quality system documents', 'Fee payment'],
    aiHelp: 'Ask BIS Mitra: What documents are needed for certification?',
  },
  {
    step: '05',
    title: 'Factory Inspection',
    description: 'BIS officers visit your factory to verify manufacturing processes and quality systems.',
    details: 'The inspection verifies that your manufacturing facility meets the requirements for consistent production.',
    documents: ['Factory layout', 'Process flow chart', 'Quality control plan'],
    aiHelp: 'Ask BIS Mitra: How to prepare for BIS factory inspection?',
  },
  {
    step: '06',
    title: 'Grant of Licence',
    description: 'If testing and inspection are satisfactory, BIS grants the licence to use ISI Mark.',
    details: 'The licence specifies the product, standard, and manufacturing unit. It is renewable and subject to surveillance.',
    documents: ['Licence document', 'Marked product format'],
    aiHelp: 'Ask BIS Mitra: What are the conditions of a BIS licence?',
  },
  {
    step: '07',
    title: 'Ongoing Compliance',
    description: 'Maintain quality systems and comply with BIS surveillance requirements.',
    details: 'Regular testing, surveillance visits, and renewal of the licence are ongoing obligations.',
    documents: ['Surveillance test records', 'Renewal application'],
    aiHelp: 'Ask BIS Mitra: What are the ongoing compliance requirements?',
  },
];

export const quickActions = [
  {
    id: 'find-standard',
    icon: '🔍',
    title: 'Find a Standard',
    description: 'Discover potentially relevant Indian Standards for your product or activity',
    color: 'blue',
    path: '/standards',
  },
  {
    id: 'ask-ai',
    icon: '💬',
    title: 'Ask BIS Mitra',
    description: 'Ask questions in natural language and get evidence-backed answers',
    color: 'navy',
    path: '/ask',
  },
  {
    id: 'tender',
    icon: '📄',
    title: 'Tender Analyzer',
    description: 'Analyze tender and specification documents for standards compliance',
    color: 'purple',
    path: '/tender-analyzer',
  },
  {
    id: 'certification',
    icon: '✅',
    title: 'Certification Guide',
    description: 'Understand the BIS certification journey step by step',
    color: 'green',
    path: '/certification',
  },
  {
    id: 'labs',
    icon: '🔬',
    title: 'Find Testing Lab',
    description: 'Discover NABL and BIS-recognized testing laboratories',
    color: 'teal',
    path: '/laboratories',
  },
  {
    id: 'hallmark',
    icon: '🏅',
    title: 'Hallmarking',
    description: 'Understand BIS hallmarking for gold, silver and other precious metals',
    color: 'saffron',
    path: '/hallmarking',
  },
];
