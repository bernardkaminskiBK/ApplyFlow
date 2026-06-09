import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
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
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>{children}</Container>
    </Box>
  );
}
