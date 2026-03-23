import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import type { PlayerStat } from "../types";
import { PlayerLeaderboardTable } from "../components/PlayerLeaderboardTable";

export const Route = createFileRoute("/players/leaderboard")({
  component: Leaderboard,
});

function Leaderboard() {
  const { data, isPending, error } = useQuery<PlayerStat[]>({
    queryKey: ["leaderboard"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/players/leaderboard`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Hero
        title="Leaderboard"
        description="View the top players based on their performance in recorded matches."
      />
      <div className="bg-surface-container-lowest border-outline-variant/15 overflow-hidden rounded-xl border shadow-[0_4px_20px_0_rgba(0,0,0,0.05)]">
        <PlayerLeaderboardTable data={data || []} />
      </div>
    </>
  );
}
