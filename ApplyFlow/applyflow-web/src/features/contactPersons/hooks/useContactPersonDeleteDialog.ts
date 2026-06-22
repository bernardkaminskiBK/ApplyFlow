import { useState } from "react";
import type { ContactPerson } from "../models/contactPerson";

export function useContactPersonDeleteDialog() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactPerson | null>(
    null,
  );

  function openDeleteDialog(contact: ContactPerson) {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setSelectedContact(null);
    setIsDeleteDialogOpen(false);
  }

  return {
    selectedContact,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  };
}
