// METHOD giống backend
export type PaymentMethod = "vnpay" | "momo" | "cod";

// STATUS giống backend (VIẾT HOA)
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
}
