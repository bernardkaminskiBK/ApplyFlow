import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#58A6FF",
    },

    secondary: {
      main: "#A371F7",
    },

    background: {
      default: "#0D1117",
      paper: "#161B22",
    },

    text: {
      primary: "#F0F6FC",
      secondary: "#8B949E",
    },

    divider: "#30363D",
  },
});
