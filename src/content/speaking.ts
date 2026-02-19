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
    title: "AI Club Leadership",
    role: "Organizer and Speaker",
    organization: "Rafik Hariri University",
    description:
      "Led practical AI workshops and community events focused on computer vision, NLP, and real-world deployment mindset.",
    ctaLabel: "View highlights",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "robotics-tutor",
    title: "Robotics Outreach",
    role: "Workshop Instructor",
    organization: "Public Schools and Little Engineer Initiative",
    description:
      "Designed beginner-friendly robotics sessions in underserved communities with hands-on Arduino and problem-solving labs.",
    ctaLabel: "Join community",
    link: "https://www.linkedin.com/in/laythayache",
  },
  {
    id: "zaka-ambassador",
    title: "ZAKA University Ambassador",
    role: "Community Representative",
    organization: "ZAKA",
    description:
      "Organized AI-focused events and connected students with practitioners to bridge research, industry, and mentorship.",
    ctaLabel: "See updates",
    link: "https://www.linkedin.com/in/laythayache",
  },
];
