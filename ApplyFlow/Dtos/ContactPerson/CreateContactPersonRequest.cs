using System.ComponentModel.DataAnnotations;

namespace ApplyFlow.Api.Dtos.ContactPerson;

public class CreateContactPersonRequest
{
    [Range(1, int.MaxValue, ErrorMessage = "The Company field is required.")]
    public int CompanyId { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string? Position { get; set; }

    [EmailAddress]
    [StringLength(200)]
    public string? Email { get; set; }

    [StringLength(50)]
    public string? PhoneNumber { get; set; }
}