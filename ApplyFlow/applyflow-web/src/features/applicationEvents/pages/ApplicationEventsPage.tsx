import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import ConfirmDeleteDialog from "../../../components/common/ConfirmDeleteDialog";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import PageHeader from "../../../components/common/PageHeader";
import SearchField from "../../../components/common/SearchField";
import SuccessSnackbar from "../../../components/common/SuccessSnackbar";
import ApplicationEventFormDialog from "../components/ApplicationEventFormDialog";
import { createApplicationEventColumns } from "../grid/applicationEventsColumns";
import { useApplicationEventDeleteDialog } from "../hooks/useApplicationEventDeleteDialog";
import { useApplicationEventDialog } from "../hooks/useApplicationEventDialog";
import { useApplicationEvents } from "../hooks/useApplicationEvents";
import { getEventTypeText } from "../utils/applicationEventHelpers";

export default function ApplicationEventsPage() {
  const {
    applicationEvents,
    loading,
    error,
    successMessage,
    loadApplicationEvents,
    saveApplicationEvent,
    removeApplicationEvent,
    clearError,
    clearSuccessMessage,
  } = useApplicationEvents();

  const {
    errors,
    form,
    editingEvent,
    isFormDialogOpen,
    updateForm,
    setErrors,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  } = useApplicationEventDialog();

  const {
    selectedEvent,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  } = useApplicationEventDeleteDialog();

  const [searchText, setSearchText] = useState("");
  const filteredEvents = applicationEvents.filter((event) =>
    `${event.companyName ?? ""} ${event.positionTitle ?? ""} ${event.eventDate ?? ""} ${event.note ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  async function handleSaveEvent() {
    await saveApplicationEvent(form, editingEvent, setErrors, closeFormDialog);
  }

  async function handleDeleteEvent() {
    await removeApplicationEvent(selectedEvent, closeDeleteDialog);
  }

  useEffect(() => {
    loadApplicationEvents();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Application Events"
        buttonText="Add Event"
        onButtonClick={openCreateDialog}
      />

      <SearchField
        label="Search Application Events"
        value={searchText}
        onChange={setSearchText}
      />

      <DataGrid
        rows={filteredEvents}
        columns={createApplicationEventColumns(
          openEditDialog,
          openDeleteDialog,
        )}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell[data-field='actions']": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />

      <ApplicationEventFormDialog
        open={isFormDialogOpen}
        title={editingEvent ? "Edit Event" : "Add Event"}
        form={form}
        errors={errors}
        onChange={updateForm}
        onClose={closeFormDialog}
        onSave={handleSaveEvent}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Event"
        itemType="event"
        itemName={
          selectedEvent ? getEventTypeText(selectedEvent.eventType) : undefined
        }
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteEvent}
      />

      <ErrorSnackbar
        open={Boolean(error)}
        message={error}
        onClose={clearError}
      />

      <SuccessSnackbar
        open={Boolean(successMessage)}
        message={successMessage}
        onClose={clearSuccessMessage}
      />
    </Box>
  );
}
