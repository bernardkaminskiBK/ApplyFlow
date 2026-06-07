using ApplyFlow.Api.Models;

namespace ApplyFlow.Api.Repositories;

public interface IApplicationEventRepository
{
    Task<List<ApplicationEvent>> GetAllAsync();

    Task<List<ApplicationEvent>> GetByJobApplicationIdAsync(int jobApplicationId);

    Task<ApplicationEvent?> GetByIdAsync(int id);

    Task<ApplicationEvent> CreateAsync(ApplicationEvent applicationEvent);

    Task UpdateAsync(ApplicationEvent applicationEvent);

    Task DeleteAsync(ApplicationEvent applicationEvent);
}