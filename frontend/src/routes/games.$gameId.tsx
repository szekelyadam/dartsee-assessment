import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlayerPerformanceCard } from "../components/PlayerPerformanceCard";
import type { GameDetails } from "../types";

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

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="pl-0 md:pl-12">
          <p className="text-primary font-bold tracking-widest text-[10px] uppercase mb-2">
            Game Details
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2">
            {data.type.toUpperCase()}
          </h1>
          <span className="inline-flex items-center px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant">
            #{data.id}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {data.players.map((player) => (
          <PlayerPerformanceCard key={player.id} player={player} />
        ))}
      </div>
    </>
  );
}
