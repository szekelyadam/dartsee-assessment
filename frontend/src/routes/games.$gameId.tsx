import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlayerPerformanceCard } from "../components/PlayerPerformanceCard";
import type { GameDetails } from "../types";
import { Hero } from "../components/Hero";
import { LoadingIndicator } from "../components/LoadingIndicator";

export const Route = createFileRoute("/games/$gameId")({
  component: GameDetails,
});

function GameDetails() {
  const { gameId } = Route.useParams();
  const { data, isPending, error } = useQuery<GameDetails>({
    queryKey: ["game", gameId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) return <LoadingIndicator />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Hero
        label="Game Details"
        title={data.type.toUpperCase()}
        description={`Game #${data.id}`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {data.players.map((player) => (
          <PlayerPerformanceCard key={player.id} player={player} />
        ))}
      </div>
    </>
  );
}
