// components/common/StatCard.tsx

type StatCardProps = {
  icon?: React.ReactNode;
  value: number | string;
  label: string;
  color?: string;
  loading?: boolean;
};

export const StatCard = ({
  icon,
  value,
  label,
  color = "bg-blue-500",
  loading = false,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center text-center gap-3">
      {/* Icon */}
      <div className={`p-3 rounded-xl text-white ${color}`}>{icon}</div>

      {/* Value */}
      {loading ? (
        <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
      ) : (
        <h2 className="text-2xl font-bold">{value ?? 0}</h2>
      )}

      {/* Label */}
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};
