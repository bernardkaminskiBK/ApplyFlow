export type JobApplicationFormValues = {
  companyId: number;
  companyName: string;
  positionTitle: string;
  location?: string;
  workMode: number;
  status: number;
  source: number;
  appliedDate: string;
  salaryMin?: number;
  salaryMax?: number;
  note?: string;
};
