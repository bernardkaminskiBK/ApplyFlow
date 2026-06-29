using ApplyFlow.Api.Authentication.Repository;
using ApplyFlow.Api.Dtos.Admin;

namespace ApplyFlow.Api.Services.Admin;

public class AdminService : IAdminService
{
    private readonly IAppUserRepository _appUserRepository;

    public AdminService(IAppUserRepository appUserRepository)
    {
        _appUserRepository = appUserRepository;
    }

    public async Task<List<AdminUserResponse>> GetUsersAsync()
    {
        var users = await _appUserRepository.GetAllAsync();

        return users
            .Select(user => new AdminUserResponse
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role
            })
            .ToList();
    }

    public async Task<bool> UpdateUserRoleAsync(int userId, UpdateUserRoleRequest request)
    {
        var user = await _appUserRepository.GetByIdAsync(userId);

        if (user is null)
        {
            return false;
        }

        user.Role = request.Role;

        await _appUserRepository.UpdateAsync(user);

        return true;
    }
}
