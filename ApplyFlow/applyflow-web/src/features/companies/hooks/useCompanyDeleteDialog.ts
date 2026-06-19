import { useState } from "react";
import type { Company } from "../models/company";

export function useCompanyDeleteDialog() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function openDeleteDialog(company: Company) {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogOpen(false);
    setSelectedCompany(null);
  }

  return {
    selectedCompany,
    isDeleteDialogOpen,

    openDeleteDialog,
    closeDeleteDialog,
  };
}
