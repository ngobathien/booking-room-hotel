// BookingContext.tsx
import React, { useEffect, useState } from "react";
import type { Booking } from "../../types/booking.types";
import { BookingContext } from "./booking.context";
import type { Room } from "../../types/room.types";

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

  // giỏ hàng
  const [selectedRooms, setSelectedRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem("selectedRooms");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("selectedRooms", JSON.stringify(selectedRooms));
  }, [selectedRooms]);
  const addRoom = (room: Room) => {
    setSelectedRooms((prev) => {
      if (prev.find((r) => r._id === room._id)) return prev;
      return [...prev, room];
    });
  };

  const removeRoom = (roomId: string) => {
    setSelectedRooms((prev) => prev.filter((r) => r._id !== roomId));
  };

  const clearRooms = () => {
    setSelectedRooms([]);
  };

  const totalPrice = selectedRooms.reduce(
    (sum, room) => sum + room.roomType.pricePerNight,
    0,
  );

  return (
    <BookingContext.Provider
      value={{
        selectedRooms,
        totalPrice,
        isCartOpen,
        addRoom,
        removeRoom,
        clearRooms,
        setIsCartOpen,

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
