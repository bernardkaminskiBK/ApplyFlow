namespace ApplyFlow.Api.Exceptions;

public class CompanyNotFoundException : Exception
{
    public CompanyNotFoundException(int companyId) : base($"Company with id '{companyId}' was not found.")
    {
    }
}