import { useState, useEffect } from "react";
import { getApplicationEvents } from "../../api/applicationEventsApi";
import { getCompanies } from "../../api/companiesApi";
import { getContactPersons } from "../../api/contactPersonsApi";
import { getJobApplications } from "../../api/jobApplicationsApi";
import type { DashboardStats } from "../../types/dashboard/DashboardStats";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    companyCount: 0,
    applicationCount: 0,
    eventCount: 0,
    contactCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError("");

    Promise.all([
      getCompanies(),
      getJobApplications(),
      getApplicationEvents(),
      getContactPersons(),
    ])
      .then(([companies, applications, events, contacts]) => {
        setStats({
          companyCount: companies.length,
          applicationCount: applications.length,
          eventCount: events.length,
          contactCount: contacts.length,
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
    clearError: () => setError(""),
    reload: loadDashboardData,
  };
}
