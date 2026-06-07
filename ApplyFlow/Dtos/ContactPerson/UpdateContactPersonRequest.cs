using System.ComponentModel.DataAnnotations;

namespace ApplyFlow.Api.Dtos.ContactPerson;

public class UpdateContactPersonRequest
{
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