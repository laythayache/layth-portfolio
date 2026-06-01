/// <reference types="@cloudflare/workers-types" />
import { isAuthed, json, type Env } from "../_auth";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) =>
  json({ authed: await isAuthed(request, env) });
