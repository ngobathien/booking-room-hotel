import React from "react";
import type { BookingStats } from "../../../types/booking.types";

type Props = {
  stats: BookingStats;
};

const STATUS_COLORS: Record<keyof BookingStats, string> = {
  total: "bg-slate-200 text-slate-800",
  confirmed: "bg-green-200 text-green-800",
  pending: "bg-yellow-200 text-yellow-800",
  cancelled: "bg-red-200 text-red-800",
  completed: "bg-blue-200 text-blue-800",
};

export default function BookingStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Object.entries(stats).map(([key, value]) => (
        <div
          key={key}
          className={`p-4 rounded-md flex flex-col items-center justify-center ${STATUS_COLORS[key as keyof BookingStats]}`}
        >
          <span className="text-sm font-medium capitalize">{key}</span>
          <span className="text-xl font-bold">{value}</span>
        </div>
      ))}
    </div>
  );
}
