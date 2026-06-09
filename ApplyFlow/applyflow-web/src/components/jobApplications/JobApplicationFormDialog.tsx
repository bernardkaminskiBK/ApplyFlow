import type { Company } from "../../types/company/company";
import type { JobApplicationFormErrors } from "../../types/JobApplication/jobApplicationErrors";
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

type JobApplicationFormDialogProps = {
  open: boolean;
  title: string;

  companyId: string;
  companies: Company[];
  workMode: string;
  status: string;
  source: string;
  positionTitle: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  note: string;

  errors: JobApplicationFormErrors;

  onCompanyIdChange: (value: string) => void;
  onWorkModeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onPositionTitleChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSalaryMinChange: (value: string) => void;
  onSalaryMaxChange: (value: string) => void;
  onNoteChange: (value: string) => void;

  onClose: () => void;
  onSave: () => void;
};

export default function JobApplicationFormDialog({
  open,
  title,
  companyId,
  companies,
  workMode,
  status,
  source,
  positionTitle,
  location,
  salaryMin,
  salaryMax,
  note,
  errors,
  onCompanyIdChange,
  onWorkModeChange,
  onStatusChange,
  onSourceChange,
  onPositionTitleChange,
  onLocationChange,
  onSalaryMinChange,
  onSalaryMaxChange,
  onNoteChange,
  onClose,
  onSave,
}: JobApplicationFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors.companyId)}
        >
          <InputLabel>Company</InputLabel>

          <Select
            label="Company"
            value={companyId}
            onChange={(event) => onCompanyIdChange(event.target.value)}
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id.toString()}>
                {company.name}
              </MenuItem>
            ))}
          </Select>

          {errors.companyId && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0.5, ml: 1.5 }}
            >
              {errors.companyId}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Work Mode</InputLabel>

          <Select
            label="Work Mode"
            value={workMode}
            onChange={(event) => onWorkModeChange(event.target.value)}
          >
            <MenuItem value="0">Onsite</MenuItem>
            <MenuItem value="1">Hybrid</MenuItem>
            <MenuItem value="2">Remote</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Source</InputLabel>

          <Select
            label="Source"
            value={source}
            onChange={(event) => onSourceChange(event.target.value)}
          >
            <MenuItem value="0">Profesia</MenuItem>
            <MenuItem value="1">LinkedIn</MenuItem>
            <MenuItem value="2">CompanyWebsite</MenuItem>
            <MenuItem value="3">Referral</MenuItem>
            <MenuItem value="4">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>

          <Select
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <MenuItem value="0">Draft</MenuItem>
            <MenuItem value="1">Applied</MenuItem>
            <MenuItem value="2">Interview</MenuItem>
            <MenuItem value="3">Rejected</MenuItem>
            <MenuItem value="4">Offer</MenuItem>
            <MenuItem value="5">Accepted</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Position Title"
          value={positionTitle}
          onChange={(event) => onPositionTitleChange(event.target.value)}
          error={Boolean(errors.positionTitle)}
          helperText={errors.positionTitle}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Location"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          error={Boolean(errors.location)}
          helperText={errors.location}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Salary Min"
          value={salaryMin}
          onChange={(event) => onSalaryMinChange(event.target.value)}
          error={Boolean(errors.salaryMin)}
          helperText={errors.salaryMin}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Salary Max"
          value={salaryMax}
          onChange={(event) => onSalaryMaxChange(event.target.value)}
          error={Boolean(errors.salaryMax)}
          helperText={errors.salaryMax}
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
