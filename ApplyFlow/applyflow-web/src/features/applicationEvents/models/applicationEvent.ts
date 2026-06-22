export type ApplicationEvent = {
  id: number;
  jobApplicationId: number;
  positionTitle: string;
  companyName: string;
  eventType: number;
  eventDate: string;
  note?: string;
};
