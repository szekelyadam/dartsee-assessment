import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GameDistributionSection } from "./GameDistributionSection";
import type { GameStatsRender } from "../types";

// Recharts sometimes creates warnings in jsdom about ResizeObserver or missing width/height
// We can mock the specific components that cause issues if needed, but standard rendering should be fine.
vi.mock("recharts", async () => {
  const actual = await vi.importActual("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});

const mockData: GameStatsRender = {
  totalGames: 100,
  games: [
    {
      type: "501",
      count: 70,
      percentage: 70,
      name: "501 (70.00%)",
      fill: "#5E5CE6",
    },
    {
      type: "cricket",
      count: 30,
      percentage: 30,
      name: "Cricket (30.00%)",
      fill: "#7C7AF7",
    },
  ],
};

describe("GameDistributionSection", () => {
  it("renders distribution data properly into the legend", () => {
    // Suppress console error regarding recharts defaultProps warning in React 18+ if any
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<GameDistributionSection data={mockData} />);

    // Legend item titles (capitalized according to logic)
    expect(screen.getByText("501")).toBeInTheDocument();
    expect(screen.getByText("Cricket")).toBeInTheDocument();

    // Percentages
    expect(screen.getByText("70.00%")).toBeInTheDocument();
    expect(screen.getByText("30.00%")).toBeInTheDocument();

    // Counts
    expect(screen.getByText("70 Games")).toBeInTheDocument();
    expect(screen.getByText("30 Games")).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
