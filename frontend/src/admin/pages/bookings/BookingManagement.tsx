import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingAction } from "../../../hooks/useBookingAction";
import BookingTable from "../../components/bookings/BookingTable";
import { useBooking } from "../../../context/BookingContext";

export default function BookingManagement() {
  const { bookings, loading } = useBooking();
  const { fetchAllBookings } = useBookingAction();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Quản lý Đơn đặt phòng
        </h1>
        <p className="text-slate-500">
          Theo dõi và quản lý tất cả các yêu cầu đặt phòng của khách hàng
        </p>
      </div>

      <BookingTable
        bookings={bookings}
        onRowClick={(id) => navigate(`/dashboard/bookings/${id}`)}
      />
    </div>
  );
}
