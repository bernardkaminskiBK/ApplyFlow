import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default function DashboardContent() {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          About ApplyFlow
        </Typography>

        <Typography sx={{ mb: 2 }}>
          ApplyFlow is a small job application tracking system built as a
          full-stack learning and demonstration project.
        </Typography>

        <Typography sx={{ mb: 2 }}>
          The goal of the project is to show practical understanding of a
          typical business application workflow: managing companies, job
          applications, application events, and contact persons through a clean
          REST API and a React frontend.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Source Code
        </Typography>

        <Typography>
          The source code for this project is publicly available on GitHub.
        </Typography>

        <Button
          variant="contained"
          href="https://github.com/bernardkaminskiBK/applyflow-web.git"
          target="_blank"
        >
          View Frontend Repository
        </Button>

        <Button
          variant="outlined"
          href="https://github.com/bernardkaminskiBK/ApplyFlow.git"
          target="_blank"
          sx={{ ml: 2 }}
        >
          View Backend Repository
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Implemented features
        </Typography>

        <List dense>
          {[
            "ASP.NET Core Web API backend",
            "Entity Framework Core with SQL Server",
            "CRUD operations for all main entities",
            "DTO-based API design",
            "Validation and global exception handling",
            "React + TypeScript frontend",
            "Material UI components",
            "Axios-based REST API communication",
            "React Router navigation",
            "List, create, edit, delete and details pages",
            "Reusable components such as page headers, search fields and confirmation dialogs",
            "Client-side search/filtering for demonstration purposes",
          ].map((feature) => (
            <ListItem key={feature} disablePadding>
              <ListItemText primary={`• ${feature}`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Design decisions
        </Typography>

        <Typography sx={{ mb: 2 }}>
          This project focuses on clarity, maintainability and practical
          workflow instead of unnecessary complexity.
        </Typography>

        <Typography sx={{ mb: 2 }}>
          For the first version, client-side filtering was used because the
          dataset is small and the goal is to demonstrate the application flow.
          In a production system, filtering, sorting and pagination would
          usually be handled on the backend.
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Material UI was used to avoid spending too much time on custom styling
          and to focus mainly on application structure, REST API integration and
          business logic.
        </Typography>

        <Typography sx={{ mb: 2 }}>
          The project intentionally prioritizes learning goals and demonstration
          value over enterprise-level complexity.
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Advanced topics such as server-side filtering, pagination, caching,
          authentication, authorization, performance optimization, monitoring,
          logging and security hardening are intentionally kept out of scope for
          the first version.
        </Typography>

        <Typography sx={{ mb: 2 }}>
          The purpose of this project is to demonstrate understanding of common
          full-stack development patterns and application architecture rather
          than to provide a production-ready enterprise solution.
        </Typography>

        <Typography>
          These areas would be natural candidates for future iterations of the
          project.
        </Typography>
      </CardContent>
    </Card>
  );
}
