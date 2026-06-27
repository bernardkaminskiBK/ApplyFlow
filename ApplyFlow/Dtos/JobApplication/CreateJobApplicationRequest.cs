using ApplyFlow.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace ApplyFlow.Api.Dtos.JobApplications;

public class CreateJobApplicationRequest
{
    [Range(1, int.MaxValue, ErrorMessage = "The Company field is required.")]
    public int CompanyId { get; set; }

    [Required]
    [StringLength(150)]
    public string PositionTitle { get; set; } = string.Empty;

    [StringLength(100)]
    public string? Location { get; set; }

    public WorkMode WorkMode { get; set; }

    public ApplicationStatus Status { get; set; }

    public ApplicationSource Source { get; set; }

    public DateOnly AppliedDate { get; set; }

    [Range(0, 100000)]
    public int? SalaryMin { get; set; }

    [Range(0, 100000)]
    public int? SalaryMax { get; set; }

    [StringLength(1000)]
    public string? Note { get; set; }
}