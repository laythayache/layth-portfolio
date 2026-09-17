import { PROFESSIONAL } from "./professional";

export const BRAND = {
  name: PROFESSIONAL.name,
  title: PROFESSIONAL.primaryTitle,
  thesis: "AI systems built for real operations.",
  tagline: PROFESSIONAL.summary,
  description: "Layth Ayache is an AI Systems Engineer based in Beirut, building AI integrations, automation workflows, data pipelines, and web applications.",
  url: PROFESSIONAL.profiles.website,
  github: PROFESSIONAL.profiles.github,
  linkedin: PROFESSIONAL.profiles.linkedin,
  medium: PROFESSIONAL.profiles.medium,
  email: PROFESSIONAL.email,
  calendly: PROFESSIONAL.profiles.calendly,
  location: PROFESSIONAL.location,
} as const;
