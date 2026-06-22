import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import { useCompaniesLookup } from "../../../shared/hooks/useCompaniesLookup";
import type { ContactPersonFormErrors } from "../models/ContactPersonFormErrors";
import type { ContactPersonFormValues } from "../models/contactPersonFormValues";

type ContactPersonFormDialogProps = {
  open: boolean;
  title: string;
  form: ContactPersonFormValues;
  errors: ContactPersonFormErrors;
  onChange: (
    field: keyof ContactPersonFormValues,
    value: string | number,
  ) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function ContactPersonFormDialog({
  open,
  title,
  form,
  errors,
  onChange,
  onClose,
  onSave,
}: ContactPersonFormDialogProps) {
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

        <TextField
          label="Name"
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Position"
          value={form.position}
          onChange={(event) => onChange("position", event.target.value)}
          error={Boolean(errors.position)}
          helperText={errors.position}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          value={form.email}
          onChange={(event) => onChange("email", event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Phone"
          value={form.phoneNumber}
          onChange={(event) => onChange("phoneNumber", event.target.value)}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
          fullWidth
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
