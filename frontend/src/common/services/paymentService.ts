import type {
  AdminQueryPaymentParams,
  CreatePaymentPayload,
  PaymentListResponse,
  RevenueByMethod,
} from "../../types/payment.types";
import apiClient from "./apiClient";

export const getTotalRevenue = async () => {
  const res = await apiClient.get("/payments/admin/total-revenue");
  return res.data;
};

export const getRevenueByMethod = async (): Promise<RevenueByMethod[]> => {
  const res = await apiClient.get("/payments/admin/revenue-by-method");
  return res.data;
};

export const getPayments = async (
  params?: AdminQueryPaymentParams,
): Promise<PaymentListResponse> => {
  const res = await apiClient.get("/payments/admin", { params });
  console.log(res);

  return res.data;
};

export const getPaymentDetail = async (id: string) => {
  const res = await apiClient.get(`/payments/admin/${id}`);
  return res.data;
};
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
