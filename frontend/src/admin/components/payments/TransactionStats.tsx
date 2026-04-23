// import React, { useMemo } from "react";
// import { Banknote, CheckCircle2, Clock, XCircle } from "lucide-react";
// import { StatCard } from "../commons/StatCard";
// import type { Payment } from "../../../types/payment.types";

// interface Props {
//   payments: Payment[];
// }

// const PaymentStats: React.FC<Props> = ({ payments }) => {
//   const stats = useMemo(() => {
//     const totalRevenue = payments
//       .filter((p) => p.status === "SUCCESS")
//       .reduce((sum, p) => sum + p.amount, 0);

//     return {
//       totalRevenue: (totalRevenue / 1_000_000).toFixed(1) + "M",
//       success: payments.filter((p) => p.status === "SUCCESS").length,
//       pending: payments.filter((p) => p.status === "PENDING").length,
//       failed: payments.filter(
//         (p) => p.status === "FAILED" || p.status === "EXPIRED",
//       ).length,
//     };
//   }, [payments]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       <StatCard
//         icon={Banknote}
//         label="Doanh thu"
//         value={stats.totalRevenue}
//         color="emerald"
//       />
//       <StatCard
//         icon={CheckCircle2}
//         label="Thành công"
//         value={stats.success}
//         color="blue"
//       />
//       <StatCard
//         icon={Clock}
//         label="Chờ xử lý"
//         value={stats.pending}
//         color="amber"
//       />
//       <StatCard
//         icon={XCircle}
//         label="Thất bại"
//         value={stats.failed}
//         color="rose"
//       />
//     </div>
//   );
// };

// export default PaymentStats;
