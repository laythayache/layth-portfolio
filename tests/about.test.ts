import { describe, expect, it } from "vitest";
import { sanitizeAbout } from "../functions/api/_about";

describe("About content", () => {
  it("enforces canonical employment while preserving unrelated CMS facts", () => {
    const content = sanitizeAbout({
      intro: "Professional introduction",
      facts: [
        { label: "Currently", value: "Aligned Tech" },
        { label: "Education", value: "Rafik Hariri University" },
      ],
    });
    expect(content.intro).toBe("Professional introduction");
    expect(content.facts).toEqual([
      {
        label: "Current role",
        value: "Senior AI Systems & Web Engineer | Technical Lead, Aachour Holding · Sep 2026 – Present",
      },
      { label: "Education", value: "Rafik Hariri University" },
    ]);
  });
});
