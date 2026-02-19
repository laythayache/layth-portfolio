export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  externalCanonical?: string;
  content: string;
  readingTimeMinutes: number;
}

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  externalCanonical?: string;
}

const rawPosts = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };

  const metaBlock = match[1];
  const body = match[2].trim();
  const frontmatter: Frontmatter = {};

  for (const line of metaBlock.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (key === "tags") {
      const tags = rawValue
        .replace(/^\[/, "")
        .replace(/\]$/, "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      frontmatter.tags = tags;
      continue;
    }

    const cleaned = rawValue.replace(/^["']|["']$/g, "");
    if (key === "title") frontmatter.title = cleaned;
    if (key === "date") frontmatter.date = cleaned;
    if (key === "excerpt") frontmatter.excerpt = cleaned;
    if (key === "coverImage") frontmatter.coverImage = cleaned;
    if (key === "externalCanonical") frontmatter.externalCanonical = cleaned;
  }

  return { frontmatter, body };
}

function readingTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function toSlug(path: string) {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return file.replace(/\.md$/, "");
}

const allPosts: BlogPost[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const slug = toSlug(path);
    const { frontmatter, body } = parseFrontmatter(raw);
    return {
      slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? "1970-01-01",
      excerpt: frontmatter.excerpt ?? "",
      tags: frontmatter.tags ?? [],
      coverImage: frontmatter.coverImage,
      externalCanonical: frontmatter.externalCanonical,
      content: body,
      readingTimeMinutes: readingTimeMinutes(body),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts() {
  return allPosts;
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug);
}

export function getAllPostTags() {
  const tags = new Set<string>();
  for (const post of allPosts) {
    for (const tag of post.tags) tags.add(tag);
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function filterPostsByTag(posts: BlogPost[], tag: string | null) {
  if (!tag) return posts;
  const lowered = tag.toLowerCase();
  return posts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === lowered)
  );
}
