import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type { AdminSummary } from "../models/adminSummary";
import {
  getAdminSummary,
  getAdminUsers,
  updateUserRole,
} from "../../../api/adminApi";
import type { AdminUser } from "../models/adminUser";

export default function AdminPage() {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function loadAdminData() {
    try {
      setError(null);

      const [summaryData, usersData] = await Promise.all([
        getAdminSummary(),
        getAdminUsers(),
      ]);

      setSummary(summaryData);
      setUsers(usersData);
    } catch {
      setError("You do not have permission to view this page.");
    }
  }

  async function handleRoleChange(userId: number, role: string) {
    try {
      setError(null);
      setSuccessMessage(null);

      await updateUserRole(userId, { role });
      await loadAdminData();

      setSuccessMessage("User role updated successfully.");
    } catch {
      setError("User role could not be updated.");
    }
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Admin
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {summary && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">{summary.message}</Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Server time: {summary.serverTime}
          </Typography>
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Users
        </Typography>

        {users.map((user) => (
          <Box
            key={user.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 1,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography sx={{ flex: 1 }}>{user.email}</Typography>

            <TextField
              select
              size="small"
              label="Role"
              value={user.role}
              sx={{ width: 160 }}
              onChange={(event) =>
                handleRoleChange(user.id, event.target.value)
              }
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
