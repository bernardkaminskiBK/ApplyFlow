using ApplyFlow.Api.Models;

namespace ApplyFlow.Api.Repositories;

public interface ICompanyRepository
{
    Task<List<Company>> GetAllAsync(int appUserId);

    Task<Company?> GetByIdAsync(int id, int appUserId);

    Task<Company?> GetByNameAsync(string name, int appUserId);

    Task<Company> CreateAsync(Company company);

    Task UpdateAsync(Company company);

    Task DeleteAsync(Company company);

    Task<int> CountAsync(int appUserId);
}
