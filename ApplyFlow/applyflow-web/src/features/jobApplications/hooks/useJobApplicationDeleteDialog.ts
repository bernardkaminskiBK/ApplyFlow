import { useState } from "react";
import type { JobApplication } from "../models/jobApplication";

export function useJobApplicationDeleteDialog() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  function openDeleteDialog(jobApplication: JobApplication) {
    setSelectedApplication(jobApplication);
    setIsDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogOpen(false);
    setSelectedApplication(null);
  }

  return {
    selectedApplication,
    isDeleteDialogOpen,

    openDeleteDialog,
    closeDeleteDialog,
  };
}
