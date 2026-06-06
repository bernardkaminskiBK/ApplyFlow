using ApplyFlow.Api.Dtos.Common;
using Microsoft.AspNetCore.Diagnostics;

namespace ApplyFlow.Api.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var response = exception switch
        {
            CompanyAlreadyExistsException => (StatusCodes.Status409Conflict, exception.Message),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred.")
        };

        httpContext.Response.StatusCode = response.Item1;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(
            new ErrorResponse
            {
                Message = response.Item2
            },
            cancellationToken
        );

        return true;
    }
}