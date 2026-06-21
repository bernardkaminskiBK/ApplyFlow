import type { JobApplication } from "../features/jobApplications/models/jobApplication";
import { axiosClient } from "./axiosClient";

export type CreateJobApplicationRequest = {
  companyId: number;
  positionTitle: string;
  location?: string;
  workMode: number;
  status: number;
  source: number;
  appliedDate: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  note?: string;
};

export type UpdateJobApplicationRequest = CreateJobApplicationRequest;

export async function getJobApplications(): Promise<JobApplication[]> {
  const response = await axiosClient.get<JobApplication[]>("/job-applications");
  return response.data;
}

export async function getJobApplicationById(
  id: number,
): Promise<JobApplication> {
  const response = await axiosClient.get<JobApplication>(
    `/job-applications/${id}`,
  );

  return response.data;
}

export async function createJobApplication(
  request: CreateJobApplicationRequest,
): Promise<JobApplication> {
  const response = await axiosClient.post<JobApplication>(
    "/job-applications",
    request,
  );

  return response.data;
}

export async function updateJobApplication(
  id: number,
  request: UpdateJobApplicationRequest,
): Promise<void> {
  await axiosClient.put(`/job-applications/${id}`, request);
}

export async function deleteJobApplication(id: number): Promise<void> {
  await axiosClient.delete(`/job-applications/${id}`);
}
