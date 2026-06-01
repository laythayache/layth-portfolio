/// <reference types="@cloudflare/workers-types" />
import type { Env } from "../../_auth";

// public: stream an image out of R2 (long-cached, immutable)
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const key = `gallery/${String(params.key)}`;
  const obj = await env.GALLERY.get(key);
  if (!obj || !obj.body) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(obj.body, { headers });
};
