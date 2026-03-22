import { getInitials, getRandomPlayerColor } from "../helpers";
import type { PlayerPerformance } from "../types";

export const PlayerPerformanceCard = ({
  player,
}: {
  player: PlayerPerformance;
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/15 flex flex-col gap-6 group hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-1">
            {player.name}
          </h2>
        </div>
        <div
          className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-[16px] font-bold ${getRandomPlayerColor()}`}
        >
          {getInitials(player.name)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-4 rounded-lg">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">
            Avg. Score Per Round
          </p>
          <p className="text-3xl font-extrabold text-primary">
            {player.averageScorePerRound}
          </p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-lg">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">
            Misses
          </p>
          <p className="text-3xl font-extrabold text-on-surface">
            {player.missCount}
          </p>
        </div>
      </div>
    </div>
  );
};
