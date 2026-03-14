import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBookingAction } from "../../../hooks/booking/useBookingAction";
import BookingHeader from "../../components/bookings/bookingdetails/BookingHeader";
import CustomerInfoCard from "../../components/bookings/bookingdetails/CustomerInfoCard";
import RoomDetailCard from "../../components/bookings/bookingdetails/RoomDetailCard";
import BookingSummaryCard from "../../components/bookings/bookingdetails/BookingSummaryCard";
import BookingStatusTimeline from "../../components/bookings/bookingdetails/BookingStatusTimeline";
import { useBooking } from "../../../hooks/booking/useBooking";

export default function BookingDetailPage() {
  const { id } = useParams();

  const { currentBooking, loading } = useBooking();
  const { fetchBookingDetail } = useBookingAction();

  useEffect(() => {
    if (id) fetchBookingDetail(id);
  }, [id]);

  if (loading || !currentBooking) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <BookingHeader booking={currentBooking} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CustomerInfoCard booking={currentBooking} />
          <RoomDetailCard booking={currentBooking} />
        </div>

        <div className="space-y-8">
          <BookingSummaryCard booking={currentBooking} />
          <BookingStatusTimeline booking={currentBooking} />
        </div>
      </div>
    </div>
  );
}
