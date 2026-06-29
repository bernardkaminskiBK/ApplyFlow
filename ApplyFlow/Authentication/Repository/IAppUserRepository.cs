using ApplyFlow.Api.Authentication.Models;

namespace ApplyFlow.Api.Authentication.Repository;

public interface IAppUserRepository
{
    Task<AppUser?> GetByEmailAsync(string email);
    Task CreateAsync(AppUser user);
    Task<List<AppUser>> GetAllAsync();
    Task<AppUser?> GetByIdAsync(int id);
    Task UpdateAsync(AppUser user);
}
