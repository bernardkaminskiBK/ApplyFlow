import { axiosClient } from "./axiosClient";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/login", request);

  return response.data;
}

export async function register(request: RegisterRequest): Promise<void> {
  await axiosClient.post("/auth/register", request);
}
