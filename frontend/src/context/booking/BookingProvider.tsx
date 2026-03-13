// BookingContext.tsx
import React, { useState } from "react";
import type { Booking } from "../../types/booking.types";
import { BookingContext } from "./booking.context";

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [myBooking, setMyBooking] = useState<Booking[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  return (
    <BookingContext.Provider
      value={{
        checkInDate,
        checkOutDate,
        guests,
        available,
        loading,
        currentBooking,
        myBooking,
        bookings,
        setBookings,
        setMyBooking,
        setCurrentBooking,
        setCheckInDate,
        setCheckOutDate,
        setGuests,
        setAvailable,
        setLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
