
using ApplyFlow.Api.Authentication.Dtos;

namespace ApplyFlow.Api.Authentication.Services;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequest request);

    Task LoginAsync(LoginRequest request);
}
