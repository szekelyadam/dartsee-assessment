import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game-logs")({
  component: GameLogs,
});

function GameLogs() {
  return (
    <div className="p-2">
      <h3>Game Logs</h3>
    </div>
  );
}
