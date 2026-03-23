import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { GameStatsRender } from "../types";
import { GameDistributionSection } from "../components/GameDistributionSection";
import { CHART_COLORS } from "../consts";
import { Hero } from "../components/Hero";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  const { data, isPending, error } = useQuery<GameStatsRender>({
    queryKey: ["gameStats"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/games/popularity`,
      );
      const response = await res.json();
      response.games = response.games.map((game: any, index: number) => {
        const capitalizedType =
          game.type.charAt(0).toUpperCase() + game.type.slice(1);

        return {
          ...game,
          type: capitalizedType,
          fill: CHART_COLORS[index % CHART_COLORS.length],
          name: `${capitalizedType} (${game.percentage.toFixed(2)}%)`,
        };
      });
      return response;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Hero
        label="Global Insights"
        title="Game Popularity"
        description="Explore the global distribution of game variants across all recorded matches. Gain high-level insights into the most widely played game types on the platform."
      />

      <div className="flex flex-col items-center">
        <GameDistributionSection data={data} />
      </div>
    </>
  );
}
