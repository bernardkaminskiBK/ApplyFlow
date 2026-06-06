namespace ApplyFlow.Api.Exceptions;

public class CompanyAlreadyExistsException : Exception
{
    public CompanyAlreadyExistsException(string companyName) : base($"Company '{companyName}' already exists.")
    {
    }
}