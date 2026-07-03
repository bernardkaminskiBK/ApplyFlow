using ApplyFlow.Api.Dtos.JobApplications;

namespace ApplyFlow.Api.Services;

public interface IJobApplicationService
{
    Task<List<JobApplicationResponse>> GetAllAsync(int appUserId);
    Task<JobApplicationResponse?> GetByIdAsync(int id);
    Task<JobApplicationResponse?> GetByIdAsync(int id, int appUserId);
    Task<JobApplicationResponse> CreateAsync(CreateJobApplicationRequest request, int appUserId);
    Task<bool> UpdateAsync(int id, UpdateJobApplicationRequest request, int appUserId);
    Task<bool> DeleteAsync(int id, int appUserId);
}