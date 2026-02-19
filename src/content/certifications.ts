export type CredentialGroup = "degrees" | "professional" | "awards";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  details: string;
  group: CredentialGroup;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "be-rhu",
    name: "B.E. Computer and Communication Engineering",
    issuer: "Rafik Hariri University",
    date: "2021 - 2025",
    details:
      "ABET-accredited degree focused on embedded systems, networking, and applied AI engineering.",
    group: "degrees",
  },
  {
    id: "ccnav7",
    name: "CCNAv7: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    date: "Apr 2024",
    details:
      "Routing and switching, network segmentation, and enterprise security operations.",
    group: "professional",
  },
  {
    id: "opencv-cv",
    name: "Computer Vision Certificate",
    issuer: "OpenCV University",
    date: "2024",
    details:
      "Image processing and applied computer vision models for detection and recognition workflows.",
    group: "professional",
  },
  {
    id: "bls",
    name: "Basic Life Support (BLS)",
    issuer: "NAEMT",
    date: "2023",
    details:
      "Emergency response and life-support protocol certification used in field volunteer work.",
    group: "awards",
  },
  {
    id: "phlebotomy",
    name: "Phlebotomy Technician",
    issuer: "Medical Rescue Corps Lebanon",
    date: "2023",
    details:
      "Clinical blood collection, patient handling, and safety standards in healthcare contexts.",
    group: "awards",
  },
];
