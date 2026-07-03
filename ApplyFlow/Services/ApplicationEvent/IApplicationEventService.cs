using ApplyFlow.Api.Dtos.ApplicationEvents;

namespace ApplyFlow.Api.Services;

public interface IApplicationEventService
{
    Task<List<ApplicationEventResponse>> GetAllAsync(int appUserId);

    Task<List<ApplicationEventResponse>> GetByJobApplicationIdAsync(int jobApplicationId);

    Task<ApplicationEventResponse?> GetByIdAsync(int id, int appUserId);

    Task<ApplicationEventResponse> CreateAsync(CreateApplicationEventRequest request, int appUserId);

    Task<bool> UpdateAsync(int id, UpdateApplicationEventRequest request, int appUserId);

    Task<bool> DeleteAsync(int id, int appUserId);
}