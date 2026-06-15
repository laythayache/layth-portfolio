/// <reference types="@cloudflare/workers-types" />
import { isAuthed, json, type Env } from "../_auth";
import { readClients, writeClients, publicClient, sanitizeHref, sanitizeName } from "../_clients";

// auth: edit name/href, toggle visibility, and/or reorder (direction: "up" | "down")
export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);
  const id = String(params.id);
  let body: { name?: string; href?: string; visible?: boolean; direction?: "up" | "down" };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  const m = await readClients(env);
  const idx = m.items.findIndex((i) => i.id === id);
  if (idx === -1) return json({ error: "Not found" }, 404);

  if (typeof body.name === "string") m.items[idx].name = sanitizeName(body.name);
  if (typeof body.href === "string") m.items[idx].href = sanitizeHref(body.href);
  if (typeof body.visible === "boolean") m.items[idx].visible = body.visible;
  if (body.direction === "up" && idx > 0) {
    [m.items[idx - 1], m.items[idx]] = [m.items[idx], m.items[idx - 1]];
  } else if (body.direction === "down" && idx < m.items.length - 1) {
    [m.items[idx + 1], m.items[idx]] = [m.items[idx], m.items[idx + 1]];
  }
  await writeClients(env, m);
  return json({ items: m.items.map(publicClient) });
};

// auth: delete from R2 + manifest
export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);
  const id = String(params.id);
  const m = await readClients(env);
  const idx = m.items.findIndex((i) => i.id === id);
  if (idx === -1) return json({ error: "Not found" }, 404);
  const [removed] = m.items.splice(idx, 1);
  await env.GALLERY.delete(`clients/${removed.key}`);
  await writeClients(env, m);
  return json({ items: m.items.map(publicClient) });
};
