import { useState } from "react";
import type { JobApplicationFormErrors } from "../models/jobApplicationErrors";
import type { JobApplicationFormValues } from "../models/jobApplicationFormValues";
import type { JobApplication } from "../models/jobApplication";

export function useJobApplicationDialog() {
  const emptyJobApplication = {
    companyId: 0,
    companyName: "",
    positionTitle: "",
    location: "",
    workMode: 0,
    status: 0,
    source: 0,
    appliedDate: "",
    salaryMin: 0,
    salaryMax: 0,
    note: "",
  };

  const [errors, setErrors] = useState<JobApplicationFormErrors>({});
  const [form, setForm] =
    useState<JobApplicationFormValues>(emptyJobApplication);

  const [editingApplication, setEditingApplication] =
    useState<JobApplication | null>(null);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  function updateForm(
    field: keyof JobApplicationFormValues,
    value: string | number,
  ) {
    setForm((currentApplication) => ({
      ...currentApplication,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyJobApplication);
    setErrors({});
  }

  function openCreateDialog() {
    setEditingApplication(null);
    resetForm();
    setIsFormDialogOpen(true);
  }

  function openEditDialog(jobApplication: JobApplication) {
    setEditingApplication(jobApplication);
    setForm({
      companyId: jobApplication.companyId,
      companyName: jobApplication.companyName,
      positionTitle: jobApplication.positionTitle,
      location: jobApplication.location,
      workMode: jobApplication.workMode,
      status: jobApplication.status,
      source: jobApplication.source,
      appliedDate: jobApplication.appliedDate,
      salaryMin: jobApplication.salaryMin,
      salaryMax: jobApplication.salaryMax,
      note: jobApplication.note,
    });
    setErrors({});
    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingApplication(null);
    resetForm();
  }

  return {
    errors,
    form,

    editingApplication,
    isFormDialogOpen,

    updateForm,
    resetForm,
    setErrors,

    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  };
}
