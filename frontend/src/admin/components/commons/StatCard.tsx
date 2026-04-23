import React from "react";
import { cn } from "../../../lib/utils";

type StatCardProps = {
  label?: string;
  value?: number | string;
  icon?: React.ElementType;
  color?: "blue" | "emerald" | "amber" | "rose" | "slate";
  iconBgClass?: string;
  iconColorClass?: string;
  loading?: boolean;
};

export const StatCard = ({
  label = "No Label",
  value = 0,
  icon: Icon,
  color = "blue",
  iconBgClass,
  iconColorClass,
  loading = false,
}: StatCardProps) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      {Icon && (
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
            iconBgClass || colors[color],
            loading ? "animate-pulse" : "",
          )}
        >
          {!loading && <Icon className={cn("w-5 h-5", iconColorClass)} />}
        </div>
      )}

      <p
        className={cn(
          "text-slate-500 text-xs font-semibold uppercase tracking-wider",
          loading ? "bg-slate-200 rounded h-3 w-16 animate-pulse mb-1" : "",
        )}
      >
        {!loading && label}
      </p>

      <p
        className={cn(
          "text-xl font-bold text-slate-900 mt-1",
          loading ? "bg-slate-200 rounded h-6 w-16 animate-pulse" : "",
        )}
      >
        {!loading && value}
      </p>
    </div>
  );
};
