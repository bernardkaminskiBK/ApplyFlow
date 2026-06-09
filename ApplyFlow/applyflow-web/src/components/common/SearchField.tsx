import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export default function SearchField({
  value,
  onChange,
  label = "Search",
}: SearchFieldProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      sx={{ mb: 3 }}
      slotProps={{
        input: {
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onChange("")}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
