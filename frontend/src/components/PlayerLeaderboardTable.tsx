import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getInitials, getRandomPlayerColor } from "../helpers";
import type { PlayerStat } from "../types";

const columns = [
  {
    accessorKey: "name",
    header: "Player Name",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-[16px] font-bold ${getRandomPlayerColor()}`}
        >
          {getInitials(row.original.name)}
        </div>
        <span className="text-on-surface font-semibold">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "averageScorePerRound",
    header: "Avg Score per Round",
    cell: ({ row }: any) => (
      <span className="text-primary font-mono font-medium">
        {row.original.averageScorePerRound}
      </span>
    ),
  },
  {
    accessorKey: "missesPerGame",
    header: "Misses per Game",
  },
  {
    accessorKey: "gamesPlayed",
    header: "Games Played",
  },
];

export const PlayerLeaderboardTable = ({ data }: { data: PlayerStat[] }) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="bg-surface-container-low/50" key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`text-on-surface-variant px-8 py-5 text-xs font-bold tracking-widest uppercase ${
                    index === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-surface-container divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="group hover:bg-surface-container-low transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-8 py-6 text-on-surface-variant text-right font-mono"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
