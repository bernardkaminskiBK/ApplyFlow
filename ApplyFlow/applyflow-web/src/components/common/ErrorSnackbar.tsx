import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type ErrorSnackBarProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export default function ErrorSnackbar({
  open,
  message,
  onClose,
}: ErrorSnackBarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert severity="error" variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
