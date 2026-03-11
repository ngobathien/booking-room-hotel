// BookingContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { BookingContextType } from "../types/booking.types";

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <BookingContext.Provider
      value={{
        checkInDate,
        checkOutDate,
        guests,
        available,
        loading,

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
