export type CheckRoomAvailabilityParams = {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
};

export type MethodPayments = "vnpay" | "momo" | "cod";

export type CreatePaymentPayload = {
  bookingId: string;
  method: MethodPayments;
};

export interface PaymentContextType {
  loading: boolean;
  // paymentUrl?: string;
  // transactionId?: string;

  setLoading: (value: boolean) => void;
  // setPaymentUrl: (value: string) => void;
}

export const STATUS_LABELS: Record<string, string> = {
  SUCCESS: "Thành công",
  PENDING: "Đang chờ",
  FAILED: "Thất bại",
  EXPIRED: "Hết hạn",
};

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";

export interface BookingInfo {
  _id: string;
  fullName: string;
  email: string;
  bookingCode: string;
  phoneNumber: string;
  totalPrice: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface Payment {
  _id: string;
  booking: BookingInfo;
  amount: number;
  method: string;
  status: PaymentStatus;
  expiryAt?: string;
  createdAt: string;
}

export interface PaymentListResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
}

export interface RevenueByMethod {
  _id: string; // method
  totalRevenue: number;
  count: number;
}

export type AdminQueryPaymentParams = {
  status?: string;
  bookingId?: string;
  method?: string;
  page?: number;
  limit?: number;
};
