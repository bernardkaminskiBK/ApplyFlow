import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import type { ApplicationEventFormValues } from "../models/applicationEventFormValues";
import type { ApplicationEventFormErrors } from "../models/applicationEventFormError";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import { useJobApplicationsLookup } from "../../../shared/hooks/useApplicationEventsLookup";

type ApplicationEventFormDialogProps = {
  open: boolean;
  title: string;
  form: ApplicationEventFormValues;
  errors: ApplicationEventFormErrors;
  onChange: (
    field: keyof ApplicationEventFormValues,
    value: string | number,
  ) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function ApplicationEventFormDialog({
  open,
  title,
  form,
  errors,
  onChange,
  onClose,
  onSave,
}: ApplicationEventFormDialogProps) {
  const {
    jobApplications,
    loadingJobApplications,
    jobApplicationError,
    loadJobApplications,
    clearJobApplicationError,
  } = useJobApplicationsLookup();

  useEffect(() => {
    if (open) {
      loadJobApplications();
    }
  }, [open]);

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
            value={form.jobApplicationId}
            disabled={loadingJobApplications}
            onChange={(event) =>
              onChange("jobApplicationId", event.target.value.toString())
            }
          >
            {jobApplications.map((application) => (
              <MenuItem key={application.id} value={application.id.toString()}>
                {application.companyName} - {application.positionTitle}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>
            {loadingJobApplications && "Loading job applications..."}
          </FormHelperText>

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
            value={form.eventType}
            onChange={(event) =>
              onChange("eventType", Number(event.target.value))
            }
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
          value={form.eventDate}
          onChange={(event) => onChange("eventDate", event.target.value)}
          error={Boolean(errors.eventDate)}
          helperText={errors.eventDate}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Note"
          value={form.note}
          onChange={(event) => onChange("note", event.target.value)}
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

      <ErrorSnackbar
        open={Boolean(jobApplicationError)}
        message={jobApplicationError}
        onClose={clearJobApplicationError}
      />
    </Dialog>
  );
}
