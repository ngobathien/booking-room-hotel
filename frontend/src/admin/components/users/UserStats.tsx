import React from "react";
import { StatCard } from "../commons/StatCard";

import { User as UserIcon, Shield, Users as UsersIcon } from "lucide-react";
import type { User } from "../../../types/user.types";

type UserStatsProps = {
  users: User[] | null; // mảng user object
};

const UserStats = ({ users }: UserStatsProps) => {
  if (!users) return null;

  // Tính tổng số user
  const total = users.length;

  // Tính số user theo role
  const roleCounts: Record<string, number> = {};
  users.forEach((u) => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
  });

  const stats = { total, ...roleCounts };

  const colorMap: Record<
    string,
    "blue" | "emerald" | "amber" | "rose" | "slate"
  > = {
    total: "slate",
    ADMIN: "rose",
    USER: "blue",
  };

  const iconMap: Record<string, React.ElementType> = {
    total: UsersIcon,
    ADMIN: Shield,
    USER: UserIcon,
  };

  const labelMap: Record<string, string> = {
    total: "Tổng user",
    ADMIN: "Admin",
    USER: "Người dùng",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {Object.entries(stats).map(([key, value]) => (
        <StatCard
          key={key}
          label={labelMap[key] ?? key}
          value={value} // ✅ đây là number
          color={colorMap[key] ?? "slate"}
          icon={iconMap[key]}
        />
      ))}
    </div>
  );
};

export default UserStats;
