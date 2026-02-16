export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  draft?: boolean;
  externalUrl?: string;
  relatedProject?: {
    slug: string;
    label: string;
  };
}

export const articles: Article[] = [
  {
    slug: "building-in-a-country-with-no-infrastructure",
    title: "Building in a Country with No Infrastructure",
    summary:
      "How infrastructure fragility becomes an engineering variable. Exploring the OmniSign project\u2014a Lebanese Sign Language interpreter built from first principles in an environment where data, connectivity, and stability cannot be assumed.",
    date: "2026-02-15",
    tags: ["infrastructure", "lebanon", "engineering", "systems"],
    externalUrl:
      "https://medium.com/@laythayache5/building-in-a-country-with-no-infrastructure-3f8595472895",
    relatedProject: {
      slug: "omnisign",
      label: "Explore OmniSign",
    },
  },
];
