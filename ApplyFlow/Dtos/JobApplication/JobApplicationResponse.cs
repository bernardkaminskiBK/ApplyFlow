using ApplyFlow.Api.Enums;

namespace ApplyFlow.Api.Dtos.JobApplications;

public class JobApplicationResponse
{
    public int Id { get; set; }

    public int CompanyId { get; set; }
    public string CompanyName { get; set; } = string.Empty;

    public string PositionTitle { get; set; } = string.Empty;
    public string? Location { get; set; }

    public WorkMode WorkMode { get; set; }
    public ApplicationStatus Status { get; set; }
    public ApplicationSource Source { get; set; }

    public DateOnly AppliedDate { get; set; }

    public int? SalaryMin { get; set; }
    public int? SalaryMax { get; set; }

    public string? Note { get; set; }
}