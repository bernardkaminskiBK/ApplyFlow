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

import { getContactPersonById } from "../../../api/contactPersonsApi";

import type { ContactPerson } from "../models/contactPerson";
import DetailRow from "../../../components/common/DetailRow";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function ContactPersonDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState<ContactPerson | null>(null);

  useEffect(() => {
    async function loadContact() {
      if (!id) {
        return;
      }

      const data = await getContactPersonById(Number(id));

      setContact(data);
    }

    loadContact();
  }, [id]);

  if (!contact) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate("/contact-persons")}>
        Back to Contacts
      </Button>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {contact.name}
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            {contact.companyName}
          </Typography>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <DetailRow label="Company" value={contact.companyName} />
            <DetailRow label="Name" value={contact.name} />
            <DetailRow label="Position" value={contact.position} />
            <DetailRow label="Email" value={contact.email} />
            <DetailRow label="Phone" value={contact.phoneNumber} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
