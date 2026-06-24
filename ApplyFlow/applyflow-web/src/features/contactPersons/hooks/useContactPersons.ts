import { useState } from "react";
import {
  getContactPersons,
  updateContactPerson,
  createContactPerson,
  deleteContactPerson,
} from "../../../api/contactPersonsApi";
import type { ContactPerson } from "../models/contactPerson";
import type { ContactPersonFormErrors } from "../models/contactPersonFormErrors";
import type { ContactPersonFormValues } from "../models/contactPersonFormValues";

export function useContactPersons() {
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  function clearSuccessMessage() {
    setSuccessMessage(null);
  }

  async function loadContactPersons(page: number, pageSize: number) {
    try {
      setLoading(true);
      setError(null);

      const data = await getContactPersons(page + 1, pageSize);
      setContactPersons(data.items);
      setTotalCount(data.totalCount);
    } catch {
      setError("Contact persons could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  async function saveContactPerson(
    form: ContactPersonFormValues,
    editingContact: ContactPerson | null,
    page: number,
    pageSize: number,
    onValidationError: (errors: ContactPersonFormErrors) => void,
    onSuccess: () => void,
  ) {
    try {
      setError(null);

      const request = {
        companyId: Number(form.companyId),
        name: form.name,
        position: form.position,
        email: form.email,
        phoneNumber: form.phoneNumber,
      };

      if (editingContact) {
        await updateContactPerson(editingContact.id, request);
      } else {
        await createContactPerson(request);
      }

      await loadContactPersons(page, pageSize);
      onSuccess();
      setSuccessMessage("Contact person saved successfully.");
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        onValidationError({
          companyId: validationErrors?.CompanyId?.[0],
          name: validationErrors?.Name?.[0],
          position: validationErrors?.Position?.[0],
          email: validationErrors?.Email?.[0],
          phoneNumber: validationErrors?.PhoneNumber?.[0],
        });
        return;
      }

      setError("Contact person could not be saved.");
    }
  }

  async function removeContactPerson(
    contactPerson: ContactPerson | null,
    page: number,
    pageSize: number,
    onSuccess: () => void,
  ) {
    if (!contactPerson) return;

    try {
      setError(null);

      await deleteContactPerson(contactPerson.id);
      await loadContactPersons(page, pageSize);
      onSuccess();
      setSuccessMessage("Contact person deleted successfully.");
    } catch {
      setError("Contact person could not be deleted.");
    }
  }

  return {
    contactPersons,
    loading,
    error,
    successMessage,
    totalCount,
    clearSuccessMessage,
    loadContactPersons,
    saveContactPerson,
    removeContactPerson,
    clearError: () => setError(null),
  };
}
