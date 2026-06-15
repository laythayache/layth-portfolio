/// <reference types="@cloudflare/workers-types" />
// Shared helpers for the "Trusted by" client-logo collection. Mirrors _gallery.ts
// but adds name + href and lives under the "clients/" key prefix in the same
// R2 bucket (GALLERY). Files prefixed with "_" are not routed.
import type { Env } from "./_auth";

export interface ClientItem {
  id: string;
  key: string; // R2 filename (without the "clients/" prefix), e.g. "abc.svg"
  name: string;
  href: string; // optional external link (http/https only)
  visible?: boolean; // shown publicly when not false; hidden items stay in the CMS only
  contentType: string;
  createdAt: number;
}
interface Manifest {
  items: ClientItem[];
}

export const CLIENTS_MANIFEST_KEY = "clients/manifest.json";

export async function readClients(env: Env): Promise<Manifest> {
  const obj = await env.GALLERY.get(CLIENTS_MANIFEST_KEY);
  if (!obj) return { items: [] };
  try {
    const m = (await obj.json()) as Manifest;
    return { items: Array.isArray(m.items) ? m.items : [] };
  } catch {
    return { items: [] };
  }
}
export async function writeClients(env: Env, m: Manifest): Promise<void> {
  await env.GALLERY.put(CLIENTS_MANIFEST_KEY, JSON.stringify(m), {
    httpMetadata: { contentType: "application/json" },
  });
}

/** Shape returned to the public (Trusted by section) + admin clients. */
export function publicClient(it: ClientItem) {
  return {
    id: it.id,
    name: it.name,
    href: it.href,
    visible: it.visible !== false,
    url: `/api/clients/file/${encodeURIComponent(it.key)}`,
  };
}

/** Legacy items have no `visible` field — treat undefined as visible. */
export function isVisible(it: ClientItem): boolean {
  return it.visible !== false;
}

/** Only allow absolute http(s) links — blocks javascript:/data: XSS via the logo link. */
export function sanitizeHref(v: unknown): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  return /^https?:\/\/.+/i.test(s) ? s.slice(0, 300) : "";
}
export function sanitizeName(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 80) : "";
}
