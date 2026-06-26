using ApplyFlow.Api.Authentication.Models;
using ApplyFlow.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace ApplyFlow.Api.Authentication.Repository;

public class AppUserRepository : IAppUserRepository
{
    private readonly ApplyFlowDbContext _dbContext;

    public AppUserRepository(ApplyFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<AppUser?> GetByEmailAsync(string email)
    {
        return await _dbContext.AppUsers
            .FirstOrDefaultAsync(user => user.Email == email);
    }

    public async Task CreateAsync(AppUser user)
    {
        _dbContext.AppUsers.Add(user);

        await _dbContext.SaveChangesAsync();
    }
}
