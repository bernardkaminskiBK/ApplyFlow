type StatusInfo = {
  text: string;
  color: "default" | "primary" | "secondary" | "success" | "error" | "warning";
};

export function getStatusInfo(status: number): StatusInfo {
  switch (status) {
    case 0:
      return {
        text: "Draft",
        color: "default",
      };

    case 1:
      return {
        text: "Applied",
        color: "primary",
      };

    case 2:
      return {
        text: "Interview",
        color: "warning",
      };

    case 3:
      return {
        text: "Rejected",
        color: "error",
      };

    case 4:
      return {
        text: "Offer",
        color: "success",
      };

    case 5:
      return {
        text: "Accepted",
        color: "success",
      };

    default:
      return {
        text: "Unknown",
        color: "default",
      };
  }
}

export function getWorkModeText(workMode: number): string {
  switch (workMode) {
    case 0:
      return "Onsite";
    case 1:
      return "Hybrid";
    case 2:
      return "Remote";
    default:
      return "Unknown";
  }
}

export function getSourceText(workMode: number): string {
  switch (workMode) {
    case 0:
      return "Profesia";
    case 1:
      return "LinkedIn";
    case 2:
      return "CompanyWebsite";
    case 3:
      return "Referral";
    case 4:
      return "Other";
    default:
      return "Unknown";
  }
}
