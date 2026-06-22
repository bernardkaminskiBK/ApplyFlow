import { useState } from "react";
import type { JobApplication } from "../../features/jobApplications/models/jobApplication";
import { getJobApplications } from "../../api/jobApplicationsApi";

export function useJobApplicationsLookup() {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loadingJobApplications, setLoadingJobApplications] = useState(false);
  const [jobApplicationError, setJobApplicationError] = useState<string | null>(
    null,
  );

  async function loadJobApplications() {
    try {
      setLoadingJobApplications(true);
      setJobApplicationError(null);

      const data = await getJobApplications();
      setJobApplications(data);
    } catch {
      setJobApplicationError("Failed to load job applications.");
    } finally {
      setLoadingJobApplications(false);
    }
  }

  function clearJobApplicationError() {
    setJobApplicationError(null);
  }

  return {
    jobApplications,
    loadingJobApplications,
    jobApplicationError,
    loadJobApplications,
    clearJobApplicationError,
  };
}
