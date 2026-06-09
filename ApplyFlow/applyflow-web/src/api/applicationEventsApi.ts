import { axiosClient } from "./axiosClient";
import type { ApplicationEvent } from "../types/applicationEvent/applicationEvent";

export type CreateApplicationEventRequest = {
  jobApplicationId: number;
  eventType: number;
  eventDate: string;
  note?: string;
};

export type UpdateApplicationEventRequest = {
  eventType: number;
  eventDate: string;
  note?: string;
};

export async function getApplicationEvents(): Promise<ApplicationEvent[]> {
  const response = await axiosClient.get<ApplicationEvent[]>(
    "/application-events",
  );

  return response.data;
}

export async function getApplicationEventById(
  id: number,
): Promise<ApplicationEvent> {
  const response = await axiosClient.get<ApplicationEvent>(
    `/application-events/${id}`,
  );

  return response.data;
}

export async function createApplicationEvent(
  request: CreateApplicationEventRequest,
): Promise<ApplicationEvent> {
  const response = await axiosClient.post<ApplicationEvent>(
    "/application-events",
    request,
  );

  return response.data;
}

export async function updateApplicationEvent(
  id: number,
  request: UpdateApplicationEventRequest,
): Promise<void> {
  await axiosClient.put(`/application-events/${id}`, request);
}

export async function deleteApplicationEvent(id: number): Promise<void> {
  await axiosClient.delete(`/application-events/${id}`);
}
