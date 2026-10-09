export const skillGroups = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Java', 'C++'] },
  {
    category: 'Frontend',
    items: ['React.js', 'Redux', 'React Router', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material-UI'],
  },
  { category: 'Backend', items: ['Java', 'Node.js', 'Express.js', 'REST APIs'] },
  { category: 'Databases & Caching', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  {
    category: 'Tools & Testing',
    items: ['Git', 'GitHub', 'Webpack', 'Babel', 'Jest', 'Enzyme', 'Postman', 'Docker', 'GitHub Actions'],
  },
];

// Flat, de-duplicated list (used by the chatbot).
export const skills = [...new Set(skillGroups.flatMap((g) => g.items))];

export const concepts = [
  'Data Structures & Algorithms', 'DBMS', 'OOP', 'Operating Systems', 'Computer Networks',
  'Performance Optimization', 'Unit Testing', 'CI/CD', 'Agile/Scrum',
];

// Wrap text in **double asterisks** to render it bold in the Experience cards.
export const experience = [
  {
    title: 'Software Engineer',
    company: 'Fundly.ai',
    logo: '/logos/fundly.webp',
    period: 'Jun 2025 — Present',
    location: 'Mumbai, Maharashtra',
    tags: ['React', 'TypeScript', 'Java', 'PostgreSQL', 'Redis', 'Fintech'],
    description: [
      'Led development of a **configuration-driven, multi-tenant onboarding SDK** using React, TypeScript and Java, enabling lender integrations through configurable workflows, reducing onboarding time from **3 days to 10 minutes** and integration effort by **50%**.',
      'Built **production-grade payment solutions** integrating Cashfree, ZackPay and UPI Intent (NDAI5) into QR workflows, with callback handling, retry mechanisms and transaction reconciliation, supporting **5K+ daily users** and **5L+ daily transactions**.',
      'Built an **in-house CRM end-to-end** using React, Java and PostgreSQL, owning the frontend, REST APIs and database layer for lead management, conversion workflows and cross-selling across products, eliminating external CRM dependency and saving **4L+ annually**.',
      'Developed **Java backend services and REST APIs**, implementing **Redis-backed rate limiting** for public search APIs, centralized audit logging for invoice fraud detection, and **RBAC** for distributor management.',
      'Built and integrated **React-based WebView SDKs** within Flutter applications, designing **postMessage-based communication** between web and native layers to enable secure data exchange, event handling and seamless cross-platform workflows.',
      'Improved **LOS dashboard performance by 30%** and frontend/WebView performance by **25–30%** through API optimization, lazy loading, code splitting, efficient state management and rendering optimizations; designed **modular, scalable architecture** with decoupled business and presentation layers.',
      'Leveraged **Agentic AI-driven Software Development (SDD)** for feature planning, story generation, implementation assistance and automated code reviews, while collaborating with product, design and backend teams to deliver end-to-end features.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Capgemini',
    logo: '/logos/capgemini.webp',
    period: 'Aug 2022 — Aug 2024',
    location: 'Mumbai, Maharashtra',
    tags: ['React.js', 'Jest', 'Enzyme', 'Webpack', 'Babel', 'Agile'],
    description: [
      'Developed and maintained **scalable React.js components** across enterprise applications, improving code reusability by **25%** and boosting UI performance by **20%** using lazy loading and code splitting.',
      'Improved frontend quality by achieving **95%+ test coverage** with Jest and Enzyme, reduced UI defects by **40%**, and enhanced build speed by **30%** through Webpack and Babel optimization while contributing to **20+ Agile sprints**.',
    ],
  },
];

export const projects = [
  {
    title: 'GoodFood — Food Delivery App',
    description:
      'High-performance food delivery platform built with React and Redux Toolkit; improved rendering efficiency by 25% with seamless state management across 10+ screens.',
    tags: ['React.js', 'Tailwind CSS', 'Redux', 'React Router'],
    url: 'https://github.com/vipulbadwaik',
  },
];

export const education = {
  degree: 'Bachelor of Technology',
  field: 'Computer Science & Engineering',
  school: 'Rungta College of Engineering and Technology, Bhilai',
  period: '2018 — 2022',
  description: 'CGPA: 8.84',
  achievement: 'Qualified GATE 2025 (Computer Science & Engineering)',
};

export const socials = [
  { name: 'GitHub', url: 'https://github.com/vipulbadwaik' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vipulbadwaik/' },
  { name: 'Twitter', url: 'https://x.com/VipulBadwaik' },
];
