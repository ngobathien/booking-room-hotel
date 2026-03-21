import React, { useMemo } from "react";
import { Banknote, CheckCircle2, Clock, ArrowRightLeft } from "lucide-react";

interface TransactionStatsProps {
  transactions: Transaction[];
}

const TransactionStats: React.FC<TransactionStatsProps> = ({
  transactions,
}) => {
  const stats = useMemo(() => {
    const totalRevenue = transactions
      .filter((tx) => tx.status === "Success")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const successCount = transactions.filter(
      (tx) => tx.status === "Success",
    ).length;
    const pendingCount = transactions.filter(
      (tx) => tx.status === "Pending",
    ).length;
    const refundedCount = transactions.filter(
      (tx) => tx.status === "Refunded",
    ).length;

    return {
      totalRevenue: (totalRevenue / 1000000).toFixed(1) + "M",
      successCount,
      pendingCount,
      refundedCount,
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        icon={Banknote}
        label="Tổng doanh thu"
        value={stats.totalRevenue}
        iconBgClass="bg-emerald-50"
        iconColorClass="text-emerald-600"
      />
      <StatCard
        icon={CheckCircle2}
        label="Thành công"
        value={stats.successCount}
        iconBgClass="bg-blue-50"
        iconColorClass="text-blue-600"
      />
      <StatCard
        icon={Clock}
        label="Chờ xử lý"
        value={stats.pendingCount}
        iconBgClass="bg-amber-50"
        iconColorClass="text-amber-600"
      />
      <StatCard
        icon={ArrowRightLeft}
        label="Hoàn tiền"
        value={stats.refundedCount}
        iconBgClass="bg-rose-50"
        iconColorClass="text-rose-600"
      />
    </div>
  );
};

export default TransactionStats;
