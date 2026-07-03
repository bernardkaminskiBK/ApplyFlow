using ApplyFlow.Api.Models;

namespace ApplyFlow.Api.Repositories;

public interface IJobApplicationRepository
{
    Task<List<JobApplication>> GetAllAsync(int appUserId);

    Task<JobApplication?> GetByIdAsync(int id, int appUserId);

    Task<JobApplication> CreateAsync(JobApplication application);

    Task UpdateAsync(JobApplication application);

    Task DeleteAsync(JobApplication application);

    Task<int> CountAsync(int appUserId);
}