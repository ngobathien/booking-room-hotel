import { useContext } from "react";
import { BookingContext } from "../../context/booking/booking.context";

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return context;
};
