export interface SpeakingEntry {
  id: string;
  title: string;
  role: string;
  organization: string;
  description: string;
}

export const speakingEntries: SpeakingEntry[] = [
  {
    id: "ai-club",
    title: "AI Club President",
    role: "Organizer & Speaker",
    organization: "Rafik Hariri University",
    description:
      "Organized AI workshops and hackathons. Led sessions on Computer Vision, NLP, and Neural Networks. Grew the technical community to 100+ students.",
  },
  {
    id: "robotics-tutor",
    title: "Robotics Tutor",
    role: "Workshop Instructor",
    organization: "Public Schools & Little Engineer Initiative",
    description:
      "Conduct robotics workshops teaching Arduino and programming fundamentals to students. Collaborate with the Little Engineer initiative to bring STEM education to underserved communities.",
  },
  {
    id: "zaka-ambassador",
    title: "ZAKA University Ambassador",
    role: "Community Representative",
    organization: "ZAKA",
    description:
      "Promoted AI solutions and organized AI-related events at the university level. Served as a bridge between ZAKA and the student tech community.",
  },
];
