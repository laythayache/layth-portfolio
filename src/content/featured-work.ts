/** Curated homepage selection. Project facts remain in projects.ts. */
export const featuredWork = [
  {
    slug: "lancaster-websites", number: "01", title: "Lancaster", subtitle: "A collection of hospitality websites.",
    category: "Web engineering / Hospitality", role: "Web engineering",
    description: "A shared web platform for a collection of hotel properties. Distinct destinations, connected by a consistent foundation for content and guest discovery.",
    tools: ["React", "Node.js", "PostgreSQL"], link: "https://lancasterplaza.com/", linkLabel: "Visit Lancaster Plaza",
  },
  {
    slug: "omnisign", number: "02", title: "OmniSign", subtitle: "Computer vision for sign language.",
    category: "Applied AI / Accessibility", role: "AI & ML Lead · Team of 6",
    description: "A Lebanese Sign Language translation project, connecting a locally collected dataset with landmark detection, sequence models and text-to-speech output.",
    tools: ["TensorFlow", "MediaPipe", "Python"], link: null, linkLabel: null,
  },
  {
    slug: "privacy-guard", number: "03", title: "PrivacyGuard", subtitle: "Video processing with privacy built in.",
    category: "Computer vision / Open source", role: "Creator & Lead Developer",
    description: "An on-device pipeline for detecting and masking sensitive regions in video. Built around configurable detection, anonymization and edge deployment.",
    tools: ["YOLO", "ONNX Runtime", "OpenCV"], link: "https://github.com/laythayache/PrivacyGuard", linkLabel: "Explore the code",
  },
  {
    slug: "daleel", number: "04", title: "Daleel", subtitle: "Making public information easier to find.",
    category: "Data collection / Public information", role: "Web scraping & information gathering",
    description: "A searchable guide to Lebanese elections. My contribution focused on scraping and gathering the public information used by the platform.",
    tools: ["Web scraping", "Information gathering"], link: "https://daleel-lb.vercel.app/en", linkLabel: "Explore Daleel",
  },
] as const;

export const lancasterProperties = [
  { name: "Lancaster Plaza", url: "https://lancasterplaza.com/" },
  { name: "Lancaster Tamar", url: "https://lancastertamar.com/" },
  { name: "Lancaster Hotel Raouche", url: "https://lancasterhotelraouche.com/" },
  { name: "Lancaster Suites Raouche", url: "http://lancastersuitesraouche.com/" },
] as const;
