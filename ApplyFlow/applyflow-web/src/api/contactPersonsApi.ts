import { axiosClient } from "./axiosClient";
import type { ContactPerson } from "../types/contactPerson/contactPerson";

export type CreateContactPersonRequest = {
  companyId: number;
  name: string;
  position?: string;
  email?: string;
  phone?: string;
};

export type UpdateContactPersonRequest = CreateContactPersonRequest;

export async function getContactPersons(): Promise<ContactPerson[]> {
  const response = await axiosClient.get<ContactPerson[]>("/contact-persons");

  return response.data;
}

export async function getContactPersonById(id: number): Promise<ContactPerson> {
  const response = await axiosClient.get<ContactPerson>(
    `/contact-persons/${id}`,
  );

  return response.data;
}

export async function createContactPerson(
  request: CreateContactPersonRequest,
): Promise<ContactPerson> {
  const response = await axiosClient.post<ContactPerson>(
    "/contact-persons",
    request,
  );

  return response.data;
}

export async function updateContactPerson(
  id: number,
  request: UpdateContactPersonRequest,
): Promise<void> {
  await axiosClient.put(`/contact-persons/${id}`, request);
}

export async function deleteContactPerson(id: number): Promise<void> {
  await axiosClient.delete(`/contact-persons/${id}`);
}
