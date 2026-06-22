import { Card, CardContent, Typography } from "@mui/material";

type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography align="center" variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
