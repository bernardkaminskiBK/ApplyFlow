import { useState } from "react";
import type { ApplicationEvent } from "../models/applicationEvent";

export function useApplicationEventDeleteDialog() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ApplicationEvent | null>(
    null,
  );

  function openDeleteDialog(event: ApplicationEvent) {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setSelectedEvent(null);
    setIsDeleteDialogOpen(false);
  }

  return {
    selectedEvent,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  };
}
