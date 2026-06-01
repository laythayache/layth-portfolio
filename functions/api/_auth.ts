/// <reference types="@cloudflare/workers-types" />
// Shared auth + env for the gallery admin CMS. Files prefixed with "_" are not routed.

export interface Env {
  GALLERY: R2Bucket;
  ADMIN_PASSWORD: string;
  ADMIN_JWT_SECRET: string;
}

export const COOKIE_NAME = "ff_admin";
const TTL = 60 * 60 * 24 * 7; // 7 days
const enc = new TextEncoder();

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(str: string): string {
  const s = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(s + "=".repeat((4 - (s.length % 4)) % 4));
}
async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64url(sig);
}
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function createToken(env: Env): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + TTL })));
  return `${payload}.${await hmac(env.ADMIN_JWT_SECRET, payload)}`;
}
export async function verifyToken(env: Env, token: string | null): Promise<boolean> {
  if (!token || !env.ADMIN_JWT_SECRET) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  if (!timingSafeEqual(sig, await hmac(env.ADMIN_JWT_SECRET, payload))) return false;
  try {
    const { exp } = JSON.parse(b64urlDecode(payload));
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
export function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
}
export function sessionCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${TTL}`;
}
export function clearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}
export async function isAuthed(request: Request, env: Env): Promise<boolean> {
  return verifyToken(env, getCookie(request, COOKIE_NAME));
}
export function checkPassword(env: Env, provided: string): boolean {
  if (!env.ADMIN_PASSWORD || !provided) return false;
  return timingSafeEqual(provided, env.ADMIN_PASSWORD);
}
export function json(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...extra } });
}
