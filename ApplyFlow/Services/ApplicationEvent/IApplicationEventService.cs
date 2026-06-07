using ApplyFlow.Api.Dtos.ApplicationEvents;

namespace ApplyFlow.Api.Services;

public interface IApplicationEventService
{
    Task<List<ApplicationEventResponse>> GetAllAsync();

    Task<List<ApplicationEventResponse>> GetByJobApplicationIdAsync(int jobApplicationId);

    Task<ApplicationEventResponse?> GetByIdAsync(int id);

    Task<ApplicationEventResponse> CreateAsync(CreateApplicationEventRequest request);

    Task<bool> UpdateAsync(int id, UpdateApplicationEventRequest request);

    Task<bool> DeleteAsync(int id);
}