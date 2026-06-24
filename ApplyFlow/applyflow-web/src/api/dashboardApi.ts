import type { DashboardStats } from "../features/dashboard/models/DashboardStats";
import { axiosClient } from "./axiosClient";

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await axiosClient.get<DashboardStats>("/dashboard/stats");
  return response.data;
}
