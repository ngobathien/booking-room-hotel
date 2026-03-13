// BookingContext.tsx
import React, { useState } from "react";
import { PaymentContext } from "./payment.context";

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
