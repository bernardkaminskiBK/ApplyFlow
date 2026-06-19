import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { CompanyFormErrors } from "../models/companyFormErrors";
import type { CompanyFormValues } from "../models/companyFormValues";

type CompanyFormDialogProps = {
  open: boolean;
  title: string;
  form: CompanyFormValues;
  errors: CompanyFormErrors;
  onChange: (field: keyof CompanyFormValues, value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function CompanyFormDialog({
  open,
  title,
  form,
  errors,
  onChange,
  onClose,
  onSave,
}: CompanyFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />

        <TextField
          label="City"
          value={form.city}
          onChange={(e) => onChange("city", e.target.value)}
          error={Boolean(errors.city)}
          helperText={errors.city}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Website"
          value={form.website}
          onChange={(e) => onChange("website", e.target.value)}
          error={Boolean(errors.website)}
          helperText={errors.website}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Note"
          value={form.note}
          onChange={(e) => onChange("note", e.target.value)}
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
