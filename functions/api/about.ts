/// <reference types="@cloudflare/workers-types" />
import { isAuthed, json, type Env } from "./_auth";
import { readAbout, writeAbout, sanitizeAbout } from "./_about";

// public: the About-page content for src/pages/About.tsx
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const c = await readAbout(env);
  return json(c, 200, { "Cache-Control": "public, max-age=30" });
};

// auth: save the edited content
export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await isAuthed(request, env))) return json({ error: "Unauthorized" }, 401);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  const c = sanitizeAbout(body);
  await writeAbout(env, c);
  return json(c);
};
