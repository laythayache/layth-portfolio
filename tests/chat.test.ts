import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequestPost } from "../functions/api/chat";

function context(messages: unknown, apiKey = "test-key") {
  return {
    env: { OPENAI_API_KEY: apiKey },
    request: new Request("https://example.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    }),
  } as Parameters<typeof onRequestPost>[0];
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("portfolio chat API", () => {
  it("returns a bounded JSON completion", async () => {
    const upstream = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ choices: [{ message: { content: "Layth builds AI systems." } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", upstream);

    const response = await onRequestPost(context([
      { role: "user", content: "What has Layth built?" },
    ]));

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({
      content: "Layth builds AI systems.",
    });

    const request = upstream.mock.calls[0][1] as RequestInit;
    const body = JSON.parse(String(request.body));
    expect(body.stream).toBeUndefined();
    expect(body.model).toBe("gpt-4o-mini");
  });

  it("returns a useful status when the secret is missing", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const response = await onRequestPost(context([
      { role: "user", content: "Hello" },
    ], ""));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: "Service unavailable." });
  });

  it("preserves upstream rate limiting", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("busy", { status: 429 })));

    const response = await onRequestPost(context([
      { role: "user", content: "Hello" },
    ]));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({ error: "AI service is busy." });
  });
});
