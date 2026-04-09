import type { Room } from "./room.types";

export type CheckRoomAvailabilityParams = {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
};

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const BOOKING_STAY_STATUS = {
  NOT_CHECKED_IN: "NOT_CHECKED_IN",
  CHECKED_IN: "CHECKED_IN",
  CHECKED_OUT: "CHECKED_OUT",
} as const;

export type BookingStayStatus =
  (typeof BOOKING_STAY_STATUS)[keyof typeof BOOKING_STAY_STATUS];

export type Booking = {
  _id: string;
  bookingCode: string;

  fullName: string;
  email: string;
  phoneNumber: string;

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
  stats: BookingStats;

  setStats: React.Dispatch<React.SetStateAction<BookingStats>>;
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
  phoneNumber?: string;
  idempotencyKey?: string;
};

export type BookingStats = {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  completed: number;
};

export type GetAllBookingsResponse = {
  message: string;
  data: Booking[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export type BookingQueryPaymentParams = {
  status?: string;
  page?: number;
  limit?: number;
};
