import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import type { ApplicationEventFormErrors } from "../../types/applicationEvent/applicationEventFormError";
import type { JobApplication } from "../../types/JobApplication/jobApplication";

type ApplicationEventFormDialogProps = {
  open: boolean;
  title: string;

  jobApplications: JobApplication[];

  jobApplicationId: string;
  eventType: string;
  eventDate: string;
  note: string;

  errors: ApplicationEventFormErrors;

  onJobApplicationIdChange: (value: string) => void;
  onEventTypeChange: (value: string) => void;
  onEventDateChange: (value: string) => void;
  onNoteChange: (value: string) => void;

  onClose: () => void;
  onSave: () => void;
};

export default function ApplicationEventFormDialog({
  open,
  title,
  jobApplications,
  jobApplicationId,
  eventType,
  eventDate,
  note,
  errors,
  onJobApplicationIdChange,
  onEventTypeChange,
  onEventDateChange,
  onNoteChange,
  onClose,
  onSave,
}: ApplicationEventFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors.jobApplicationId)}
        >
          <InputLabel>Job Application</InputLabel>

          <Select
            label="Job Application"
            value={jobApplicationId}
            onChange={(event) => onJobApplicationIdChange(event.target.value)}
          >
            {jobApplications.map((application) => (
              <MenuItem key={application.id} value={application.id.toString()}>
                {application.companyName} - {application.positionTitle}
              </MenuItem>
            ))}
          </Select>

          {errors.jobApplicationId && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0.5, ml: 1.5 }}
            >
              {errors.jobApplicationId}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Event Type</InputLabel>

          <Select
            label="Event Type"
            value={eventType}
            onChange={(event) => onEventTypeChange(event.target.value)}
          >
            <MenuItem value="0">Applied</MenuItem>
            <MenuItem value="1">Phone Screen</MenuItem>
            <MenuItem value="2">Interview</MenuItem>
            <MenuItem value="3">Technical Interview</MenuItem>
            <MenuItem value="4">Offer</MenuItem>
            <MenuItem value="5">Rejected</MenuItem>
            <MenuItem value="6">Follow Up</MenuItem>
            <MenuItem value="7">Note</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Event Date"
          type="date"
          value={eventDate}
          onChange={(event) => onEventDateChange(event.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Note"
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          error={Boolean(errors.note)}
          helperText={errors.note}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
