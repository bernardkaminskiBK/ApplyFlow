export function getEventTypeText(eventType: number): string {
  switch (eventType) {
    case 0:
      return "Applied";

    case 1:
      return "Phone Screen";

    case 2:
      return "Interview";

    case 3:
      return "Technical Interview";

    case 4:
      return "Offer";

    case 5:
      return "Rejected";

    case 6:
      return "Follow Up";

    case 7:
      return "Note";

    default:
      return "Unknown";
  }
}
