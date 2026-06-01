/// <reference types="@cloudflare/workers-types" />
import { isAuthed, json, type Env } from "../_auth";
import { readManifest, writeManifest, publicItem } from "../_gallery";

// auth: edit caption and/or reorder (direction: "up" | "down")
export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);
  const id = String(params.id);
  let body: { caption?: string; direction?: "up" | "down" };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  const m = await readManifest(env);
  const idx = m.items.findIndex((i) => i.id === id);
  if (idx === -1) return json({ error: "Not found" }, 404);

  if (typeof body.caption === "string") m.items[idx].caption = body.caption.slice(0, 200);
  if (body.direction === "up" && idx > 0) {
    [m.items[idx - 1], m.items[idx]] = [m.items[idx], m.items[idx - 1]];
  } else if (body.direction === "down" && idx < m.items.length - 1) {
    [m.items[idx + 1], m.items[idx]] = [m.items[idx], m.items[idx + 1]];
  }
  await writeManifest(env, m);
  return json({ items: m.items.map(publicItem) });
};

// auth: delete from R2 + manifest
export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);
  const id = String(params.id);
  const m = await readManifest(env);
  const idx = m.items.findIndex((i) => i.id === id);
  if (idx === -1) return json({ error: "Not found" }, 404);
  const [removed] = m.items.splice(idx, 1);
  await env.GALLERY.delete(`gallery/${removed.key}`);
  await writeManifest(env, m);
  return json({ items: m.items.map(publicItem) });
};
