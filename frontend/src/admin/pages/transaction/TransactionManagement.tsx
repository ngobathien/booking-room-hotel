import React, { useEffect, useState } from "react";

interface Payment {
  _id: string;
  bookingId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

const TransactionManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fake API call demo
    setLoading(true);
    setTimeout(() => {
      setPayments([
        {
          _id: "1",
          bookingId: "B001",
          amount: 100,
          status: "completed",
          createdAt: "2026-03-20",
        },
        {
          _id: "2",
          bookingId: "B002",
          amount: 50,
          status: "pending",
          createdAt: "2026-03-21",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="p-6">Đang tải giao dịch...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Quản lý Giao dịch</h2>
      <table className="w-full border-collapse border border-slate-200">
        <thead>
          <tr className="bg-slate-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Booking</th>
            <th className="border px-4 py-2">Số tiền</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border px-4 py-2">{p._id}</td>
              <td className="border px-4 py-2">{p.bookingId}</td>
              <td className="border px-4 py-2">{p.amount}</td>
              <td className="border px-4 py-2">{p.status}</td>
              <td className="border px-4 py-2">{p.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionManagement;
