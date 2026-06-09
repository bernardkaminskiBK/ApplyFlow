import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { getApplicationEventById } from "../../api/applicationEventsApi";
import type { ApplicationEvent } from "../../types/applicationEvent/applicationEvent";
import { getEventTypeText } from "../../utils/applicationEventHelpers";
import DetailRow from "../../components/common/DetailRow";

export default function ApplicationEventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<ApplicationEvent | null>(null);

  useEffect(() => {
    async function loadEvent() {
      if (!id) return;

      const data = await getApplicationEventById(Number(id));
      setEvent(data);
    }

    loadEvent();
  }, [id]);

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => navigate("/application-events")}
      >
        Back to Events
      </Button>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {getEventTypeText(event.eventType)}
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            {event.companyName} - {event.positionTitle}
          </Typography>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <DetailRow label="Company" value={event.companyName} />
            <DetailRow label="Position" value={event.positionTitle} />
            <DetailRow
              label="Event Type"
              value={getEventTypeText(event.eventType)}
            />
            <DetailRow label="Event Date" value={event.eventDate} />
            <DetailRow label="Note" value={event.note} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
