import type { Room } from "./room.types";

export type CheckRoomAvailabilityParams = {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
};

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum BookingStayStatus {
  NOT_CHECKED_IN = "not_checked_in",
  CHECKED_IN = "checked-in",
  CHECKED_OUT = "checked-out",
}

export type Booking = {
  _id: string;
  bookingCode: string;

  fullName: string;
  email: string;
  phone_number: string;

  room: Room;
  checkInDate: string;
  checkOutDate: string;

  totalPrice: number;
  bookingStatus: BookingStatus;
  stayStatus: BookingStayStatus;

  checkedInAt?: string;
  checkedOutAt?: string;
};
export interface BookingContextType {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  available: boolean | null;
  loading: boolean;
  currentBooking: Booking | null;
  myBooking: Booking[] | null;
  bookings: Booking[] | null;

  setBookings: (value: Booking[]) => void;
  setMyBooking: (value: Booking[]) => void;
  setCheckInDate: (value: string) => void;
  setCheckOutDate: (value: string) => void;
  setGuests: (value: number) => void;
  setAvailable: (value: boolean | null) => void;
  setLoading: (value: boolean) => void;
  setCurrentBooking: React.Dispatch<React.SetStateAction<Booking | null>>;
}

export type CreateBookingPayload = {
  room: string;
  checkInDate: string;
  checkOutDate: string;
  fullName?: string;
  email?: string;
  phone_number?: string;
};
