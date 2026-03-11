// useBookingAction.ts
import { useBooking } from "../context/BookingContext";
import {
  checkRoomAvailability,
  createBooking,
} from "../common/services/bookingService";
import { toast } from "react-toastify";

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

  //   tạo booking mới
  const handleCreateBooking = async (roomId: string) => {
    if (!checkInDate || !checkOutDate) return;

    if (available === false) {
      toast.error("Phòng không còn trống");
      return;
    }

    setLoading(true);

    try {
      await createBooking({
        room: roomId,
        checkInDate,
        checkOutDate,
      });

      toast.success("Đặt phòng thành công 🎉");
    } catch (error: any) {
      alert(error.response?.data?.message || "Lỗi đặt phòng");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCheckRoomAvailability,
    handleCreateBooking,
  };
};
