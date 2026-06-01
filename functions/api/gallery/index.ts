/// <reference types="@cloudflare/workers-types" />
import { isAuthed, json, type Env } from "../_auth";
import { readManifest, writeManifest, publicItem, type GalleryItem } from "../_gallery";

// public: ordered list for the hero + admin
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const m = await readManifest(env);
  return json({ items: m.items.map(publicItem) }, 200, { "Cache-Control": "public, max-age=30" });
};

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

// auth: upload an image -> R2 + manifest
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Expected multipart/form-data" }, 400);
  }
  const file = form.get("file");
  const caption = (form.get("caption") as string) || "";
  if (!(file instanceof File)) return json({ error: "No file provided" }, 400);

  const ct = file.type || "application/octet-stream";
  const ext = EXT[ct];
  if (!ext) return json({ error: "Unsupported file type (images + MP4/WEBM video only)" }, 415);
  const isVideo = ct.startsWith("video/");
  const maxMb = isVideo ? 50 : 10;
  if (file.size > maxMb * 1024 * 1024) return json({ error: `Max ${isVideo ? "video" : "image"} size is ${maxMb}MB` }, 413);

  const id = crypto.randomUUID();
  const key = `${id}.${ext}`;
  await env.GALLERY.put(`gallery/${key}`, await file.arrayBuffer(), {
    httpMetadata: { contentType: ct },
  });

  const item: GalleryItem = { id, key, caption, contentType: ct, createdAt: Date.now() };
  const m = await readManifest(env);
  m.items.push(item);
  await writeManifest(env, m);

  return json({ item: publicItem(item) }, 201);
};
