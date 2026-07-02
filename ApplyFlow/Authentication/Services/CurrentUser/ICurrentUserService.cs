namespace ApplyFlow.Api.Authentication.Services.CurrentUser;

public interface ICurrentUserService
{
    int UserId { get; }

    string Email { get; }

    string Role { get; }
}
