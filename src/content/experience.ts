export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  bullets: string[];
  skills: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "aligned-tech",
    company: "Aligned Tech",
    role: "AI Systems Engineer & Technical Consultant",
    type: "Full-time",
    location: "Hazmieh, Lebanon",
    dateStart: "Nov 2025",
    dateEnd: "Present",
    bullets: [
      "Design and deploy AI-driven systems for enterprise clients across multiple industries",
      "Provide technical consulting on AI strategy, automation workflows, and system architecture",
      "Develop custom AI solutions including predictive analytics, NLP pipelines, and computer vision systems",
    ],
    skills: ["AI Systems", "Consulting", "Automation", "Python", "TensorFlow"],
  },
  {
    id: "cog-developers",
    company: "Cog Developers",
    role: "Data Scientist",
    type: "Full-time",
    location: "Beirut, Lebanon",
    dateStart: "Sep 2025",
    dateEnd: "Oct 2025",
    bullets: [
      "Built statistical models and data analysis pipelines using Python",
      "Applied data-driven insights to support product and business decisions",
    ],
    skills: ["Python", "Statistical Data Analysis"],
  },
  {
    id: "organizer-mea",
    company: "Organizer (MEA)",
    role: "AI Software Developer",
    type: "Part-time",
    location: "Beirut, Lebanon",
    dateStart: "Mar 2025",
    dateEnd: "Aug 2025",
    bullets: [
      "Developed AI models for predictive financial analytics, improving forecast accuracy by ~20%",
      "Automated financial reporting using NLP and implemented OCR pipelines for invoice processing",
      "Built real-time dashboards with React.js and Chart.js for financial KPI visualization",
    ],
    skills: ["Python", "OCR", "NLP", "React.js", ".NET", "TensorFlow"],
  },
  {
    id: "voxire",
    company: "Voxire",
    role: "Head of Public Relations",
    type: "Leadership",
    location: "Lebanon",
    dateStart: "Apr 2024",
    dateEnd: "Present",
    bullets: [
      "Manage external partnerships and sponsor relations for a smart business solutions startup",
      "Lead public communications strategy and represent the company at industry events",
    ],
    skills: ["Public Relations", "Partnerships", "Strategy"],
  },
  {
    id: "zaka",
    company: "ZAKA",
    role: "University Ambassador",
    type: "Ambassador",
    location: "Lebanon",
    dateStart: "Sep 2024",
    dateEnd: "Apr 2025",
    bullets: [
      "Promoted AI solutions and organized workshops on Computer Vision, NLP, and Neural Networks",
      "Built a network of AI professionals and enthusiasts, growing the university tech community",
    ],
    skills: ["AI", "Machine Learning", "Educational Leadership", "Community Building"],
  },
  {
    id: "ogero-network",
    company: "OGERO",
    role: "Network Engineer",
    type: "Internship",
    location: "Beirut, Lebanon",
    dateStart: "Jun 2024",
    dateEnd: "Dec 2024",
    bullets: [
      "Maintained DSLAMs, fiber optics, switches, and routers at the national telecom level",
      "Configured VLANs, firewalls, and multi-layer security; used SNMP/OID automation for device identification",
      "Contributed to maintaining ~99.9% network uptime across infrastructure",
    ],
    skills: ["Cisco", "Network Security", "Linux", "Automation"],
  },
  {
    id: "ogero-data",
    company: "OGERO",
    role: "Data Analyst & Web Developer",
    type: "Internship",
    location: "Beirut, Lebanon",
    dateStart: "Dec 2023",
    dateEnd: "Mar 2024",
    bullets: [
      "Built AI-driven telecom usage forecasting models, improving accuracy by 15–18%",
      "Processed datasets exceeding 1M+ records and built dynamic dashboards with React.js",
      "Reduced manual intervention by ~25% via AI workflow integration",
    ],
    skills: ["TensorFlow", "React.js", "Data Analysis", "Machine Learning"],
  },
  {
    id: "rhu",
    company: "Rafik Hariri University",
    role: "Work Study Student & AI Club President",
    type: "Part-time",
    location: "Meshref, Lebanon",
    dateStart: "Jan 2023",
    dateEnd: "Jun 2025",
    bullets: [
      "Lab assistant for Embedded Systems, Electronics, and Electric Circuits courses",
      "Reorganized and led the AI Club — organized hackathons, grew community to 100+ students",
      "Tutored students in Python, C++, MATLAB, and Verilog-based embedded projects",
    ],
    skills: ["AI", "Machine Learning", "Embedded Systems", "Teaching"],
  },
  {
    id: "civil-defense",
    company: "Lebanese Civil Defense",
    role: "Emergency Medical Technician",
    type: "Volunteer",
    location: "Beirut, Lebanon",
    dateStart: "Dec 2023",
    dateEnd: "Present",
    bullets: [
      "Deliver on-site emergency medical care and execute BLS protocols",
      "Coordinate patient transport with hospitals and mentor new EMT volunteers",
    ],
    skills: ["Emergency Response", "BLS", "Leadership"],
  },
  {
    id: "sela",
    company: "Sela / PlaytimeCo",
    role: "Team Leader — Jeddah Season",
    type: "Full-time",
    location: "Jeddah, Saudi Arabia",
    dateStart: "May 2022",
    dateEnd: "Jul 2022",
    bullets: [
      "Led event teams during large-scale seasonal events, managing logistics and operations",
      "Conducted interactive workshops and supervised cash operations and guest experience",
    ],
    skills: ["Team Leadership", "Event Management", "Operations"],
  },
];
