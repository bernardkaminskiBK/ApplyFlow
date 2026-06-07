using ApplyFlow.Api.Data;
using ApplyFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplyFlow.Api.Repositories;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly ApplyFlowDbContext _dbContext;

    public JobApplicationRepository(ApplyFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<JobApplication>> GetAllAsync()
    {
        return await _dbContext.JobApplications
            .Include(application => application.Company)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<JobApplication?> GetByIdAsync(int id)
    {
        return await _dbContext.JobApplications
            .Include(application => application.Company)
            .AsNoTracking()
            .FirstOrDefaultAsync(application => application.Id == id);
    }

    public async Task<JobApplication> CreateAsync(JobApplication application)
    {
        _dbContext.JobApplications.Add(application);

        await _dbContext.SaveChangesAsync();

        return application;
    }

    public async Task UpdateAsync(JobApplication application)
    {
        _dbContext.JobApplications.Update(application);

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(JobApplication application)
    {
        _dbContext.JobApplications.Remove(application);

        await _dbContext.SaveChangesAsync();
    }
}