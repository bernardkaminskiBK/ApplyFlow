import { useState } from "react";
import type { ContactPersonFormValues } from "../models/contactPersonFormValues";
import type { ContactPerson } from "../models/contactPerson";
import type { ContactPersonFormErrors } from "../models/contactPersonFormErrors";

const emptyContactPersonForm: ContactPersonFormValues = {
  companyId: "",
  name: "",
  position: "",
  email: "",
  phoneNumber: "",
};

export function useContactPersonDialog() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [errors, setErrors] = useState<ContactPersonFormErrors>({});
  const [form, setForm] = useState<ContactPersonFormValues>(
    emptyContactPersonForm,
  );
  const [editingContact, setEditingContact] = useState<ContactPerson | null>(
    null,
  );

  function updateForm(
    field: keyof ContactPersonFormValues,
    value: string | number,
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyContactPersonForm);
    setErrors({});
  }

  function openCreateDialog() {
    setEditingContact(null);
    resetForm();
    setIsFormDialogOpen(true);
  }

  function openEditDialog(contact: ContactPerson) {
    setEditingContact(contact);

    setForm({
      companyId: contact.companyId.toString(),
      name: contact.name,
      position: contact.position || "",
      email: contact.email || "",
      phoneNumber: contact.phoneNumber || "",
    });

    setErrors({});
    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingContact(null);
    resetForm();
  }

  return {
    errors,
    form,
    editingContact,
    isFormDialogOpen,
    updateForm,
    setErrors,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  };
}
