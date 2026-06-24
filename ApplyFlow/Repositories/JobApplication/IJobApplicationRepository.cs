using ApplyFlow.Api.Models;

namespace ApplyFlow.Api.Repositories;

public interface IJobApplicationRepository
{
    Task<List<JobApplication>> GetAllAsync();

    Task<JobApplication?> GetByIdAsync(int id);

    Task<JobApplication> CreateAsync(JobApplication application);

    Task UpdateAsync(JobApplication application);

    Task DeleteAsync(JobApplication application);

    Task<int> CountAsync();
}