/// <reference types="@cloudflare/workers-types" />
import type { Env } from "../../_auth";

// public: stream a logo out of R2 (long-cached, immutable)
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const key = `clients/${String(params.key)}`;
  const obj = await env.GALLERY.get(key);
  if (!obj || !obj.body) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("X-Content-Type-Options", "nosniff");
  // SVG hardening: if a logo is opened directly (not via <img>), neutralize scripts.
  if ((obj.httpMetadata?.contentType || "").includes("svg")) {
    headers.set("Content-Security-Policy", "script-src 'none'; object-src 'none'");
  }
  return new Response(obj.body, { headers });
};
