import { Alert, Snackbar } from "@mui/material";

type SuccessSnackbarProps = {
  open: boolean;
  message: string | null;
  onClose: () => void;
};

export default function SuccessSnackbar({
  open,
  message,
  onClose,
}: SuccessSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert severity="success" variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
