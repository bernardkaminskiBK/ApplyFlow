import { useState } from "react";
import {
  getCompanies,
  type CreateCompanyRequest,
  updateCompany,
  createCompany,
  deleteCompany,
} from "../../../api/companiesApi";
import type { Company } from "../models/company";
import type { CompanyFormErrors } from "../models/companyFormErrors";
import type { CompanyFormValues } from "../models/companyFormValues";

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function clearSuccessMessage() {
    setSuccessMessage(null);
  }

  async function loadCompanies() {
    try {
      setLoading(true);
      setError(null);

      const data = await getCompanies();
      setCompanies(data);
    } catch {
      setError("Companies could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  async function saveCompany(
    form: CompanyFormValues,
    editingCompany: Company | null,
    onValidationError: (errors: CompanyFormErrors) => void,
    onSuccess: () => void,
  ) {
    try {
      setError(null);

      const request: CreateCompanyRequest = { ...form };

      if (editingCompany) {
        await updateCompany(editingCompany.id, request);
      } else {
        await createCompany(request);
      }

      await loadCompanies();
      onSuccess();
      setSuccessMessage("Company saved successfully.");
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        onValidationError({
          name: validationErrors?.Name?.[0],
          city: validationErrors?.City?.[0],
          website: validationErrors?.Website?.[0],
          note: validationErrors?.Note?.[0],
        });
        return;
      }

      setError("Company could not be saved.");
    }
  }

  async function removeCompany(company: Company | null, onSuccess: () => void) {
    if (!company) return;

    try {
      setError(null);

      await deleteCompany(company.id);
      await loadCompanies();
      onSuccess();
      setSuccessMessage("Company deleted successfully.");
    } catch {
      setError("Company could not be deleted.");
    }
  }

  return {
    companies,
    loading,
    error,
    successMessage,
    clearSuccessMessage,
    loadCompanies,
    saveCompany,
    removeCompany,
    clearError: () => setError(null),
  };
}
