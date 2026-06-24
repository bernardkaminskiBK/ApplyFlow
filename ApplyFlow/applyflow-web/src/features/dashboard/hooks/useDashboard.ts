import { useState, useEffect } from "react";
import type { DashboardStats } from "../models/DashboardStats";
import { getDashboardStats } from "../../../api/dashboardApi";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    companyCount: 0,
    jobApplicationCount: 0,
    applicationEventCount: 0,
    contactPersonCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError(null);

    getDashboardStats()
      .then((stats) => {
        setStats({
          companyCount: stats.companyCount,
          jobApplicationCount: stats.jobApplicationCount,
          applicationEventCount: stats.applicationEventCount,
          contactPersonCount: stats.contactPersonCount,
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Dashboard data could not be loaded.");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return {
    stats,
    loading,
    error,
    clearError: () => setError(null),
    reload: loadDashboardData,
  };
}
