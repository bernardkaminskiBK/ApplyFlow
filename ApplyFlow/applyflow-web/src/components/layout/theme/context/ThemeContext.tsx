import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { darkTheme, lightTheme } from "../theme";
import { ThemeProvider } from "@emotion/react";

type ThemeContextValue = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  function toggleTheme() {
    setDarkMode((previous) => !previous);
  }

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider.");
  }

  return context;
}
