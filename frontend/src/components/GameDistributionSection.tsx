import type { GameStatsRender } from "../types";
import { PieChart, Pie, Label, Tooltip } from "recharts";

export const GameDistributionSection = ({
  data,
}: {
  data: GameStatsRender;
}) => {
  const totalGamesLabel = `Total Games: ${data?.totalGames}`;

  return (
    <section className="bg-surface-container-lowest group relative w-full overflow-hidden rounded-xl p-8 shadow-sm md:p-12">
      <div className="flex flex-col items-center justify-between xl:flex-row">
        <div className="relative flex-shrink-0">
          <PieChart width={600} height={500}>
            <Pie
              data={data?.games}
              dataKey="count"
              nameKey="name"
              outerRadius="80%"
              innerRadius="60%"
              isAnimationActive={true}
            />
            <Label position="center" fill="#666">
              {totalGamesLabel}
            </Label>
            <Tooltip />
          </PieChart>
        </div>

        <div className="w-full max-w-lg flex-1 space-y-8">
          <div>
            <h3 className="text-on-surface mb-6 text-2xl font-semibold">
              Game Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {data?.games.map((game) => (
                <div
                  key={game.type}
                  className="group/item flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: game.fill }}
                    ></div>
                    <span className="text-on-surface-variant text-lg font-medium">
                      {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-on-surface text-lg font-bold">
                      {game.percentage.toFixed(2)}%
                    </span>
                    <span className="text-outline block text-sm">
                      {game.count} Games
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
