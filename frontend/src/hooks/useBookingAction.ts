// useBookingAction.ts
import { useBooking } from "../context/BookingContext";
import {
  checkRoomAvailability,
  createBooking,
} from "../common/services/bookingService";
import { toast } from "react-toastify";

type CustomerInfo = {
  fullName: string;
  email: string;
  phone_number: string;
};

export const useBookingAction = () => {
  const { checkInDate, checkOutDate, setAvailable, setLoading, available } =
    useBooking();

  // kiểm tra phòng có còn trống hay không dựa vào ngày checkin checkout
  const handleCheckRoomAvailability = async (roomId: string) => {
    if (!checkInDate || !checkOutDate) return;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkOut <= checkIn) {
      toast.error("Checkout phải lớn hơn checkin");
      return;
    }

    setLoading(true);

    try {
      const data = await checkRoomAvailability({
        roomId,
        checkInDate,
        checkOutDate,
      });

      console.log("check available:", data.available);

      setAvailable(data.available);
    } catch (error) {
      console.error(error);
      setAvailable(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE BOOKING ================= */
  const handleCreateBooking = async (
    roomId: string,
    customerInfo: CustomerInfo,
  ) => {
    if (!checkInDate || !checkOutDate) return;

    if (available === false) {
      toast.error("Phòng không còn trống");
      return;
    }

    setLoading(true);

    try {
      const booking = await createBooking({
        room: roomId,
        checkInDate,
        checkOutDate,
        fullName: customerInfo.email,
        email: customerInfo.email,
        phone_number: customerInfo.phone_number,
      });

      toast.success("Đặt phòng thành công");

      return booking;
    } catch (error: any) {
      const message = error.response?.data?.message;
      console.log(error.response?.data);

      toast.error(message || "Lỗi đặt phòng");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCheckRoomAvailability,
    handleCreateBooking,
  };
};
