/// <reference types="@cloudflare/workers-types" />
import { clearCookie, json, type Env } from "../_auth";

export const onRequestPost: PagesFunction<Env> = async () =>
  json({ ok: true }, 200, { "Set-Cookie": clearCookie() });
