import { BedDouble, Calendar, DollarSign, Star, Users } from "lucide-react";
import { useDashboard } from "../../../hooks/dashboard/useDashboard";
import { StatCard } from "../../components/commons/StatCard";

const DashboardPage = () => {
  const { data, loading } = useDashboard();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Overview */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={BedDouble}
          value={data?.rooms?.total}
          label="Total Rooms"
          color="blue"
        />
        <StatCard
          icon={BedDouble}
          value={data?.rooms?.available}
          label="Available"
          color="emerald"
        />
        <StatCard
          icon={BedDouble}
          value={data?.rooms?.occupied}
          label="Occupied"
          color="amber"
        />
        <StatCard
          icon={BedDouble}
          value={data?.rooms?.maintenance}
          label="Maintenance"
          color="rose"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Calendar}
          value={data?.bookings?.total}
          label="Total Bookings"
          color="blue"
        />
        <StatCard
          icon={Calendar}
          value={data?.bookings?.today}
          label="Today Bookings"
          color="emerald"
        />
        <StatCard
          icon={DollarSign}
          value={data?.revenue?.total}
          label="Revenue"
          color="amber"
        />
        <StatCard
          icon={DollarSign}
          value={data?.revenue?.today}
          label="Today Revenue"
          color="rose"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          value={data?.users?.total}
          label="Users"
          color="slate"
        />
        <StatCard
          icon={Users}
          value={data?.users?.newToday}
          label="New Users Today"
          color="rose"
        />
        <StatCard
          icon={Star}
          value={data?.reviews?.avgRating}
          label="Avg Rating"
          color="amber"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
