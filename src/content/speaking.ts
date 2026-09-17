export interface SpeakingEntry {
  id: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  ctaLabel: string;
  link?: string;
}

export const speakingEntries: SpeakingEntry[] = [
  {
    id: "ai-club",
    title: "AI Club President",
    role: "Founder and Speaker",
    organization: "Rafik Hariri University",
    description:
      "Founded and led the university AI club. Organized workshops and hackathons, mentoring 100+ students in computer vision, NLP, and ML deployment.",
    ctaLabel: "View Layth on LinkedIn",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "physics-astronomy",
    title: "Physics & Astronomy Club",
    role: "Vice President",
    organization: "Rafik Hariri University",
    description:
      "Organized stargazing events, physics lectures, and science outreach activities to promote STEM engagement across the university community.",
    ctaLabel: "View Layth on LinkedIn",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "robotics-tutor",
    title: "Robotics Outreach",
    role: "Workshop Instructor",
    organization: "Public Schools and Little Engineer Initiative",
    description:
      "Designed beginner-friendly robotics sessions in underserved communities with hands-on Arduino and problem-solving labs.",
    ctaLabel: "View Layth on LinkedIn",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "zaka-ambassador",
    title: "ZAKA University Ambassador",
    role: "Community Representative",
    organization: "ZAKA",
    description:
      "Organized AI-focused events and connected students with practitioners to bridge research, industry, and mentorship.",
    ctaLabel: "View Layth on LinkedIn",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "civil-defense-community",
    title: "Emergency Medical Volunteer",
    role: "EMT & Mentor · Currently inactive",
    organization: "Lebanese Civil Defense",
    description:
      "Delivered on-site emergency medical care, executed BLS protocols, coordinated patient transport, and mentored new EMT volunteers.",
    ctaLabel: "View Layth on LinkedIn",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "jarrah-scouts",
    title: "Jarrah Scouts",
    role: "Former Member",
    organization: "Jarrah Scouts Lebanon",
    description:
      "Contributed to community service projects, leadership development, and outdoor education programs.",
    ctaLabel: "View Layth on LinkedIn",
    link: "https://www.linkedin.com/in/laythayache",
  },
];
