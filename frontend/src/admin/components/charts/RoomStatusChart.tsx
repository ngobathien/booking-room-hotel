import { Pie } from "react-chartjs-2";

export const RoomStatusChart = ({ data }: any) => {
  const chartData = {
    labels: ["Trống", "Đang sử dụng", "Đã đặt", "Bảo trì"],
    datasets: [
      {
        data: [
          data.rooms.available,
          data.rooms.occupied,
          data.rooms.booked,
          data.rooms.maintenance,
        ],
        backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full max-w-md mx-auto h-[280px]">
      <h2 className="font-semibold mb-3 text-center">Trạng thái phòng</h2>

      {/* 👇 FIX SIZE */}
      <div className="h-[260px] flex items-center justify-center">
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};
