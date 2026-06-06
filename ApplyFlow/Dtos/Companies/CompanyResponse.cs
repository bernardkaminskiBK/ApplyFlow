namespace ApplyFlow.Api.Dtos.Companies;

public class CompanyResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? Website { get; set; }
    public string? Note { get; set; }
}