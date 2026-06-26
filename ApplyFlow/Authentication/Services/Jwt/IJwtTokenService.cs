using ApplyFlow.Api.Authentication.Models;

namespace ApplyFlow.Api.Authentication.Services.Jwt
{
    public interface IJwtTokenService
    {
        string CreateToken(AppUser user);
    }
}
