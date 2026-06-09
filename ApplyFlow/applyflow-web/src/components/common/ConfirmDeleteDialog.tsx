import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type ConfirmDeleteDialogProps = {
  open: boolean;
  title?: string;
  itemName?: string;
  itemType?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteDialog({
  open,
  title = "Delete item",
  itemName,
  itemType = "item",
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this {itemType}
          {itemName ? ` "${itemName}"` : ""}?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
