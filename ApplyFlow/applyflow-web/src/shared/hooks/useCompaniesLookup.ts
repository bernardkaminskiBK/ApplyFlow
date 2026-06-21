import { useState } from "react";
import type { Company } from "../../features/companies/models/company";
import { getCompanies } from "../../api/companiesApi";

export function useCompaniesLookup() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState<string | null>(null);

  async function loadCompanies() {
    try {
      setCompanyLoading(true);
      setCompanyError(null);
      const data = await getCompanies();
      setCompanies(data);
    } catch {
      setCompanyError("Failed to load companies.");
    } finally {
      setCompanyLoading(false);
    }
  }

  function clearCompanyError() {
    setCompanyError(null);
  }

  return {
    companies,
    loadingCompanies,
    companyError,
    loadCompanies,
    clearCompanyError,
  };
}
