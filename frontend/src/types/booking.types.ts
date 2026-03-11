export interface CheckRoomAvailabilityParams {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface BookingContextType {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  available: boolean | null;
  loading: boolean;

  setCheckInDate: (value: string) => void;
  setCheckOutDate: (value: string) => void;
  setGuests: (value: number) => void;
  setAvailable: (value: boolean | null) => void;
  setLoading: (value: boolean) => void;
}

export interface CreateBooking {
  id: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
}
