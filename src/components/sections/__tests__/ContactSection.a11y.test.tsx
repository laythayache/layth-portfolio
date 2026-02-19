import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import ContactSection from "@/components/sections/ContactSection";

describe("ContactSection accessibility", () => {
  it("has no detectable accessibility violations", async () => {
    const { container } = render(<ContactSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
