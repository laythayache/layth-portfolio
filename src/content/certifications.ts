export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
}

export const certifications: Certification[] = [
  {
    id: "ccnav7",
    name: "CCNAv7: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    date: "Apr 2024",
  },
  {
    id: "computer-vision",
    name: "Computer Vision Certificate",
    issuer: "OpenCV University",
  },
  {
    id: "bls",
    name: "Basic Life Support (BLS)",
    issuer: "NAEMT",
  },
  {
    id: "phlebotomy",
    name: "Phlebotomy Technician",
    issuer: "Medical Rescue Corps Lebanon",
  },
];

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dateRange: string;
  accreditation?: string;
}

export const education: Education = {
  degree: "B.E. Computer & Communication Engineering",
  institution: "Rafik Hariri University",
  location: "Meshref, Lebanon",
  dateRange: "2021 – 2025",
  accreditation: "ABET Accredited",
};
