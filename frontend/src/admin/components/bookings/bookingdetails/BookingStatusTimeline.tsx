import { BookingStatus, type Booking } from "../../../../types/booking.types";

type Props = {
  booking: Booking;
};

export default function BookingStatusTimeline({ booking }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Trạng thái</h3>

      <div className="space-y-6">
        {/* CONFIRMED */}
        {booking.bookingStatus === BookingStatus.CONFIRMED && (
          <div className="flex gap-4 items-start">
            <div className="w-3 h-3 mt-2 rounded-full bg-emerald-500"></div>

            <div>
              <p className="font-semibold text-slate-800">Đã xác nhận</p>

              <p className="text-sm text-slate-500">
                {new Date(booking.checkInDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* CHECK IN TIME*/}
        {booking.checkedInAt && (
          <div className="flex gap-4 items-start">
            <div className="w-3 h-3 mt-2 rounded-full bg-blue-500"></div>

            <div>
              <p className="font-semibold text-slate-800">Đã nhận phòng</p>

              <p className="text-sm text-slate-500">
                {new Date(booking.checkedInAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* CHECK OUT TIME*/}
        {booking.checkedOutAt && (
          <div className="flex gap-4 items-start">
            <div className="w-3 h-3 mt-2 rounded-full bg-purple-500"></div>

            <div>
              <p className="font-semibold text-slate-800">Đã trả phòng</p>

              <p className="text-sm text-slate-500">
                {new Date(booking.checkedOutAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
