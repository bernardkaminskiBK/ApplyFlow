import { useState } from "react";
import {
  getApplicationEvents,
  updateApplicationEvent,
  createApplicationEvent,
  deleteApplicationEvent,
} from "../../../api/applicationEventsApi";
import type { ApplicationEvent } from "../models/applicationEvent";
import type { ApplicationEventFormValues } from "../models/applicationEventFormValues";
import type { ApplicationEventFormErrors } from "../models/applicationEventFormError";

export function useApplicationEvents() {
  const [applicationEvents, setApplicationEvents] = useState<
    ApplicationEvent[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function clearSuccessMessage() {
    setSuccessMessage(null);
  }

  async function loadApplicationEvents() {
    try {
      setLoading(true);
      setError(null);

      const data = await getApplicationEvents();
      setApplicationEvents(data);
    } catch {
      setError("Application events could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  async function saveApplicationEvent(
    form: ApplicationEventFormValues,
    editingEvent: ApplicationEvent | null,
    onValidationError: (errors: ApplicationEventFormErrors) => void,
    onSuccess: () => void,
  ) {
    try {
      setError(null);

      if (editingEvent) {
        await updateApplicationEvent(editingEvent.id, {
          eventType: Number(form.eventType),
          eventDate: form.eventDate,
          note: form.note,
        });
      } else {
        await createApplicationEvent({
          jobApplicationId: Number(form.jobApplicationId),
          eventType: Number(form.eventType),
          eventDate: form.eventDate,
          note: form.note,
        });
      }

      await loadApplicationEvents();
      onSuccess();
      setSuccessMessage("Application event saved successfully.");
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        onValidationError({
          jobApplicationId: validationErrors?.JobApplicationId?.[0],
          eventDate: validationErrors?.request?.[0],
          note: validationErrors?.Note?.[0],
        });
        return;
      }

      setError("Application event could not be saved.");
    }
  }

  async function removeApplicationEvent(
    applicationEvent: ApplicationEvent | null,
    onSuccess: () => void,
  ) {
    if (!applicationEvent) return;

    try {
      setError(null);

      await deleteApplicationEvent(applicationEvent.id);
      await loadApplicationEvents();
      onSuccess();
      setSuccessMessage("Application event deleted successfully.");
    } catch {
      setError("Application event could not be deleted.");
    }
  }

  return {
    applicationEvents,
    loading,
    error,
    successMessage,
    clearSuccessMessage,
    loadApplicationEvents,
    saveApplicationEvent,
    removeApplicationEvent,
    clearError: () => setError(null),
  };
}
