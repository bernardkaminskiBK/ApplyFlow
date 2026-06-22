import { useState } from "react";
import type { ApplicationEvent } from "../models/applicationEvent";
import type { ApplicationEventFormErrors } from "../models/applicationEventFormError";
import type { ApplicationEventFormValues } from "../models/applicationEventFormValues";

const emptyForm: ApplicationEventFormValues = {
  jobApplicationId: "",
  eventType: 0,
  eventDate: "",
  note: "",
};

export function useApplicationEventDialog() {
  const [form, setForm] = useState<ApplicationEventFormValues>(emptyForm);
  const [errors, setErrors] = useState<ApplicationEventFormErrors>({});
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ApplicationEvent | null>(
    null,
  );

  function updateForm(
    field: keyof ApplicationEventFormValues,
    value: string | number,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setErrors({});
  }

  function openCreateDialog() {
    setEditingEvent(null);
    setForm({
      ...emptyForm,
      eventDate: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    setIsFormDialogOpen(true);
  }

  function openEditDialog(event: ApplicationEvent) {
    setEditingEvent(event);
    setForm({
      jobApplicationId: event.jobApplicationId.toString(),
      eventType: event.eventType,
      eventDate: event.eventDate,
      note: event.note || "",
    });
    setErrors({});
    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingEvent(null);
    resetForm();
  }

  return {
    form,
    errors,
    editingEvent,
    isFormDialogOpen,
    updateForm,
    setErrors,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  };
}
