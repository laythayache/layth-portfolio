import type { TocItem } from "@/components/microsite/TableOfContents";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const label = match[1].trim();
      items.push({ id: slugify(label), label });
    }
  }

  return items;
}
