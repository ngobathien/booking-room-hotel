import { toast } from "react-toastify";

import {
  checkRoomAvailability,
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  getBookingById,
  checkInBooking,
  checkOutBooking,
  getBookingStats,
} from "../../common/services/bookingService";
import { useBooking } from "./useBooking";

type CustomerInfo = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

export const useBookingAction = () => {
  const {
    checkInDate,
    checkOutDate,
    available,
    setStats,
    setBookings,

    setAvailable,
    setLoading,
    setCurrentBooking,
    setMyBooking,
  } = useBooking();

  const fetchBookingStats = async () => {
    try {
      const stats = await getBookingStats();
      setStats(stats);
    } catch (error) {
      console.error(error);
    }
  };
  /* ================= CHECK ROOM ================= */

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
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        phoneNumber: customerInfo.phoneNumber,
      });

      setCurrentBooking(booking);

      toast.info("Booking đã được tạo, chưa thanh toán.");

      return booking;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi đặt phòng");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GET MY BOOKINGS ================= */

  const fetchMyBookings = async () => {
    try {
      setLoading(true);

      const bookings = await getMyBookings();

      setMyBooking(bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADMIN: GET ALL BOOKINGS ================= */

  const fetchAllBookings = async () => {
    try {
      setLoading(true);

      const bookings = await getAllBookings();

      setBookings(bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= BOOKING DETAIL ================= */

  const fetchBookingDetail = async (id: string) => {
    try {
      setLoading(true);

      const booking = await getBookingById(id);

      setCurrentBooking(booking);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL BOOKING ================= */

  const cancelBookingAction = async (id: string) => {
    try {
      setLoading(true);

      await cancelBooking(id);

      toast.success("Hủy booking thành công");

      await fetchMyBookings();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi hủy booking");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADMIN CHECK-IN ================= */

  const handleCheckInBooking = async (id: string) => {
    try {
      setLoading(true);

      const updatedBooking = await checkInBooking(id);

      setCurrentBooking((prev) => ({
        ...prev!,
        ...updatedBooking,
      }));

      toast.success("Check-in thành công");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADMIN CHECK-OUT ================= */
  const handleCheckOutBooking = async (id: string) => {
    try {
      setLoading(true);

      const updatedBooking = await checkOutBooking(id);

      setCurrentBooking((prev) => ({
        ...prev!,
        ...updatedBooking,
      }));

      toast.success("Check-out thành công");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCheckRoomAvailability,
    handleCreateBooking,

    fetchMyBookings,
    fetchAllBookings,
    fetchBookingDetail,

    cancelBookingAction,

    handleCheckInBooking,
    handleCheckOutBooking,

    fetchBookingStats,
  };
};
