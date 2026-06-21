import type { Member, Conversation, Message } from '@/types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    fullName: 'Sarah Chen',
    jobTitle: 'Enterprise Sales Director',
    companyName: 'CloudScale Dynamics',
    email: 'sarah.chen@cloudscale.io',
    linkedInUrl: 'https://linkedin.com/in/sarahchen',
    location: 'San Francisco, CA',
    industry: 'tech',
    bio: 'Helping Fortune 500 companies migrate legacy infrastructure to cloud-native architectures. 12+ years in enterprise SaaS sales.',
    products: [
      { title: 'Cloud Migration Services', description: 'End-to-end legacy-to-cloud migration', category: 'Cloud' },
      { title: 'SaaS Onboarding Platform', description: 'Accelerated enterprise onboarding', category: 'SaaS' },
      { title: 'DevOps Automation Suite', description: 'CI/CD pipeline optimization', category: 'Cloud' },
    ],
    avatar: 'SC',
    isOnline: true,
  },
  {
    id: '2',
    fullName: 'Marcus Rodriguez',
    jobTitle: 'VP of Business Development',
    companyName: 'Apex Machining Solutions',
    email: 'marcus@apexmachining.com',
    linkedInUrl: 'https://linkedin.com/in/marcusrodriguez',
    location: 'Houston, TX',
    industry: 'machinery',
    bio: 'Connecting manufacturers with precision CNC solutions. Specializing in automotive and aerospace machining contracts.',
    products: [
      { title: 'CNC Retrofitting', description: 'Modernize existing CNC equipment', category: 'Manufacturing' },
      { title: 'Precision Milling Services', description: 'Tight-tolerance component production', category: 'Manufacturing' },
      { title: 'Equipment Leasing Program', description: 'Flexible machinery acquisition', category: 'Automation' },
    ],
    avatar: 'MR',
    isOnline: true,
  },
  {
    id: '3',
    fullName: 'Jennifer Walsh',
    jobTitle: 'Cybersecurity Sales Lead',
    companyName: 'FortressGuard Inc.',
    email: 'jwalsh@fortressguard.com',
    linkedInUrl: 'https://linkedin.com/in/jenniferwalsh',
    location: 'Boston, MA',
    industry: 'tech',
    bio: 'Zero-trust security solutions for regulated industries. Focused on healthcare, finance, and government verticals.',
    products: [
      { title: 'Zero-Trust Platform', description: 'Network security reimagined', category: 'Cybersecurity' },
      { title: 'Compliance Automation', description: 'SOC2, HIPAA, PCI-DSS automation', category: 'Cybersecurity' },
      { title: 'Penetration Testing', description: 'Enterprise security assessments', category: 'Cybersecurity' },
    ],
    avatar: 'JW',
    isOnline: false,
  },
  {
    id: '4',
    fullName: 'David Ross',
    jobTitle: 'Industrial Automation Director',
    companyName: 'TitanWorks Robotics',
    email: 'd.ross@titanworks.com',
    linkedInUrl: 'https://linkedin.com/in/davidross',
    location: 'Detroit, MI',
    industry: 'machinery',
    bio: 'Transforming factory floors with collaborative robotics and Industry 4.0 automation solutions. 20 years in manufacturing tech.',
    products: [
      { title: 'Collaborative Robots', description: 'Safe human-robot workstations', category: 'Automation' },
      { title: 'Smart Factory Platform', description: 'IoT-enabled production monitoring', category: 'Automation' },
      { title: 'Predictive Maintenance AI', description: 'ML-driven equipment health', category: 'Heavy Equipment' },
    ],
    avatar: 'DR',
    isOnline: true,
  },
  {
    id: '5',
    fullName: 'Priya Patel',
    jobTitle: 'Chief Revenue Officer',
    companyName: 'DataStream Analytics',
    email: 'priya@datastream.io',
    linkedInUrl: 'https://linkedin.com/in/priyapatel',
    location: 'Austin, TX',
    industry: 'tech',
    bio: 'Real-time analytics infrastructure for data-intensive organizations. Former VP Sales at Snowflake.',
    products: [
      { title: 'Real-Time Data Pipeline', description: 'Stream processing at scale', category: 'SaaS' },
      { title: 'Analytics Dashboard Suite', description: 'Executive BI dashboards', category: 'SaaS' },
      { title: 'Data Warehouse Modernization', description: 'Legacy DWH to cloud-native', category: 'Cloud' },
    ],
    avatar: 'PP',
    isOnline: false,
  },
  {
    id: '6',
    fullName: 'Klaus Mueller',
    jobTitle: 'International Sales Manager',
    companyName: 'HeavyMetal Engineering',
    email: 'klaus@heavymetal-eng.de',
    linkedInUrl: 'https://linkedin.com/in/klausmueller',
    location: 'Stuttgart, Germany',
    industry: 'machinery',
    bio: 'European market leader in heavy construction equipment and mining machinery distribution across DACH region.',
    products: [
      { title: 'Mining Excavators', description: '600-ton class hydraulic excavators', category: 'Heavy Equipment' },
      { title: 'Crane Systems', description: 'Tower and mobile crane solutions', category: 'Heavy Equipment' },
      { title: 'Aftermarket Parts', description: 'OEM parts global logistics', category: 'Manufacturing' },
    ],
    avatar: 'KM',
    isOnline: true,
  },
  {
    id: '7',
    fullName: 'Aisha Johnson',
    jobTitle: 'Partner Sales Manager',
    companyName: 'NexGen Hardware Co.',
    email: 'aisha@nexgenhw.com',
    linkedInUrl: 'https://linkedin.com/in/aishajohnson',
    location: 'Seattle, WA',
    industry: 'tech',
    bio: 'Channel partner programs for next-generation server hardware and edge computing appliances.',
    products: [
      { title: 'Edge Computing Appliances', description: 'Ruggedized edge servers', category: 'Hardware' },
      { title: 'GPU Clusters', description: 'AI/ML training infrastructure', category: 'Hardware' },
      { title: 'Storage Arrays', description: 'NVMe all-flash storage', category: 'Hardware' },
    ],
    avatar: 'AJ',
    isOnline: false,
  },
  {
    id: '8',
    fullName: 'Robert Chang',
    jobTitle: 'Automation Sales Engineer',
    companyName: 'PrecisionFlow Systems',
    email: 'robert@precisionflow.com',
    linkedInUrl: 'https://linkedin.com/in/robertchang',
    location: 'Chicago, IL',
    industry: 'machinery',
    bio: 'Fluid handling and process automation for pharmaceutical and food processing industries.',
    products: [
      { title: 'Process Control Valves', description: 'Precision flow control systems', category: 'Automation' },
      { title: 'Batch Automation', description: 'Recipe-based batch processing', category: 'Automation' },
      { title: 'Sanitary Fittings', description: 'FDA-compliant connections', category: 'Manufacturing' },
    ],
    avatar: 'RC',
    isOnline: true,
  },
];

