import { useContext } from "react";
import { PaymentContext } from "../../context/payment/payment.context";

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used inside PaymentProvider");
  }
  return context;
};
