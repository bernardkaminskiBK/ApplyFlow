import { axiosClient } from "../../../api/axiosClient";
import type { AuthResponse } from "../models/authResponse";
import type { LoginRequest } from "../models/loginRequest";
import type { RegisterRequest } from "../models/registerRequest";

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/login", request);
  return response.data;
}

export async function register(request: RegisterRequest): Promise<void> {
  await axiosClient.post("/auth/register", request);
}
