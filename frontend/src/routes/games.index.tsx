import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { GameSummaryCard } from "../components/GameSummaryCard";
import { getLabelThemeClasses } from "../helpers";
import { useQuery } from "@tanstack/react-query";
import type { GameLog } from "../types";
import { useMemo } from "react";

export const Route = createFileRoute("/games/")({
  component: Games,
});

function Games() {
  const { data, isPending, error } = useQuery<GameLog[]>({
    queryKey: ["games"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/games`).then((res) => res.json()),
  });

  const uniqueGameTypes = useMemo(
    () => data && Array.from(new Set(data.map((game) => game.type))),
    [data],
  );

  return (
    <>
      <Hero
        title="Game History"
        description="Browse and analyze the complete archive of recorded matches, game types, and key player statistics."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data &&
          data.map((game) => (
            <GameSummaryCard
              key={game.id}
              game={game}
              theme={
                uniqueGameTypes &&
                getLabelThemeClasses(uniqueGameTypes.indexOf(game.type))
              }
            />
          ))}
      </div>
    </>
  );
}
