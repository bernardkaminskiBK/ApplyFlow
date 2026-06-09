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

import type { Company } from "../../types/company/company";
import type { ContactPersonFormErrors } from "../../types/contactPerson/ContactPersonFormErrors";

type ContactPersonFormDialogProps = {
  open: boolean;
  title: string;

  companies: Company[];

  companyId: string;
  name: string;
  position: string;
  email: string;
  phone: string;

  errors: ContactPersonFormErrors;

  onCompanyIdChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;

  onClose: () => void;
  onSave: () => void;
};

export default function ContactPersonFormDialog({
  open,
  title,
  companies,
  companyId,
  name,
  position,
  email,
  phone,
  errors,
  onCompanyIdChange,
  onNameChange,
  onPositionChange,
  onEmailChange,
  onPhoneChange,
  onClose,
  onSave,
}: ContactPersonFormDialogProps) {
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

        <TextField
          label="Name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Position"
          value={position}
          onChange={(event) => onPositionChange(event.target.value)}
          error={Boolean(errors.position)}
          helperText={errors.position}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Phone"
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
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
    </Dialog>
  );
}
