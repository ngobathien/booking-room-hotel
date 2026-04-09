import { Line } from "react-chartjs-2";

export const RevenueChart = ({ data }: any) => {
  const chartData = {
    labels: data.map((i: any) => i._id),
    datasets: [
      {
        label: "Revenue",
        data: data.map((i: any) => i.revenue),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-[320px]">
      <h2 className="font-semibold mb-3">Revenue</h2>
      <Line data={chartData} />
    </div>
  );
};
