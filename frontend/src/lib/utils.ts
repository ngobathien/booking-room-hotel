import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

export const formatVND = (amount: number | null | undefined) => {
  const value = Number(amount || 0);
  return new Intl.NumberFormat("vi-VN").format(value) + " VNĐ";
};
