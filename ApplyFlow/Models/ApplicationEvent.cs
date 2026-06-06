using ApplyFlow.Api.Enums;

namespace ApplyFlow.Api.Models;

public class ApplicationEvent
{
    public int Id { get; set; }

    public int JobApplicationId { get; set; }
    public JobApplication JobApplication { get; set; } = null!;

    public ApplicationEventType EventType { get; set; }
    public DateOnly EventDate { get; set; }

    public string? Note { get; set; }
}