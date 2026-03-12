import { SYSTEM_PROMPT } from "./system-prompt";

interface Env {
  OPENAI_API_KEY: string;
}

// IP-based rate limiting: 20 requests per hour
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  return false;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const ip =
    context.request.headers.get("cf-connecting-ip") ??
    context.request.headers.get("x-forwarded-for") ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limited. Try again in a bit." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Service unavailable." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await context.request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Messages array is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Cap conversation length to prevent abuse
  const messages = body.messages.slice(-20);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return new Response(
      JSON.stringify({ error: "AI service error.", detail: text }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // Pipe the SSE stream directly back to the client
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
