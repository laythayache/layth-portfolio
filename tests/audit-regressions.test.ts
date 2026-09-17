import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { projects } from "../src/content/projects";
import { speakingEntries } from "../src/content/speaking";

describe("live audit regressions", () => {
  it("does not publish known dead external links", () => {
    const omniSign = projects.find((project) => project.slug === "omnisign");

    expect(omniSign?.links?.repo).toBeUndefined();
    expect(speakingEntries.some((entry) => entry.link?.includes("sessionize.com"))).toBe(false);
  });

  it.each([
    "public/diagrams/omnisign-architecture.svg",
    "public/diagrams/pub-info-architecture.svg",
  ])("keeps %s valid XML", (path) => {
    const source = readFileSync(path, "utf8");
    const document = new DOMParser().parseFromString(source, "image/svg+xml");

    expect(document.querySelector("parsererror")).toBeNull();
    expect(document.documentElement.tagName).toBe("svg");
  });
});
