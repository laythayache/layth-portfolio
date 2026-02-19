import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FAQSection from "@/components/sections/FAQSection";

describe("FAQSection", () => {
  it("toggles answers when a question is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQSection />);

    const firstButton = screen.getByRole("button", {
      name: /What kind of AI systems do you build\?/i,
    });

    expect(firstButton).toHaveAttribute("aria-expanded", "true");

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });
});
