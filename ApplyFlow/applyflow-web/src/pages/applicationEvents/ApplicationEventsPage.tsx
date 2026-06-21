import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import type { ApplicationEvent } from "../../types/applicationEvent/applicationEvent";
import type { ApplicationEventFormErrors } from "../../types/applicationEvent/applicationEventFormError";
import { getEventTypeText } from "../../utils/applicationEventHelpers";
import type { JobApplication } from "../../features/jobApplications/models/jobApplication";
import { getJobApplications } from "../../api/jobApplicationsApi";
import ApplicationEventFormDialog from "../../components/applicationEvents/ApplicationEventFormDialog";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  createApplicationEvent,
  deleteApplicationEvent,
  getApplicationEvents,
  updateApplicationEvent,
} from "../../api/applicationEventsApi";
import SearchField from "../../components/common/SearchField";
import PageHeader from "../../components/common/PageHeader";

export default function ApplicationEventsPage() {
  const [events, setEvents] = useState<ApplicationEvent[]>([]);
  const [errors, setErrors] = useState<ApplicationEventFormErrors>({});

  const [jobApplicationId, setJobApplicationId] = useState("");
  const [eventType, setEventType] = useState("0");
  const [eventDate, setEventDate] = useState("");
  const [note, setNote] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<ApplicationEvent | null>(
    null,
  );
  const [editingEvent, setEditingEvent] = useState<ApplicationEvent | null>(
    null,
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  const [searchText, setSearchText] = useState("");

  const filteredApplications = events.filter((event) =>
    `${event.companyName ?? ""} ${event.positionTitle ?? ""} ${event.eventDate ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    loadEvents();
    loadJobApplications();
  }, []);

  async function loadEvents() {
    const data = await getApplicationEvents();
    setEvents(data);
  }

  async function loadJobApplications() {
    const data = await getJobApplications();
    setJobApplications(data);
  }

  function resetForm() {
    setJobApplicationId("");
    setEventType("0");
    setEventDate("");
    setNote("");
    setErrors({});
  }

  function openCreateDialog() {
    setEditingEvent(null);
    resetForm();
    setEventDate(new Date().toISOString().split("T")[0]);
    setIsFormDialogOpen(true);
  }

  function openEditDialog(event: ApplicationEvent) {
    setEditingEvent(event);

    setJobApplicationId(event.jobApplicationId.toString());
    setEventType(event.eventType.toString());
    setEventDate(event.eventDate);
    setNote(event.note || "");
    setErrors({});

    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingEvent(null);
    resetForm();
  }

  async function handleSaveEvent() {
    try {
      setErrors({});

      if (editingEvent) {
        await updateApplicationEvent(editingEvent.id, {
          eventType: Number(eventType),
          eventDate,
          note,
        });
      } else {
        await createApplicationEvent({
          jobApplicationId: Number(jobApplicationId),
          eventType: Number(eventType),
          eventDate,
          note,
        });
      }

      await loadEvents();
      closeFormDialog();
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      setErrors({
        jobApplicationId: validationErrors?.JobApplicationId?.[0],
        note: validationErrors?.Note?.[0],
      });
    }
  }

  async function handleDeleteEvent() {
    if (!selectedEvent) return;

    await deleteApplicationEvent(selectedEvent.id);
    await loadEvents();

    setIsDeleteDialogOpen(false);
    setSelectedEvent(null);
  }

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Event Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Event Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Note</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredApplications.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.companyName}</TableCell>
                <TableCell>{event.positionTitle}</TableCell>
                <TableCell>
                  <Link to={`/application-events/${event.id}`}>
                    <Chip
                      label={getEventTypeText(event.eventType)}
                      size="small"
                    />
                  </Link>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {event.eventDate}
                </TableCell>
                <TableCell>{event.note}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditDialog(event)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ApplicationEventFormDialog
        open={isFormDialogOpen}
        title={editingEvent ? "Edit Event" : "Add Event"}
        jobApplications={jobApplications}
        jobApplicationId={jobApplicationId}
        eventType={eventType}
        eventDate={eventDate}
        note={note}
        errors={errors}
        onJobApplicationIdChange={setJobApplicationId}
        onEventTypeChange={setEventType}
        onEventDateChange={setEventDate}
        onNoteChange={setNote}
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
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteEvent}
      />
    </Box>
  );
}
