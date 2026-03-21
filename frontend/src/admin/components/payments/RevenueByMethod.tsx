import React, { useEffect, useState } from "react";
import type { RevenueByMethod } from "../../../types/payment.types";
import { getRevenueByMethod } from "../../../common/services/paymentService";

export const RevenueByMethod: React.FC = () => {
  const [data, setData] = useState<RevenueByMethod[]>([]);

  useEffect(() => {
    getRevenueByMethod().then(setData);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="font-bold text-lg mb-2">Doanh thu theo phương thức</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id} className="flex justify-between mb-1">
            <span>{item._id}</span>
            <span>
              {item.totalRevenue.toLocaleString()} VND ({item.count} giao dịch)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
