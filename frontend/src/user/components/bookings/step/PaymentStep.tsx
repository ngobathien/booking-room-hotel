import React from "react";
import type { Room } from "../../../../types/room.types";
import { useNavigate } from "react-router";
import { createBooking } from "../../../../common/services/bookingService";
import { ArrowLeft, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { cn } from "../../../../lib/utils";

const PaymentStep = ({
  onBack,
  room,
  checkInDate,
  checkOutDate,
  nights,
}: {
  onBack: () => void;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
}) => {
  const [method, setMethod] = React.useState("card");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      await createBooking({
        roomId: room._id,
        roomName: room.roomNumber,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice: room.roomType.pricePerNight * nights,
        status: "upcoming",
        image: room.images[0],
      });
      alert("Đặt phòng thành công!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi đặt phòng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-8">Phương thức thanh toán</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { id: "card", label: "Thẻ tín dụng", icon: CreditCard },
            { id: "wallet", label: "Ví điện tử", icon: ShieldCheck },
            { id: "bank", label: "Chuyển khoản", icon: MapPin },
          ].map((m) => (
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
          onClick={onBack}
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
            : `Thanh toán ngay ${(room.roomType.pricePerNight * nights).toLocaleString()} VNĐ`}
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
