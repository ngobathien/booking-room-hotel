import apiClient from "./apiClient";

export const getDashboardOverview = async () => {
  const res = await apiClient.get("/dashboards/overview");
  return res.data;
};
