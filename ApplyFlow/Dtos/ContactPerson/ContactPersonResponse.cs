namespace ApplyFlow.Api.Dtos.ContactPerson;

public class ContactPersonResponse
{
    public int Id { get; set; }

    public int CompanyId { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? Position { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }
}