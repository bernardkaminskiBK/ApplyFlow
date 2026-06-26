using ApplyFlow.Api.Authentication.Dtos;
using ApplyFlow.Api.Authentication.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Authentication.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{

    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterRequest registerRequest)
    {
        await _authService.RegisterAsync(registerRequest);

        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest loginRequest)
    {
        var authResponse = await _authService.LoginAsync(loginRequest);

        return Ok(authResponse);
    }

}
