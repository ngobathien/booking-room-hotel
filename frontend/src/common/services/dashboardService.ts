import apiClient from "./apiClient";

export const getDashboardOverview = async () => {
  const res = await apiClient.get("/dashboards/overview");
  return res.data;
};

export const getRevenueChart = async (from?: string, to?: string) => {
  const res = await apiClient.get("/dashboards/revenue-chart", {
    params: { from, to },
  });
  return res.data;
};

export const getBookingChart = async (from?: string, to?: string) => {
  const res = await apiClient.get("/dashboards/booking-chart", {
    params: { from, to },
  });
  return res.data;
};
