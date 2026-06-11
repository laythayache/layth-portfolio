/// <reference types="@cloudflare/workers-types" />
import { isAuthed, json, type Env } from "../_auth";
import {
  readClients,
  writeClients,
  publicClient,
  sanitizeHref,
  sanitizeName,
  type ClientItem,
} from "../_clients";

// public: ordered list for the Trusted by section + admin
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const m = await readClients(env);
  return json({ items: m.items.map(publicClient) }, 200, { "Cache-Control": "public, max-age=30" });
};

// Logos are usually vector — SVG first, plus the raster types the gallery accepts.
const EXT: Record<string, string> = {
  "image/svg+xml": "svg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
};

// auth: upload a logo (+ optional name/href) -> R2 + manifest
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Expected multipart/form-data" }, 400);
  }
  const file = form.get("file");
  const name = sanitizeName(form.get("name"));
  const href = sanitizeHref(form.get("href"));
  if (!(file instanceof File)) return json({ error: "No file provided" }, 400);

  const ct = file.type || "application/octet-stream";
  const ext = EXT[ct];
  if (!ext) return json({ error: "Unsupported logo type (SVG, PNG, WEBP, AVIF, GIF, JPG)" }, 415);
  if (file.size > 5 * 1024 * 1024) return json({ error: "Max logo size is 5MB" }, 413);

  const id = crypto.randomUUID();
  const key = `${id}.${ext}`;
  await env.GALLERY.put(`clients/${key}`, await file.arrayBuffer(), {
    httpMetadata: { contentType: ct },
  });

  const item: ClientItem = { id, key, name, href, contentType: ct, createdAt: Date.now() };
  const m = await readClients(env);
  m.items.push(item);
  await writeClients(env, m);

  return json({ item: publicClient(item) }, 201);
};
