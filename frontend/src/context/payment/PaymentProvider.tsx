// BookingContext.tsx
import React, { useState } from "react";
import { PaymentContext } from "./PaymentContext";

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  
  return (
    <PaymentContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
