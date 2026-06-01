/// <reference types="@cloudflare/workers-types" />
import { checkPassword, createToken, sessionCookie, json, type Env } from "../_auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  if (!checkPassword(env, body.password || "")) {
    return json({ error: "Invalid password" }, 401);
  }
  const token = await createToken(env);
  return json({ ok: true }, 200, { "Set-Cookie": sessionCookie(token) });
};
