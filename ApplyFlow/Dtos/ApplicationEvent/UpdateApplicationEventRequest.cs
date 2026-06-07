using ApplyFlow.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace ApplyFlow.Api.Dtos.ApplicationEvents;

public class UpdateApplicationEventRequest
{
    public ApplicationEventType EventType { get; set; }

    public DateOnly EventDate { get; set; }

    [StringLength(1000)]
    public string? Note { get; set; }
}
