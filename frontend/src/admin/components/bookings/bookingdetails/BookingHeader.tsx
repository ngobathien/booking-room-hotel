import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Download } from "lucide-react";
import {
  BookingStatus,
  BookingStayStatus,
  type Booking,
} from "../../../../types/booking.types";
import { useBookingAction } from "../../../../hooks/useBookingAction";

type Props = {
  booking: Booking;
};

export default function BookingHeader({ booking }: Props) {
  const navigate = useNavigate();
  const { handleCheckInBooking, handleCheckOutBooking } = useBookingAction();

  return (
    <div className="flex items-center justify-between">
      {/* back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Quay lại danh sách</span>
      </button>

      {/* actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
          <Printer className="w-5 h-5" />
        </button>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
          <Download className="w-5 h-5" />
        </button>

        {/* CHECK IN STATUS*/}
        {booking.bookingStatus === BookingStatus.CONFIRMED &&
          booking.stayStatus === BookingStayStatus.NOT_CHECKED_IN && (
            <button
              onClick={() => handleCheckInBooking(booking._id)}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow"
            >
              Check In
            </button>
          )}

        {/* CHECK OUT STATUS*/}
        {booking.stayStatus === BookingStayStatus.CHECKED_IN && (
          <button
            onClick={() => handleCheckOutBooking(booking._id)}
            className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow"
          >
            Check Out
          </button>
        )}
      </div>
    </div>
  );
}
