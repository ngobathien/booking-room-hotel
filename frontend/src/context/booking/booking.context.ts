import { createContext } from "react";
import type { BookingContextType } from "../../types/booking.types";

export const BookingContext = createContext<BookingContextType | null>(null);
