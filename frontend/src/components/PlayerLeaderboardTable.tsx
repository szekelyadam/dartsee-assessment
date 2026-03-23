import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getInitials, getRandomPlayerColor } from "../helpers";
import type { PlayerStat } from "../types";
import { PAGINATION_PAGE_SIZE } from "../consts";
import { useState } from "react";

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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGINATION_PAGE_SIZE,
  });
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
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
      <div className="bg-surface-container-low/30 flex items-center justify-between px-8 py-4">
        <span className="text-on-surface-variant text-sm">
          Showing {table.getState().pagination.pageIndex + 1} to{" "}
          {table.getState().pagination.pageIndex + PAGINATION_PAGE_SIZE} of{" "}
          {data.length} players
        </span>
        <div className="flex gap-2">
          <button
            className="bg-surface-container-high text-on-surface hover:bg-surface-container-highest rounded-lg px-4 py-2 text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              table.previousPage();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="bg-primary text-on-primary shadow-primary/10 rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              table.nextPage();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            disabled={!table.getCanNextPage()}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};
