import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../../../api/authApi";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import type { AuthFormErrors } from "../models/authFormErrors";

export default function LoginPage() {
  const navigate = useNavigate();
  const successMessage = useLocation().state?.successMessage;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors | null>(null);

  async function handleLogin() {
    try {
      setLoading(true);
      setErrors(null);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);

      navigate("/");
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;
      const registerErrorMessage = error.response?.data?.message || "";

      if (validationErrors || registerErrorMessage) {
        setErrors({
          email: validationErrors?.Email?.[0],
          password: validationErrors?.Password?.[0],
          message: "Login failed. " + registerErrorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              ApplyFlow
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sign in to continue
            </Typography>
          </Box>

          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errors?.message && <Alert severity="error">{errors.message}</Alert>}

          <TextField
            label="Email"
            value={email}
            error={Boolean(errors?.email)}
            helperText={errors?.email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            error={Boolean(errors?.password)}
            helperText={errors?.password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link component={RouterLink} to="/register">
              Register
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
