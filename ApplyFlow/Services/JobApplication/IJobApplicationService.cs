using ApplyFlow.Api.Dtos.JobApplications;

namespace ApplyFlow.Api.Services;

public interface IJobApplicationService
{
    Task<List<JobApplicationResponse>> GetAllAsync();
    Task<JobApplicationResponse?> GetByIdAsync(int id);
    Task<JobApplicationResponse> CreateAsync(CreateJobApplicationRequest request);
    Task<bool> UpdateAsync(int id, UpdateJobApplicationRequest request);
    Task<bool> DeleteAsync(int id);
}