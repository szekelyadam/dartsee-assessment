import { getInitials, getRandomPlayerColor } from "../helpers.ts";
import type { GameLog } from "../types.ts";

export const GameSummaryCard = ({
  game,
  theme,
}: {
  game: GameLog;
  theme: string;
}) => {
  return (
    <div
      key={game.id}
      className="group cursor-pointer bg-surface-container-lowest p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] border border-transparent hover:border-primary/10"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
            Game Session
          </span>
          <h3 className="text-xl font-bold font-headline text-on-surface">
            #{game.id}
          </h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-[11px] font-bold ${theme}`}
        >
          {game.type}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-outline text-lg">
            groups
          </span>
          <div className="flex -space-x-2">
            {game.players.map((player, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${getRandomPlayerColor()}`}
              >
                {getInitials(player)}
              </div>
            ))}
          </div>
          <span className="text-xs font-semibold text-on-surface-variant">
            {game.players.slice(0, 2).join(", ")}
            {game.players.length > 2 && ` +${game.players.length - 2}`}
          </span>
        </div>
        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
            Details Available
          </span>
          <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
};
