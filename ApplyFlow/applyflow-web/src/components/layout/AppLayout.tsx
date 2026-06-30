import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "../../features/auth/context/AuthContext";
import { useAppTheme } from "./theme/context/ThemeContext";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { darkMode, toggleTheme } = useAppTheme();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 4 }}>
            ApplyFlow
          </Typography>

          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>

          <Button color="inherit" component={RouterLink} to="/companies">
            Companies
          </Button>

          <Button color="inherit" component={RouterLink} to="/job-applications">
            Job Applications
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/application-events"
          >
            Events
          </Button>

          <Button color="inherit" component={RouterLink} to="/contact-persons">
            Contacts
          </Button>

          {user?.role === "Admin" && (
            <Button color="inherit" component={RouterLink} to="/admin">
              Admin
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Typography variant="body2" sx={{ ml: "auto", mr: 2 }}>
                {user?.email} ({user?.role})
              </Typography>
              <Avatar>{user?.role === "Admin" ? "A" : "U"}</Avatar>
            </>
          )}

          <Button
            color="inherit"
            sx={{ ml: "auto", fontWeight: "bold" }}
            onClick={logout}
          >
            Log out
          </Button>

          <Button color="inherit" onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>{children}</Container>
    </Box>
  );
}
