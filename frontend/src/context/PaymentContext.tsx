// BookingContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { PaymentContextType } from "../types/payment.types";

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <PaymentContext.Provider
      value={{
        setLoading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used inside PaymentProvider");
  }
  return context;
};
