namespace ApplyFlow.Api.Exceptions;

public class JobApplicationNotFoundException : Exception
{
    public JobApplicationNotFoundException(int jobApplicationId) : base($"Job application with id '{jobApplicationId}' was not found.")
    {
    }
}