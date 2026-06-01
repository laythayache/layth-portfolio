/// <reference types="@cloudflare/workers-types" />
import type { Env } from "./_auth";

export interface GalleryItem {
  id: string;
  key: string; // R2 filename (without the "gallery/" prefix), e.g. "abc.jpg"
  caption: string;
  contentType: string;
  createdAt: number;
}
interface Manifest {
  items: GalleryItem[];
}

export const MANIFEST_KEY = "gallery/manifest.json";

export async function readManifest(env: Env): Promise<Manifest> {
  const obj = await env.GALLERY.get(MANIFEST_KEY);
  if (!obj) return { items: [] };
  try {
    const m = (await obj.json()) as Manifest;
    return { items: Array.isArray(m.items) ? m.items : [] };
  } catch {
    return { items: [] };
  }
}
export async function writeManifest(env: Env, m: Manifest): Promise<void> {
  await env.GALLERY.put(MANIFEST_KEY, JSON.stringify(m), {
    httpMetadata: { contentType: "application/json" },
  });
}
/** Shape returned to the public (hero) + admin clients. */
export function publicItem(it: GalleryItem) {
  return {
    id: it.id,
    caption: it.caption,
    kind: it.contentType.startsWith("video/") ? "video" : "image",
    url: `/api/gallery/file/${encodeURIComponent(it.key)}`,
  };
}
