// BookingContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { Booking, BookingContextType } from "../types/booking.types";

const BookingContext = createContext<BookingContextType | null>(null);

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

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return context;
};
