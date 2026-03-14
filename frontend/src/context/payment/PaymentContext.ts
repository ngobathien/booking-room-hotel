import { createContext } from "react";
import type { PaymentContextType } from "../../types/payment.types";

export const PaymentContext = createContext<PaymentContextType | null>(null);
