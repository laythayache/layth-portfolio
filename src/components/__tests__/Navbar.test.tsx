import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Navbar from "../Navbar";

describe("homepage navigation", () => {
  it("exposes navigation before scrolling and opens About", async () => {
    render(<MemoryRouter><Navbar /><Routes><Route path="/" element={<p>Home content</p>} /><Route path="/about/" element={<h1>About Layth</h1>} /></Routes></MemoryRouter>);
    const nav = screen.getByRole("navigation", { name: "Navigation" });
    expect(nav).not.toHaveClass("pointer-events-none");
    expect(nav).not.toHaveClass("opacity-0");
    await userEvent.click(screen.getByRole("link", { name: "About" }));
    expect(screen.getByRole("heading", { name: "About Layth" })).toBeInTheDocument();
  });
});
