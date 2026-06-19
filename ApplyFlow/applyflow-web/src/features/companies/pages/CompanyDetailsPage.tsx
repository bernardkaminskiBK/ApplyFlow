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
import DetailRow from "../../../components/common/DetailRow";
import type { Company } from "../models/company";
import { getCompanyById } from "../../../api/companiesApi";

export default function CompanyDetailsPage() {
  const [company, setCompany] = useState<Company | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompany();
  }, [id]);

  async function loadCompany() {
    if (!id) {
      return;
    }

    const data = await getCompanyById(Number(id));

    setCompany(data);
  }

  if (!company) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate("/companies")}>
        Back to Companies
      </Button>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {company.name}
          </Typography>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <DetailRow label="City" value={company.city} />
            <DetailRow label="Website" value={company.website} />
            <DetailRow label="Note" value={company.note} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
