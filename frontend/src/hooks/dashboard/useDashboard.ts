// useDashboard.ts
import { useEffect, useState } from "react";
import { getDashboardOverview } from "../../common/services/dashboardService";

export const useDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboardOverview();
      console.log("dashboard: ", res);

      setData(res);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    data,
    loading,
    refetch: fetchDashboard,
  };
};
