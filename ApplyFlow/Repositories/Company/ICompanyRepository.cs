using ApplyFlow.Api.Models;

namespace ApplyFlow.Api.Repositories;

public interface ICompanyRepository
{
    Task<List<Company>> GetAllAsync();
    Task<Company?> GetByIdAsync(int id);
    Task<Company?> GetByNameAsync(string name);
    Task<Company> CreateAsync(Company company);
    Task UpdateAsync(Company company);
    Task DeleteAsync(Company company);
}
