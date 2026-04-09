import { Bar } from "react-chartjs-2";

export const BookingChart = ({ data }: any) => {
  const chartData = {
    labels: data.map((i: any) => i._id),
    datasets: [
      {
        label: "Bookings",
        data: data.map((i: any) => i.bookings),
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-[320px]">
      <h2 className="font-semibold mb-3">Bookings</h2>
      <Bar data={chartData} />
    </div>
  );
};
