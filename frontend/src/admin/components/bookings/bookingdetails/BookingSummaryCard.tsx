import { formatCurrency } from "../../../../lib/utils";

export default function BookingSummaryCard({ booking }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6">
        Tóm tắt đơn hàng
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Ngày nhận phòng</span>

          <span className="font-semibold text-slate-800">
            {new Date(booking.checkInDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Ngày trả phòng</span>

          <span className="font-semibold text-slate-800">
            {new Date(booking.checkOutDate).toLocaleDateString()}
          </span>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-800">Tổng cộng</span>

            <span className="text-xl font-bold text-emerald-600">
              {formatCurrency(booking.totalPrice)} VNĐ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
