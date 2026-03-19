import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useBookingAction } from "../../../../hooks/booking/useBookingAction";
import type { Room } from "../../../../types/room.types";

interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface Props {
  onNext: () => void;
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
  // tạo biến riêng
  const fullName = customerInfo?.fullName;
  const email = customerInfo?.email;
  const phoneNumber = customerInfo?.phoneNumber;

  console.log("customerInfo", customerInfo);

  const { handleCreateBooking } = useBookingAction();

  const navigate = useNavigate();

  // xác nhận tạo booking mới
  const handleConfirmBooking = async () => {
    try {
      const booking = await handleCreateBooking(room._id, customerInfo);

      console.log("booking", booking);
      if (!booking) return;

      // chuyển sang trang payment
      navigate(`/payment/method/${booking._id}`);
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(message || "Lỗi đặt phòng");
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin lưu trú */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Thông tin lưu trú
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ngày nhận phòng</span>
                  <span className="font-bold">{checkInDate} (14:00)</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ngày trả phòng</span>
                  <span className="font-bold">{checkOutDate} (12:00)</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Số lượng phòng</span>
                  <span className="font-bold">01 Phòng</span>
                </div>
              </div>
            </div>

            {/* Thông tin liên hệ */}
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
                  alt=""
                />

                <div>
                  <div className="font-bold">{room.roomNumber}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center font-bold">
                  -
                </button>

                <span className="font-bold">01</span>

                <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center font-bold">
                  +
                </button>
              </div>
            </div>
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
