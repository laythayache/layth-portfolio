import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import CreativePortfolio from "./CreativePortfolio";

describe("professional portfolio interactions", () => {
  it("supports employer switching by keyboard and preserves employment dates", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><CreativePortfolio /></MemoryRouter>);
    const currentRole = screen.getByRole("tab", { name: /Aachour Holding/ });
    await user.click(currentRole);
    await user.keyboard("{ArrowDown}");
    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText("November 2025 — August 2026")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Aligned Tech/ })).toHaveAttribute("aria-selected", "true");
  });

  it("opens a capability and links to the corresponding real project", async () => {
    render(<MemoryRouter><CreativePortfolio /></MemoryRouter>);
    await userEvent.click(screen.getByRole("button", { name: /Data collection & pipelines/ }));
    expect(screen.getAllByRole("link", { name: /Explore Daleel/ }).some(link => link.getAttribute("href") === "/projects/daleel/")).toBe(true);
    expect(screen.getByText("Web scraping & information gathering")).toBeInTheDocument();
  });

  it("has accessible tabs, accordions, contact disclosure and project links", async () => {
    const { container } = render(<MemoryRouter><CreativePortfolio /></MemoryRouter>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
