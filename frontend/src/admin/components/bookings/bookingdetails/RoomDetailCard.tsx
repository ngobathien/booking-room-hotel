import { Bed } from "lucide-react";
import type { Booking } from "../../../../types/booking.types";

type Props = {
  booking: Booking;
};

export default function RoomDetailCard({ booking }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Bed className="w-5 h-5 text-emerald-600" />
        Chi tiết phòng
      </h3>

      <div className="flex gap-6">
        <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center">
          <Bed className="w-10 h-10 text-slate-400" />
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="font-bold text-slate-800 text-lg">
            Room {booking.room?.roomNumber}
          </h4>

          <p className="text-slate-500">Booking code: {booking.bookingCode}</p>
        </div>
      </div>
    </div>
  );
}
