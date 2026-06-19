import { axiosClient } from "./axiosClient";
import type { Company } from "../features/companies/models/company";

export type CreateCompanyRequest = {
  name: string;
  city?: string;
  website?: string;
  note?: string;
};

export type UpdateCompanyRequest = CreateCompanyRequest;

export async function getCompanies(): Promise<Company[]> {
  const response = await axiosClient.get<Company[]>("/companies");
  return response.data;
}

export async function createCompany(
  request: CreateCompanyRequest,
): Promise<Company> {
  const response = await axiosClient.post<Company>("/companies", request);
  return response.data;
}

export async function getCompanyById(id: number): Promise<Company> {
  const response = await axiosClient.get<Company>(`/companies/${id}`);
  return response.data;
}

export async function updateCompany(
  id: number,
  request: UpdateCompanyRequest,
): Promise<void> {
  await axiosClient.put(`/companies/${id}`, request);
}

export async function deleteCompany(id: number): Promise<void> {
  await axiosClient.delete(`/companies/${id}`);
}
