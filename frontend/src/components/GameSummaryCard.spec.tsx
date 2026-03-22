import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GameSummaryCard } from "./GameSummaryCard";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

const mockGame = {
  id: 1,
  type: "501 Double Out",
  players: [
    { id: "1", name: 'Alex "Eagle" V.' },
    { id: "2", name: "Taylor B." },
  ],
};

describe("GameSummaryCard Component", () => {
  it("should render detailed game summary parameters out correctly into the DOM", () => {
    render(
      <GameSummaryCard
        game={mockGame}
        theme="bg-emerald-100 text-emerald-700 border-emerald-200"
      />,
    );

    expect(screen.getByText("#1")).toBeInTheDocument();

    // The component applies .toUpperCase() to the type String
    expect(screen.getByText("501 DOUBLE OUT")).toBeInTheDocument();

    // The component slices and joins the players array mapping player strings explicitly
    expect(screen.getByText('Alex "Eagle" V., Taylor B.')).toBeInTheDocument();
  });
});
