using ApplyFlow.Api.Data;
using ApplyFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplyFlow.Api.Repositories;

public class CompanyRepository : ICompanyRepository
{
    private readonly ApplyFlowDbContext _dbContext;

    public CompanyRepository(ApplyFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Company>> GetAllAsync()
    {
        return await _dbContext.Companies
            .AsNoTracking()
            .OrderBy(company => company.Name)
            .ToListAsync();
    }

    public async Task<Company?> GetByIdAsync(int id)
    {
        return await _dbContext.Companies
            .AsNoTracking()
            .FirstOrDefaultAsync(company => company.Id == id);
    }

    public async Task<Company?> GetByNameAsync(string name)
    {
        return await _dbContext.Companies
            .AsNoTracking()
            .FirstOrDefaultAsync(company => company.Name == name);
    }

    public async Task<Company> CreateAsync(Company company)
    {
        _dbContext.Companies.Add(company);
        await _dbContext.SaveChangesAsync();

        return company;
    }

    public async Task UpdateAsync(Company company)
    {
        _dbContext.Companies.Update(company);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Company company)
    {
        _dbContext.Companies.Remove(company);
        await _dbContext.SaveChangesAsync();
    }
}