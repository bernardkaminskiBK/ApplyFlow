import { Box, Button, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function PageHeader({
  title,
  buttonText,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      <Typography variant="h4">{title}</Typography>

      {buttonText && onButtonClick && (
        <Button variant="contained" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
}
