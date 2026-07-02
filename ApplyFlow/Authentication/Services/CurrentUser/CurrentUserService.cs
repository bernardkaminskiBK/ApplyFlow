using System.Security.Claims;

namespace ApplyFlow.Api.Authentication.Services.CurrentUser
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int UserId =>
            int.Parse(
                _httpContextAccessor.HttpContext!
                    .User
                    .FindFirst(ClaimTypes.NameIdentifier)!
                    .Value);

        public string Email =>
            _httpContextAccessor.HttpContext!
                .User
                .FindFirst(ClaimTypes.Email)!
                .Value;

        public string Role =>
            _httpContextAccessor.HttpContext!
                .User
                .FindFirst(ClaimTypes.Role)!
                .Value;
    }
}
