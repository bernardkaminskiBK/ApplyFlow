using ApplyFlow.Api.Enums;

namespace ApplyFlow.Api.Dtos.ApplicationEvents;

public class ApplicationEventResponse
{
    public int Id { get; set; }

    public int JobApplicationId { get; set; }

    public string PositionTitle { get; set; } = string.Empty;

    public string CompanyName { get; set; } = string.Empty;

    public ApplicationEventType EventType { get; set; }

    public DateOnly EventDate { get; set; }

    public string? Note { get; set; }
}