import type { JobApplicationFormErrors } from "../models/jobApplicationErrors";
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
import type { JobApplicationFormValues } from "../models/jobApplicationFormValues";
import { useCompaniesLookup } from "../../../shared/hooks/useCompaniesLookup";
import { useEffect } from "react";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";

type JobApplicationFormDialogProps = {
  open: boolean;
  title: string;
  form: JobApplicationFormValues;
  errors: JobApplicationFormErrors;
  onChange: (field: keyof JobApplicationFormValues, value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function JobApplicationFormDialog({
  open,
  title,
  errors,
  form,
  onChange,
  onClose,
  onSave,
}: JobApplicationFormDialogProps) {
  const {
    companies,
    loadingCompanies,
    companyError,
    loadCompanies,
    clearCompanyError,
  } = useCompaniesLookup();

  useEffect(() => {
    if (open) {
      loadCompanies();
    }
  }, [open]);

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
            value={form.companyId}
            disabled={loadingCompanies}
            onChange={(event) =>
              onChange("companyId", event.target.value.toString())
            }
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id.toString()}>
                {company.name}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>
            {loadingCompanies && "Loading companies..."}
          </FormHelperText>

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
            value={form.workMode}
            onChange={(event) =>
              onChange("workMode", event.target.value.toString())
            }
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
            value={form.source}
            onChange={(event) =>
              onChange("source", event.target.value.toString())
            }
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
            value={form.status}
            onChange={(event) =>
              onChange("status", event.target.value.toString())
            }
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
          value={form.positionTitle}
          onChange={(event) => onChange("positionTitle", event.target.value)}
          error={Boolean(errors.positionTitle)}
          helperText={errors.positionTitle}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Location"
          value={form.location}
          onChange={(event) => onChange("location", event.target.value)}
          error={Boolean(errors.location)}
          helperText={errors.location}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Salary Min"
          value={form.salaryMin}
          onChange={(event) => onChange("salaryMin", event.target.value)}
          error={Boolean(errors.salaryMin)}
          helperText={errors.salaryMin}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Salary Max"
          value={form.salaryMax}
          onChange={(event) => onChange("salaryMax", event.target.value)}
          error={Boolean(errors.salaryMax)}
          helperText={errors.salaryMax}
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
        open={Boolean(companyError)}
        message={companyError}
        onClose={clearCompanyError}
      />
    </Dialog>
  );
}
