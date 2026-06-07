using System.ComponentModel.DataAnnotations;

namespace ApplyFlow.Api.Dtos.Company;

public class UpdateCompanyRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string? City { get; set; }

    [Url]
    [StringLength(300)]
    public string? Website { get; set; }

    [StringLength(1000)]
    public string? Note { get; set; }
}