const now = Date.now();
const HOUR = 3600000;

const createMessages = (memberId: string, myId: string): Message[] => {
  const scenarios: Record<string, Message[]> = {
    '1': [
      { id: 'm1', senderId: memberId, receiverId: myId, content: 'Hi there! Saw your profile on SalesConnect. Are you currently looking for cloud migration partners?', timestamp: now - 48 * HOUR, isRead: true },
      { id: 'm2', senderId: myId, receiverId: memberId, content: 'Hey Sarah! Yes, we\'re evaluating options for migrating our on-prem data warehouse. What\'s your typical engagement model?', timestamp: now - 47 * HOUR, isRead: true },
      { id: 'm3', senderId: memberId, receiverId: myId, content: 'We usually start with a 2-week assessment phase, then provide a detailed migration roadmap. Most enterprise migrations take 3-6 months.', timestamp: now - 46 * HOUR, isRead: true },
      { id: 'm4', senderId: myId, receiverId: memberId, content: 'That sounds reasonable. What about ongoing support post-migration?', timestamp: now - 45 * HOUR, isRead: true },
      { id: 'm5', senderId: memberId, receiverId: myId, content: 'We offer 24/7 managed cloud ops for the first year, then transition to your team or our ongoing support tier. Let\'s schedule a call to discuss specifics.', timestamp: now - 44 * HOUR, isRead: true },
      { id: 'm6', senderId: myId, receiverId: memberId, content: 'Perfect, I\'m available Tuesday or Thursday next week. Also, do you handle compliance requirements like SOC2?', timestamp: now - 43 * HOUR, isRead: true },
      { id: 'm7', senderId: memberId, receiverId: myId, content: 'Absolutely, compliance is built into every migration. We\'re SOC2 Type II certified and handle HIPAA, PCI-DSS, and ISO 27001. I\'ll send over our compliance brief.', timestamp: now - 5 * HOUR, isRead: false },
    ],
    '2': [
      { id: 'm8', senderId: myId, receiverId: memberId, content: 'Hi Marcus, I came across Apex Machining and we\'re looking to retrofit our older CNC units. Do you work with Haas equipment?', timestamp: now - 72 * HOUR, isRead: true },
      { id: 'm9', senderId: memberId, receiverId: myId, content: 'Absolutely! We specialize in Haas, Fanuc, and Mazak retrofits. What model years are we talking about?', timestamp: now - 70 * HOUR, isRead: true },
      { id: 'm10', senderId: myId, receiverId: memberId, content: 'We have a 2015 VF-4 and a couple of 2012 Mini Mills that need control upgrades.', timestamp: now - 68 * HOUR, isRead: true },
      { id: 'm11', senderId: memberId, receiverId: myId, content: 'Perfect candidates for retrofit. The VF-4 would benefit significantly from a modern control system. Ballpark budget is $45-60K per unit depending on options.', timestamp: now - 24 * HOUR, isRead: true },
      { id: 'm12', senderId: myId, receiverId: memberId, content: 'That fits our CapEx budget. Can you send over a detailed proposal with timeline?', timestamp: now - 22 * HOUR, isRead: true },
      { id: 'm13', senderId: memberId, receiverId: myId, content: 'Sending the proposal now. We can have a team on-site within 2 weeks of approval. Typical downtime is 5 business days per unit.', timestamp: now - 20 * HOUR, isRead: true },
    ],
    '3': [
      { id: 'm14', senderId: memberId, receiverId: myId, content: 'Hi! I noticed you\'re in the industrial space. We\re offering free security assessments for manufacturing companies this quarter.', timestamp: now - 96 * HOUR, isRead: true },
      { id: 'm15', senderId: myId, receiverId: memberId, content: 'Thanks Jennifer. We\'ve been thinking about our OT security posture. What does the assessment cover?', timestamp: now - 94 * HOUR, isRead: true },
      { id: 'm16', senderId: memberId, receiverId: myId, content: 'Network segmentation analysis, vulnerability scanning of industrial controls, and a compliance gap analysis against NIST CSF. Takes about 3 days.', timestamp: now - 92 * HOUR, isRead: true },
      { id: 'm17', senderId: myId, receiverId: memberId, content: 'Sounds comprehensive. We\'re particularly concerned about our older SCADA systems.', timestamp: now - 90 * HOUR, isRead: true },
      { id: 'm18', senderId: memberId, receiverId: myId, content: 'That\'s exactly what we specialize in. 80% of manufacturing SCADA systems have critical vulnerabilities. Let\'s get you scheduled.', timestamp: now - 88 * HOUR, isRead: true },
      { id: 'm19', senderId: myId, receiverId: memberId, content: 'Let\'s do it. Can we start the week of July 14th?', timestamp: now - 2 * HOUR, isRead: true },
      { id: 'm20', senderId: memberId, receiverId: myId, content: 'I\'ll check our calendar and confirm. We have openings that week. I\'ll also prepare a preliminary scope document.', timestamp: now - 30 * 60000, isRead: false },
    ],
    '4': [
      { id: 'm21', senderId: myId, receiverId: memberId, content: 'David, your collaborative robots look interesting. We\'re exploring automation for our assembly line.', timestamp: now - 120 * HOUR, isRead: true },
      { id: 'm22', senderId: memberId, receiverId: myId, content: 'Great timing! We just launched the TW-1500 series, perfect for light assembly. What\'s your cycle time target?', timestamp: now - 118 * HOUR, isRead: true },
      { id: 'm23', senderId: myId, receiverId: memberId, content: 'We need to hit 45 seconds per unit. Currently averaging 62 seconds with manual labor.', timestamp: now - 116 * HOUR, isRead: true },
      { id: 'm24', senderId: memberId, receiverId: myId, content: 'The TW-1500 can easily handle that. We\'ve seen cycle time reductions of 30-40% in similar setups. Want to see a demo?', timestamp: now - 114 * HOUR, isRead: true },
      { id: 'm25', senderId: myId, receiverId: memberId, content: 'Yes, a demo would be great. Can we do it virtually first? Our facility is in Detroit too.', timestamp: now - 112 * HOUR, isRead: true },
      { id: 'm26', senderId: memberId, receiverId: myId, content: 'Even better! We can do an on-site demo at your facility. I\'ll bring the TW-1500 and we can run it on your actual line.', timestamp: now - 110 * HOUR, isRead: true },
      { id: 'm27', senderId: myId, receiverId: memberId, content: 'That\'s exactly what we need. When are you available?', timestamp: now - 108 * HOUR, isRead: true },
      { id: 'm28', senderId: memberId, receiverId: myId, content: 'I\'m open next Wednesday or Friday. I\'ll also prepare an ROI analysis based on your 45-second target.', timestamp: now - 106 * HOUR, isRead: true },
      { id: 'm29', senderId: myId, receiverId: memberId, content: 'Let\'s do Friday. And yes, the ROI analysis would be helpful for our management presentation.', timestamp: now - 104 * HOUR, isRead: true },
      { id: 'm30', senderId: memberId, receiverId: myId, content: 'Perfect! I\'ll block Friday 2-4 PM and bring the full proposal package. Looking forward to it.', timestamp: now - 102 * HOUR, isRead: true },
      { id: 'm31', senderId: myId, receiverId: memberId, content: 'Quick follow-up - do you handle integration with our existing MES system?', timestamp: now - 10 * HOUR, isRead: true },
      { id: 'm32', senderId: memberId, receiverId: myId, content: 'Absolutely. We have native APIs for SAP ME, Siemens Opcenter, and most major MES platforms. Integration is typically 2-3 days.', timestamp: now - 8 * HOUR, isRead: true },
    ],
    '5': [
      { id: 'm33', senderId: memberId, receiverId: myId, content: 'Hi! Noticed your interest in data infrastructure. We\'re running a pilot program for real-time analytics - would you be interested?', timestamp: now - 36 * HOUR, isRead: true },
      { id: 'm34', senderId: myId, receiverId: memberId, content: 'Hey Priya! We\'ve been looking at real-time analytics for our production floor. What does the pilot include?', timestamp: now - 34 * HOUR, isRead: true },
      { id: 'm35', senderId: memberId, receiverId: myId, content: 'Full platform access for 90 days, including data pipeline setup, dashboard creation, and dedicated support. No commitment required.', timestamp: now - 32 * HOUR, isRead: true },
      { id: 'm36', senderId: myId, receiverId: memberId, content: 'That\'s generous. What kind of data sources can you connect to?', timestamp: now - 30 * HOUR, isRead: true },
      { id: 'm37', senderId: memberId, receiverId: myId, content: 'Pretty much anything - SQL databases, Kafka streams, OPC-UA for industrial data, REST APIs, even Excel files. We\'ll connect your sources in week 1.', timestamp: now - 3 * HOUR, isRead: false },
    ],
    '6': [
      { id: 'm38', senderId: memberId, receiverId: myId, content: 'Greetings from Stuttgart! We are expanding our dealer network in North America. Interested in partnership?', timestamp: now - 168 * HOUR, isRead: true },
      { id: 'm39', senderId: myId, receiverId: memberId, content: 'Hi Klaus! We\'re always looking for quality equipment partners. What\'s your current US presence?', timestamp: now - 166 * HOUR, isRead: true },
    ],
    '7': [
      { id: 'm40', senderId: memberId, receiverId: myId, content: 'Hi there! We\'re launching a new partner program for edge computing resellers. 40% margins on first deal.', timestamp: now - 60 * HOUR, isRead: true },
      { id: 'm41', senderId: myId, receiverId: memberId, content: 'That margin is compelling. What kind of sales support do you provide?', timestamp: now - 58 * HOUR, isRead: true },
      { id: 'm42', senderId: memberId, receiverId: myId, content: 'Full SE support, joint customer calls, POC hardware, and marketing development funds. We want our partners to win.', timestamp: now - 56 * HOUR, isRead: true },
    ],
    '8': [
      { id: 'm43', senderId: memberId, receiverId: myId, content: 'Hello! I specialize in process automation for pharmaceutical manufacturing. Do you have any sterile processing needs?', timestamp: now - 84 * HOUR, isRead: true },
      { id: 'm44', senderId: myId, receiverId: memberId, content: 'Hi Robert. We\'re actually looking to upgrade our CIP/SIP systems. Do you handle that?', timestamp: now - 82 * HOUR, isRead: true },
      { id: 'm45', senderId: memberId, receiverId: myId, content: 'Absolutely! CIP/SIP optimization is one of our core competencies. We can reduce cycle time by 25% typically.', timestamp: now - 80 * HOUR, isRead: true },
    ],
  };

  return scenarios[memberId] || [];
};

export const CURRENT_USER_ID = 'current-user';

export const createInitialConversations = (): Conversation[] => {
  return INITIAL_MEMBERS.map((member) => {
    const messages = createMessages(member.id, CURRENT_USER_ID);
    const unreadCount = messages.filter(
      (m) => m.receiverId === CURRENT_USER_ID && !m.isRead
    ).length;
    return {
      id: `conv-${member.id}`,
      participantId: member.id,
      messages,
      lastMessageAt: messages.length > 0 ? messages[messages.length - 1].timestamp : now,
      unreadCount,
    };
  });
};

export const INDUSTRY_OPTIONS = [
  { value: 'tech', label: 'Tech Sales' },
  { value: 'machinery', label: 'Industrial Machinery' },
] as const;

export const TECH_CATEGORIES = ['SaaS', 'Cybersecurity', 'Cloud', 'Hardware'] as const;
export const MACHINERY_CATEGORIES = ['Manufacturing', 'Automation', 'CNC', 'Heavy Equipment'] as const;
