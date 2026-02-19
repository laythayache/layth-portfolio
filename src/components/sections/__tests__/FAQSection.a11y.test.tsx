import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import FAQSection from "@/components/sections/FAQSection";

describe("FAQSection accessibility", () => {
  it("has no detectable accessibility violations", async () => {
    const { container } = render(<FAQSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
