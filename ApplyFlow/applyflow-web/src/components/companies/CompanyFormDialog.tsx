import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { CompanyFormErrors } from "../../types/company/companyFormErrors";

type CompanyFormDialogProps = {
  open: boolean;
  title: string;
  name: string;
  city: string;
  website: string;
  note: string;
  errors: CompanyFormErrors;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function CompanyFormDialog({
  open,
  title,
  name,
  city,
  website,
  note,
  errors,
  onNameChange,
  onCityChange,
  onWebsiteChange,
  onNoteChange,
  onClose,
  onSave,
}: CompanyFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />

        <TextField
          label="City"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          error={Boolean(errors.city)}
          helperText={errors.city}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Website"
          value={website}
          onChange={(e) => onWebsiteChange(e.target.value)}
          error={Boolean(errors.website)}
          helperText={errors.website}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Note"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
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
