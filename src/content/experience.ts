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
    role: "AI Systems Engineer & Technology Consultant",
    type: "Full-time",
    location: "Hazmieh, Lebanon",
    dateStart: "Nov 2025",
    dateEnd: "Present",
    bullets: [
      "Lead AI systems architecture, cross-functional engineering, and technology strategy across all company software and data initiatives",
      "Drive end-to-end AI infrastructure and engineering operations — from data pipeline architecture to production deployment and monitoring",
      "Architect and maintain API integrations with Meta, LinkedIn, and TikTok platforms, enabling automated data collection and marketing analytics at scale",
      "Design and operate Python-based ETL pipelines, scheduled automation (cron jobs), and system monitoring workflows serving company-wide analytics",
      "Structure databases, data schemas, and CRM platforms to ensure scalable data organization and reporting reliability across departments",
      "Coordinate cross-functional teams, translating technical requirements between engineering, marketing, and executive stakeholders",
    ],
    skills: [
      "Systems Architecture",
      "API Integrations",
      "Python",
      "ETL Pipelines",
      "CRM Systems",
      "Technical Leadership",
    ],
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
      "Built automated data pipelines and ingestion systems processing 2M+ data points monthly for analytics and AI applications",
      "Developed and deployed computer vision models achieving 95% detection accuracy for automated monitoring systems",
      "Implemented RAG-based knowledge assistants integrating large language models with enterprise data systems",
      "Integrated AI solutions into production systems using Docker and AWS EC2 with automated retraining and monitoring workflows",
      "Collaborated with engineering and product teams to integrate AI insights into operational workflows, reducing manual processing by 30%",
    ],
    skills: [
      "Data Pipelines",
      "Computer Vision",
      "Docker",
      "AWS",
      "RAG Systems",
    ],
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
      "Built AI-powered financial analytics systems for forecasting and anomaly detection in transaction data",
      "Automated financial reporting workflows using NLP pipelines to extract insights from unstructured documents",
      "Designed OCR processing pipelines using Tesseract and OpenCV to extract structured data from 50K+ scanned documents",
      "Developed interactive dashboards for KPI monitoring and analytics visualization used by operational teams",
    ],
    skills: [
      "Python",
      "OCR",
      "NLP",
      "React.js",
      "TensorFlow",
      "Dashboards",
    ],
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
    role: "Data Analyst Intern",
    type: "Internship",
    location: "Beirut, Lebanon (Hybrid)",
    dateStart: "Dec 2023",
    dateEnd: "Mar 2024",
    bullets: [
      "Created AI-driven predictive analytics models using TensorFlow, improving telecom usage forecasting by 18%",
      "Conducted large-scale data cleaning and feature extraction on 1M+ records to enhance ML model performance",
      "Built visualization dashboards using Plotly and Dash for real-time network analytics supporting daily operations",
    ],
    skills: ["TensorFlow", "Data Analysis", "Plotly", "Dash", "Python"],
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
      "Organized AI workshops and hackathons, mentoring 100+ students in CV, NLP, and ML techniques",
      "Tutored students in Python, C++, MATLAB, and Verilog-based embedded projects",
    ],
    skills: ["AI", "Machine Learning", "Embedded Systems", "Teaching"],
  },
];

export const beyondTechExperience: ExperienceEntry[] = [
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
    id: "zaka",
    company: "ZAKA",
    role: "University Ambassador",
    type: "Ambassador",
    location: "Lebanon",
    dateStart: "Sep 2024",
    dateEnd: "May 2025",
    bullets: [
      "Promoted ethical AI practices and represented RHU at regional AI summits",
      "Built a network of AI professionals and enthusiasts, growing the university tech community",
    ],
    skills: ["AI", "Machine Learning", "Community Building"],
  },
];
