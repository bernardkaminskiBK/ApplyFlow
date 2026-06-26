using ApplyFlow.Api.Authentication.Dtos;

namespace ApplyFlow.Api.Authentication.Services.Auth;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequest request);

    Task<AuthResponse> LoginAsync(LoginRequest request);
}
