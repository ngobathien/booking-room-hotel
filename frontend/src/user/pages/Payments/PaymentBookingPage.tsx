import React from "react";

import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { cn } from "../../../lib/utils";
import { usePaymentAction } from "../../../hooks/payment/usePaymentAction";
import { toast } from "react-toastify";
import { useBooking } from "../../../hooks/booking/useBooking";

export const PaymentBookingPage = () => {
  const [method, setMethod] = React.useState("vnpay");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { currentBooking } = useBooking();

  const { handleCreatePayment } = usePaymentAction();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!bookingId) return;
    setIsSubmitting(true);

    try {
      const res = await handleCreatePayment(bookingId, method);

      // VNPAY / MOMO
      if (res?.paymentUrl) {
        window.location.href = res.paymentUrl;
        return;
      }

      // COD
      navigate("/payment/result?status=success");
    } catch (error: any) {
      const message = error.response?.data?.message;
      console.log(error.response?.data);

      toast.error(message || "Có lỗi xảy ra khi thanh toán");
    } finally {
      setIsSubmitting(false);
    }
  };
  const methods = [
    { id: "vnpay", label: "Thanh toán VNPay", icon: CreditCard },
    { id: "momo", label: "Ví MoMo", icon: ShieldCheck },
    { id: "cod", label: "Thanh toán tại khách sạn", icon: MapPin },
  ];
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-8">Phương thức thanh toán</h3>

        {/* chọn phương thức */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all",
                method === m.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-100 hover:border-primary/50",
              )}
            >
              <m.icon className="h-8 w-8" />
              <span className="text-sm font-bold">{m.label}</span>
            </button>
          ))}
        </div>

        {method === "card" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Số thẻ
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full rounded-xl border-slate-100 bg-slate-50 p-4 text-sm focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Ngày hết hạn
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full rounded-xl border-slate-100 bg-slate-50 p-4 text-sm focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="***"
                  className="w-full rounded-xl border-slate-100 bg-slate-50 p-4 text-sm focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tên chủ thẻ
              </label>
              <input
                type="text"
                placeholder="NGUYEN VAN A"
                className="w-full rounded-xl border-slate-100 bg-slate-50 p-4 text-sm focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-8 py-4 font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" /> Quay lại
        </button>
        <button
          onClick={handlePayment}
          disabled={isSubmitting}
          className="flex-1 rounded-2xl bg-primary px-12 py-4 font-black text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? "Đang xử lý..."
            : `Thanh toán ngay ${currentBooking?.totalPrice.toLocaleString()} VNĐ`}
          $
        </button>
      </div>
    </div>
  );
};
