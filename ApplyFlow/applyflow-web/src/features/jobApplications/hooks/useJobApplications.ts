import { useState } from "react";
import type { JobApplication } from "../models/jobApplication";
import {
  createJobApplication,
  deleteJobApplication,
  getJobApplications,
  updateJobApplication,
  type CreateJobApplicationRequest,
} from "../../../api/jobApplicationsApi";
import type { JobApplicationFormValues } from "../models/jobApplicationFormValues";
import type { JobApplicationFormErrors } from "../models/jobApplicationErrors";

export function useJobApplications() {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function clearSuccessMessage() {
    setSuccessMessage(null);
  }

  async function loadJobApplications() {
    try {
      setLoading(true);
      setError(null);

      const data = await getJobApplications();
      setJobApplications(data);
    } catch {
      setError("Job applications could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  async function saveJobApplication(
    form: JobApplicationFormValues,
    editingApplication: JobApplication | null,
    onValidationError: (errors: JobApplicationFormErrors) => void,
    onSuccess: () => void,
  ) {
    try {
      setError(null);

      const request: CreateJobApplicationRequest = {
        ...form,
        appliedDate: new Date().toISOString().split("T")[0],
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
      };

      if (editingApplication) {
        await updateJobApplication(editingApplication.id, request);
      } else {
        await createJobApplication(request);
      }

      await loadJobApplications();
      onSuccess();
      setSuccessMessage("Job application saved successfully.");
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        onValidationError({
          companyId: validationErrors?.CompanyId?.[0],
          positionTitle: validationErrors?.PositionTitle?.[0],
          location: validationErrors?.Location?.[0],
          salaryMin: validationErrors?.SalaryMin?.[0],
          salaryMax: validationErrors?.SalaryMax?.[0],
          note: validationErrors?.Note?.[0],
        });
        return;
      }

      setError("Job application could not be saved.");
    }
  }

  async function removeJobApplication(
    jobApplication: JobApplication | null,
    onSuccess: () => void,
  ) {
    if (!jobApplication) return;

    try {
      setError(null);

      await deleteJobApplication(jobApplication.id);
      await loadJobApplications();
      onSuccess();
      setSuccessMessage("Job application deleted successfully.");
    } catch {
      setError("Job application could not be deleted.");
    }
  }

  return {
    jobApplications,
    loading,
    error,
    successMessage,
    clearSuccessMessage,
    loadJobApplications,
    saveJobApplication,
    removeJobApplication,
    clearError: () => setError(null),
  };
}
