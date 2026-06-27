import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import { register } from "../../../api/authApi";
import type { AuthFormErrors } from "../models/authFormErrors";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors | null>(null);

  async function handleRegister() {
    try {
      setLoading(true);
      setErrors(null);

      await register({
        email,
        password,
      });

      navigate("/login", {
        replace: true,
        state: {
          successMessage:
            "Registration completed successfully. Please sign in.",
        },
      });
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;
      const registerErrorMessage = error.response?.data?.message || "";

      if (validationErrors || registerErrorMessage) {
        setErrors({
          email: validationErrors?.Email?.[0],
          password: validationErrors?.Password?.[0],
          message: "Registration failed. " + registerErrorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
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
      <Paper elevation={3} sx={{ width: 400, p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              Create account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Register to start using ApplyFlow
            </Typography>
          </Box>

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
            onClick={handleRegister}
            disabled={loading}
            fullWidth
          >
            {loading ? "Creating account..." : "Register"}
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
