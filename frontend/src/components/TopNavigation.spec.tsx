import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TopNavigation } from "./TopNavigation";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("TopNavigation", () => {
  it("renders all three navigation links", () => {
    render(<TopNavigation />);

    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });

  it("renders links pointing to the correct paths", () => {
    render(<TopNavigation />);

    expect(screen.getByText("Games").closest("a")).toHaveAttribute(
      "href",
      "/games",
    );
    expect(screen.getByText("Analytics").closest("a")).toHaveAttribute(
      "href",
      "/analytics",
    );
    expect(screen.getByText("Leaderboard").closest("a")).toHaveAttribute(
      "href",
      "/players/leaderboard",
    );
  });

  it("renders a nav element", () => {
    render(<TopNavigation />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
