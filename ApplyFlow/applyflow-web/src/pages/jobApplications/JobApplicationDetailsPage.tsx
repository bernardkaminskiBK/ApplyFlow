import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobApplicationById } from "../../api/jobApplicationsApi";
import type { JobApplication } from "../../types/JobApplication/jobApplication";
import DetailRow from "../../components/common/DetailRow";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import {
  getStatusInfo,
  getWorkModeText,
} from "../../utils/jobApplicationHelpers";

export default function JobApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    async function loadApplication() {
      if (!id) return;

      const data = await getJobApplicationById(Number(id));
      setApplication(data);
    }

    loadApplication();
  }, [id]);

  if (!application) {
    return <Typography>Loading...</Typography>;
  }

  const statusInfo = getStatusInfo(application.status);

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate("/job-applications")}>
        Back to Applications
      </Button>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {application.positionTitle}
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            {application.companyName}
          </Typography>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <DetailRow label="Location" value={application.location} />
            <DetailRow label="Status" value={statusInfo.text} />
            <DetailRow
              label="Work Mode"
              value={getWorkModeText(application.workMode)}
            />
            <DetailRow label="Applied Date" value={application.appliedDate} />
            <DetailRow
              label="Salary"
              value={`${application.salaryMin ?? "-"} - ${
                application.salaryMax ?? "-"
              }`}
            />
            <DetailRow label="Note" value={application.note} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
