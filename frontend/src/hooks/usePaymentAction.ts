// useBookingAction.ts

import { toast } from "react-toastify";
import { createPayment } from "../common/services/paymentService";
import type { MethodPayments } from "../types/payment.types";
import { usePayment } from "../context/PaymentContext";

export const usePaymentAction = () => {
  const { setLoading } = usePayment();

  /* ================= CREATE PAYMENT ================= */
  const handleCreatePayment = async (
    bookingId: string,
    methodPayment: MethodPayments,
  ) => {
    setLoading(true);

    try {
      const res = await createPayment({
        bookingId: bookingId,
        method: methodPayment,
      });

      return res;
    } catch (error: any) {
      const message = error.response?.data?.message;
      console.log(error.response?.data);

      toast.error(message || "Lỗi thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreatePayment,
  };
};
