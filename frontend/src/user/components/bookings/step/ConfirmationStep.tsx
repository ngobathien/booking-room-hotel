import { ArrowLeft, CreditCard, Home, Info, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useBookingAction } from "../../../../hooks/booking/useBookingAction";
import { useBooking } from "../../../../hooks/booking/useBooking";

interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface Props {
  onBack: () => void;
  customerInfo: CustomerInfo;
}

const ConfirmationStep = ({ onBack, customerInfo }: Props) => {
  const navigate = useNavigate();

  // Lấy dữ liệu từ Context (Giỏ hàng và Ngày tháng)
  const { selectedRooms, checkInDate, checkOutDate, removeRoom } = useBooking();
  const { handleCreateBooking, loading } = useBookingAction();

  // Tính số đêm để hiển thị tổng tiền chính xác
  const calculateNights = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights(checkInDate, checkOutDate);
  const totalAmount = selectedRooms.reduce(
    (sum, room) => sum + room.roomType.pricePerNight * nights,
    0,
  );

  // Xử lý xác nhận đặt tất cả phòng trong giỏ
  const handleConfirmBooking = async () => {
    if (selectedRooms.length === 0) {
      toast.error("Giỏ hàng trống, vui lòng chọn phòng!");
      return;
    }

    try {
      const roomIds = selectedRooms.map((r) => r._id);
      const booking = await handleCreateBooking(roomIds, customerInfo);

      if (booking && booking._id) {
        navigate(`/payment/method/${booking._id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tạo đơn đặt phòng");
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
          <CreditCard className="text-primary" /> Xác nhận đơn đặt phòng
        </h3>

        {/* Cảnh báo giữ phòng */}
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm">
          <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-700">
              Lưu ý về thời gian thanh toán
            </p>
            <p className="text-amber-600 mt-1 leading-relaxed">
              Hệ thống sẽ giữ chỗ cho{" "}
              <span className="font-bold">{selectedRooms.length} phòng</span>{" "}
              này trong
              <span className="font-bold"> 10 phút</span>. Vui lòng hoàn tất
              thanh toán để đảm bảo giữ được phòng ưng ý.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cột trái: Thông tin khách hàng & Thời gian */}
          <div className="space-y-8">
            <section className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Lịch trình lưu trú
              </h4>
              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Nhận phòng
                  </p>
                  <p className="font-bold text-slate-700">{checkInDate}</p>
                  <p className="text-[10px] text-slate-500">Từ 14:00</p>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Trả phòng
                  </p>
                  <p className="font-bold text-slate-700">{checkOutDate}</p>
                  <p className="text-[10px] text-slate-500">Trước 12:00</p>
                </div>
              </div>
              <p className="text-center text-sm font-medium text-primary bg-primary/5 py-2 rounded-lg">
                Tổng cộng: {nights} đêm nghỉ
              </p>
            </section>

            <section className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Thông tin người đặt
              </h4>
              <div className="space-y-3 px-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Họ và tên:</span>
                  <span className="font-bold text-slate-800">
                    {customerInfo.fullName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-bold text-slate-800">
                    {customerInfo.email}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-bold text-slate-800">
                    {customerInfo.phoneNumber}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Cột phải: Danh sách phòng trong giỏ hàng */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Chi tiết phòng ({selectedRooms.length})
            </h4>
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {selectedRooms.map((room) => (
                <div
                  key={room._id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-primary/30 transition-all"
                >
                  <img
                    src={room.images?.[0]}
                    className="h-16 w-16 rounded-xl object-cover shrink-0"
                    alt={`Room ${room.roomNumber}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">
                      Phòng {room.roomNumber}
                    </p>
                    <p className="text-xs text-slate-500">
                      {room.roomType?.name || "Standard Room"}
                    </p>
                    <p className="text-xs font-bold text-primary mt-1">
                      {room.roomType?.pricePerNight.toLocaleString()}đ / đêm
                    </p>
                  </div>
                  <button
                    onClick={() => removeRoom(room._id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    title="Xóa phòng này"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Tổng tiền thanh toán */}
            <div className="mt-6 pt-6 border-t border-dashed border-slate-200">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-500">
                  Tổng tiền tạm tính:
                </span>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Thanh toán cuối cùng
                  </span>
                  <span className="text-2xl font-black text-primary">
                    {totalAmount.toLocaleString()}{" "}
                    <span className="text-sm">VNĐ</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-8 py-4 font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" /> Quay lại chỉnh sửa
        </button>

        <button
          onClick={handleConfirmBooking}
          disabled={loading || selectedRooms.length === 0}
          className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-primary px-12 py-4 font-black text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Đang khởi tạo đơn hàng...
            </span>
          ) : (
            <>
              Xác nhận & Thanh toán ngay <Home className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
