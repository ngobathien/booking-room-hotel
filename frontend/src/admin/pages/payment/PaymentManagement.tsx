import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Calendar,
  User as UserIcon,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type {
  AdminQueryPaymentParams,
  Payment,
  PaymentListResponse,
} from "../../../types/payment.types";
import {
  getPayments,
  getTotalRevenue,
} from "../../../common/services/paymentService";

// Helper for conditional classes
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({
    PENDING: 0,
    SUCCESS: 0,
    FAILED: 0,
    EXPIRED: 0,
  });

  // Filters & Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [methodFilter, setMethodFilter] = useState<string>("ALL");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params: AdminQueryPaymentParams = {
        page,
        limit,
        ...(statusFilter !== "ALL" && { status: statusFilter }),
        // Giả sử API hỗ trợ search và method filter
        // keyword: searchTerm,
        // method: methodFilter
      };

      const res: PaymentListResponse = await getPayments(params);
      setPayments(res.payments);

      // Tính toán counts từ dữ liệu trả về (hoặc API có thể trả về riêng)
      const counts: Record<string, number> = {
        PENDING: 0,
        SUCCESS: 0,
        FAILED: 0,
        EXPIRED: 0,
      };
      res.payments.forEach((p) => {
        counts[p.status] = (counts[p.status] || 0) + 1;
      });
      setStatusCounts(counts);
    } catch (err) {
      console.error("Fetch payments error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenue = async () => {
    try {
      const totalRes = await getTotalRevenue();
      setTotalRevenue(totalRes.totalRevenue);
    } catch (err) {
      console.error("Fetch revenue error:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchRevenue();
  }, [page, statusFilter]);

  // Client-side search filter (nếu API không hỗ trợ search trực tiếp)
  const filteredPayments = useMemo(() => {
    return payments.filter(
      (p) =>
        p.booking?.bookingCode
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        p.booking?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p._id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [payments, searchTerm]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "FAILED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "EXPIRED":
        return "bg-slate-50 text-slate-600 border-slate-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "PENDING":
        return <Clock className="w-3.5 h-3.5" />;
      case "FAILED":
        return <AlertCircle className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Quản lý Thanh toán
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Theo dõi và quản lý các giao dịch tài chính của hệ thống.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm active:scale-95">
          <Download className="w-4 h-4" />
          <span>Xuất báo cáo CSV</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Tổng doanh thu"
          value={`${totalRevenue.toLocaleString()} đ`}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          label="Thành công"
          value={statusCounts.SUCCESS}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          label="Đang chờ"
          value={statusCounts.PENDING}
          icon={Clock}
          color="amber"
        />
        <StatCard
          label="Thất bại"
          value={statusCounts.FAILED}
          icon={AlertCircle}
          color="rose"
        />
        <StatCard
          label="Hết hạn"
          value={statusCounts.EXPIRED || 0}
          icon={Clock}
          color="slate"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo mã booking, tên khách hàng..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              className="bg-transparent py-1.5 text-sm font-medium text-slate-700 outline-none min-w-[120px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="SUCCESS">Thành công</option>
              <option value="PENDING">Đang chờ</option>
              <option value="FAILED">Thất bại</option>
              <option value="EXPIRED">Hết hạn</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <select
              className="bg-transparent py-1.5 text-sm font-medium text-slate-700 outline-none min-w-[120px]"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="ALL">Phương thức</option>
              <option value="VNPAY">VNPAY</option>
              <option value="CASH">Tiền mặt</option>
              <option value="STRIPE">Stripe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3 h-3" /> Giao dịch
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Booking
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-3 h-3" /> Khách hàng
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Số tiền
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="wait">
                {loading ? (
                  <LoadingRows />
                ) : filteredPayments.length === 0 ? (
                  <EmptyState />
                ) : (
                  filteredPayments.map((payment, idx) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-400 group-hover:text-blue-500 transition-colors">
                          #{payment._id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-700">
                          {payment.booking?.bookingCode || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {payment.booking?.fullName}
                        </div>
                        <div className="text-xs text-slate-400">
                          {payment.booking?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-slate-900">
                          {payment.amount.toLocaleString()} đ
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          {payment.method === "CASH" ? (
                            <Wallet className="w-4 h-4" />
                          ) : (
                            <CreditCard className="w-4 h-4" />
                          )}
                          {payment.method}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                            getStatusStyles(payment.status),
                          )}
                        >
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">
                          {new Date(payment.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
        <p className="text-sm text-slate-500">
          Hiển thị{" "}
          <span className="font-semibold text-slate-900">
            {filteredPayments.length}
          </span>{" "}
          giao dịch
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-2 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            disabled={page <= 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
            Trang {page}
          </div>
          <button
            className="p-2 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            disabled={payments.length < limit || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatCard = ({ label, value, icon: Icon, color }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
          colors[color],
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
};

const LoadingRows = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        {[...Array(7)].map((_, j) => (
          <td key={j} className="px-6 py-6">
            <div className="h-4 bg-slate-100 rounded w-full"></div>
          </td>
        ))}
      </tr>
    ))}
  </>
);

const EmptyState = () => (
  <tr>
    <td colSpan={7} className="px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
          <Search className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-slate-400 font-medium">
          Không tìm thấy giao dịch nào phù hợp
        </p>
      </div>
    </td>
  </tr>
);

export default PaymentManagement;
