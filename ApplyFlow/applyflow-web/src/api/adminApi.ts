import type { AdminSummary } from "../features/admin/models/adminSummary";
import type { AdminUser } from "../features/admin/models/adminUser";
import type { UpdateUserRoleRequest } from "../features/admin/models/updateUserRoleRequest";
import { axiosClient } from "./axiosClient";

export async function getAdminSummary(): Promise<AdminSummary> {
  const response = await axiosClient.get<AdminSummary>("/admin/summary");
  return response.data;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const response = await axiosClient.get<AdminUser[]>("/admin/users");
  return response.data;
}

export async function updateUserRole(
  userId: number,
  request: UpdateUserRoleRequest,
): Promise<void> {
  await axiosClient.put(`/admin/users/${userId}/role`, request);
}
