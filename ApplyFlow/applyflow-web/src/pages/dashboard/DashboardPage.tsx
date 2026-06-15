import { Box, Grid, Typography } from "@mui/material";

import ErrorSnackbar from "../../components/common/ErrorSnackbar";
import DashboardContent from "../../components/Dashboard/DashboardContent";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useDashboard } from "./useDashboard";

export default function DashboardPage() {
  const { stats, loading, error, clearError } = useDashboard();

  const dashboardCards = [
    { title: "Companies", value: stats.companyCount },
    { title: "Job Applications", value: stats.applicationCount },
    { title: "Application Events", value: stats.eventCount },
    { title: "Contact Persons", value: stats.contactCount },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              value={card.value}
            />
          ))}
        </Grid>
      </Box>

      <DashboardContent />

      <ErrorSnackbar
        open={Boolean(error)}
        message={error}
        onClose={clearError}
      />
    </>
  );
}
