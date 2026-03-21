import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { GameSummaryCard } from "../components/GameSummaryCard";
import { getLabelThemeClasses } from "../helpers";

export const Route = createFileRoute("/game-logs")({
  component: GameLogs,
});

const data = [
  { id: 1, type: "501 Double Out", players: ['Alex "Eagle" V.', "Taylor B."] },
  { id: 2, type: "Cricket", players: ["John D.", "Kevin L."] },
  { id: 3, type: "301 Straight", players: ["Taylor B."] },
  { id: 4, type: "501 Double Out", players: ['Alex "Eagle" V.', "Taylor B."] },
  { id: 5, type: "Cricket", players: ["John D.", "Kevin L.", "Frodo"] },
  { id: 6, type: "301 Straight", players: ['Alex "Eagle" V.', "Taylor B."] },
  { id: 7, type: "501 Double Out", players: ['Alex "Eagle" V.', "Taylor B."] },
  { id: 8, type: "Cricket", players: ["John D.", "Kevin L."] },
  { id: 9, type: "301 Straight", players: ['Alex "Eagle" V.', "Taylor B."] },
  { id: 10, type: "501 Double Out", players: ['Alex "Eagle" V.', "Taylor B."] },
  { id: 11, type: "Cricket", players: ["John D.", "Kevin L."] },
  { id: 12, type: "301 Straight", players: ['Alex "Eagle" V.', "Taylor B."] },
];

export const uniqueGameTypes = Array.from(
  new Set(data.map((game) => game.type)),
);

function GameLogs() {
  return (
    <>
      <Hero
        title="Game History"
        description="Browse and analyze the complete archive of recorded matches, game types, and key player statistics."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((game) => (
          <GameSummaryCard
            key={game.id}
            game={game}
            theme={getLabelThemeClasses(uniqueGameTypes.indexOf(game.type))}
          />
        ))}
      </div>
    </>
  );
}
