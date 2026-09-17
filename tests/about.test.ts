import { describe, expect, it } from "vitest";
import { sanitizeAbout } from "../functions/api/_about";

describe("About content", () => {
  it("corrects the known former employer without replacing custom CMS content", () => {
    const content = sanitizeAbout({ intro: "My custom story", facts: [{ label: "Currently", value: "Aligned Tech" }, { label: "Currently", value: "My new team" }] });
    expect(content.intro).toBe("My custom story");
    expect(content.facts).toEqual([{ label: "Previous role", value: "Aligned Tech · Nov 2025 – Aug 2026" }, { label: "Currently", value: "My new team" }]);
  });
});
