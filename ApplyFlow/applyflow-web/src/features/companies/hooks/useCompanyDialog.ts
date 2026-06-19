import { useState } from "react";
import type { CompanyFormValues } from "../models/companyFormValues";
import type { CompanyFormErrors } from "../models/companyFormErrors";
import type { Company } from "../models/company";

export function useCompanyDialog() {
  const [errors, setErrors] = useState<CompanyFormErrors>({});
  const [form, setForm] = useState<CompanyFormValues>({
    name: "",
    city: "",
    website: "",
    note: "",
  });

  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  function updateForm(field: keyof CompanyFormValues, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm({
      name: "",
      city: "",
      website: "",
      note: "",
    });
    setErrors({});
  }

  function openCreateDialog() {
    setEditingCompany(null);
    resetForm();
    setIsFormDialogOpen(true);
  }

  function openEditDialog(company: Company) {
    setEditingCompany(company);
    setForm({
      name: company.name,
      city: company.city || "",
      website: company.website || "",
      note: company.note || "",
    });

    setErrors({});

    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingCompany(null);
    resetForm();
  }

  return {
    errors,
    form,

    editingCompany,
    isFormDialogOpen,

    updateForm,
    resetForm,
    setErrors,

    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  };
}
