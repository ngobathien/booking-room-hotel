import type { CreatePaymentPayload } from "../../types/payment.types";
import apiClient from "./apiClient";

/* ======================= CREATE PAYMENT ======================= */

export const createPayment = async (data: CreatePaymentPayload) => {
  try {
    const res = await apiClient.post("/payments/create", data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const vnpay_return_Payment = async (data: CreatePaymentPayload) => {
  try {
    const res = await apiClient.post("/payments/create", data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
