import { useEffect, useState, useCallback } from "react";
import {
  getDashboardOverview,
  getRevenueChart,
  getBookingChart,
} from "../../common/services/dashboardService";

export const useDashboard = () => {
  const [overview, setOverview] = useState<any>(null);
  const [revenue, setRevenue] = useState<any[]>([]);
  const [booking, setBooking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [ov, rev, book] = await Promise.all([
        getDashboardOverview(),
        getRevenueChart(fromDate, toDate),
        getBookingChart(fromDate, toDate),
      ]);

      setOverview(ov);
      setRevenue(rev);
      setBooking(book);
    } catch (err: any) {
      setError(err?.message || "Dashboard error");
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    overview,
    revenue,
    booking,
    loading,
    error,
    refetch: fetchDashboard,

    fromDate,
    toDate,
    setFromDate,
    setToDate,
  };
};
