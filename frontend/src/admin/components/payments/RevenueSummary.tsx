import React, { useEffect, useState } from "react";
import { getTotalRevenue } from "../../../common/services/paymentService";
// import { getTotalRevenue } from "./api";

export const RevenueSummary: React.FC = () => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getTotalRevenue().then((res) => setTotal(res.totalRevenue));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="font-bold text-lg mb-2">Tổng doanh thu</h2>
      <p className="text-2xl font-semibold">{total.toLocaleString()} VND</p>
    </div>
  );
};
