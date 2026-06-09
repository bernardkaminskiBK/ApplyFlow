import { Box, Typography } from "@mui/material";

type DetailRowProps = {
  label: string;
  value?: string;
};

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Box>
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="subtitle2"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography variant="body1">{value || "-"}</Typography>
    </Box>
  );
}
