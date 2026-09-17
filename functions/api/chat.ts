import { SYSTEM_PROMPT } from "./system-prompt";

interface Env {
  OPENAI_API_KEY: string;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Portfolio chat is missing OPENAI_API_KEY.");
    return jsonResponse({ error: "Service unavailable." }, 503);
  }

  let body: { messages?: unknown };
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 20) {
    return jsonResponse({ error: "Messages array is required." }, 400);
  }

  const validRoles = new Set(["user", "assistant"]);
  const messages = body.messages.filter((message): message is { role: "user" | "assistant"; content: string } => {
    if (!message || typeof message !== "object") return false;
    const candidate = message as Record<string, unknown>;
    return typeof candidate.role === "string" && validRoles.has(candidate.role) && typeof candidate.content === "string" && candidate.content.trim().length > 0 && candidate.content.length <= 4000;
  });
  if (messages.length !== body.messages.length || !messages.some((message) => message.role === "user")) {
    return jsonResponse({ error: "Messages must use user or assistant roles and contain 1–4000 characters." }, 400);
  }

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/chat/completions", {
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
        max_tokens: 300,
        temperature: 0.3,
      }),
    });
  } catch (error) {
    console.error("OpenAI request failed before a response was received.", error);
    return jsonResponse({ error: "AI service unavailable." }, 502);
  }

  if (!response.ok) {
    console.error("OpenAI request returned an error.", {
      status: response.status,
      requestId: response.headers.get("x-request-id"),
    });
    return jsonResponse(
      { error: response.status === 429 ? "AI service is busy." : "AI service error." },
      response.status === 429 ? 429 : 502,
    );
  }

  let completion: unknown;
  try {
    completion = await response.json();
  } catch (error) {
    console.error("OpenAI returned a non-JSON success response.", error);
    return jsonResponse({ error: "AI service returned an invalid response." }, 502);
  }

  const content = (completion as {
    choices?: Array<{ message?: { content?: unknown } }>;
  }).choices?.[0]?.message?.content;

  if (typeof content !== "string" || !content.trim()) {
    console.error("OpenAI returned a completion without message content.");
    return jsonResponse({ error: "AI service returned an empty response." }, 502);
  }

  return jsonResponse({ content: content.trim() });
};
