import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useBookingAction } from "../../../../hooks/booking/useBookingAction";
import type { Room } from "../../../../types/room.types";
import { formatDateDDMMYY } from "../../../../utils/formatDateVN";
import { formatVND } from "../../../../lib/utils";

interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface Props {
  onBack: () => void;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  customerInfo: CustomerInfo;
}

const ConfirmationStep = ({
  onBack,
  room,
  checkInDate,
  checkOutDate,
  customerInfo,
}: Props) => {
  const { fullName, email, phoneNumber } = customerInfo;

  const { handleCreateBooking } = useBookingAction();
  const navigate = useNavigate();

  // Xác nhận tạo booking
  const handleConfirmBooking = async () => {
    try {
      const booking = await handleCreateBooking(room._id, customerInfo);
      if (!booking) return;

      navigate(`/payment/method/${booking._id}`);
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(message || "Lỗi đặt phòng");
    }
  };

  // Tính số đêm giữa checkIn và checkOut
  const nights = (() => {
    const ci = new Date(checkInDate);
    const co = new Date(checkOutDate);
    const diff = Math.ceil(
      (co.getTime() - ci.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 1;
  })();

  const totalPrice = room.roomType.pricePerNight * nights;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-8">Xác nhận thông tin</h3>

        {/* Alert lưu ý */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="text-amber-500 text-lg">⚠️</div>
          <div>
            <p className="font-bold text-amber-700">Lưu ý quan trọng</p>
            <p className="text-amber-600 mt-1">
              Thời gian giữ phòng tối đa là{" "}
              <span className="font-bold">10 phút</span>. Sau thời gian này nếu
              chưa thanh toán, phòng sẽ tự động được mở lại cho khách khác.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Thông tin lưu trú & liên hệ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Thông tin lưu trú
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ngày nhận phòng</span>
                  <span className="font-bold">
                    {formatDateDDMMYY(checkInDate)} (14:00)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ngày trả phòng</span>
                  <span className="font-bold">
                    {formatDateDDMMYY(checkOutDate)} (12:00)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Số lượng phòng</span>
                  <span className="font-bold">01 Phòng</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Thông tin liên hệ
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Họ tên</span>
                  <span className="font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Email</span>
                  <span className="font-bold">{email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Số điện thoại</span>
                  <span className="font-bold">{phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phòng đã chọn */}
          <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
            <h4 className="text-sm font-bold text-primary mb-4">
              Phòng đã chọn
            </h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={room.images?.[0]}
                  className="h-16 w-16 rounded-lg object-cover"
                  alt={room.roomNumber}
                />
                <div>
                  <div className="font-bold">{room.roomNumber}</div>
                  {/* <div className="text-[10px] text-slate-500">
                    {room.bedType} • {room.view}
                  </div> */}
                  <div className="text-[10px] text-slate-400 mt-1">
                    {nights} đêm x {formatVND(room.roomType.pricePerNight)} /
                    đêm
                  </div>
                </div>
              </div>
              <div className="text-right font-bold text-primary">
                {formatVND(totalPrice)}
              </div>
            </div>
          </div>

          {/* Trust info */}
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <p className="text-[10px] text-slate-500 font-medium">
              Đảm bảo giá tốt nhất & Thanh toán an toàn
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-8 py-4 font-bold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5" /> Quay lại
        </button>

        <button
          onClick={handleConfirmBooking}
          className="flex-1 rounded-2xl bg-primary px-12 py-4 font-black text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700"
        >
          Tiếp tục thanh toán
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
