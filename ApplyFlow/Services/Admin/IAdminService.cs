using ApplyFlow.Api.Dtos.Admin;

namespace ApplyFlow.Api.Services.Admin;

public interface IAdminService
{
    Task<List<AdminUserResponse>> GetUsersAsync();
    Task<bool> UpdateUserRoleAsync(int userId, UpdateUserRoleRequest request);
}
