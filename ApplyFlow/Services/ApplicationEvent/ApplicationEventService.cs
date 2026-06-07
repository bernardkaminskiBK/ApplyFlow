using ApplyFlow.Api.Dtos.ApplicationEvents;
using ApplyFlow.Api.Exceptions;
using ApplyFlow.Api.Models;
using ApplyFlow.Api.Repositories;

namespace ApplyFlow.Api.Services;

public class ApplicationEventService : IApplicationEventService
{
    private readonly IApplicationEventRepository _applicationEventRepository;
    private readonly IJobApplicationRepository _jobApplicationRepository;

    public ApplicationEventService(IApplicationEventRepository applicationEventRepository, IJobApplicationRepository jobApplicationRepository)
    {
        _applicationEventRepository = applicationEventRepository;
        _jobApplicationRepository = jobApplicationRepository;
    }

    public async Task<List<ApplicationEventResponse>> GetAllAsync()
    {
        var events = await _applicationEventRepository.GetAllAsync();

        return events.Select(MapToResponse).ToList();
    }

    public async Task<List<ApplicationEventResponse>> GetByJobApplicationIdAsync(int jobApplicationId)
    {
        var events = await _applicationEventRepository.GetByJobApplicationIdAsync(jobApplicationId);

        return events.Select(MapToResponse).ToList();
    }

    public async Task<ApplicationEventResponse?> GetByIdAsync(int id)
    {
        var applicationEvent = await _applicationEventRepository.GetByIdAsync(id);

        return applicationEvent is null ? null : MapToResponse(applicationEvent);
    }

    public async Task<ApplicationEventResponse> CreateAsync(CreateApplicationEventRequest request)
    {
        var jobApplication = await _jobApplicationRepository.GetByIdAsync(request.JobApplicationId);

        if (jobApplication is null)
        {
            throw new JobApplicationNotFoundException(request.JobApplicationId);
        }

        var applicationEvent = new ApplicationEvent
        {
            JobApplicationId = request.JobApplicationId,
            EventType = request.EventType,
            EventDate = request.EventDate,
            Note = request.Note
        };

        var createdEvent = await _applicationEventRepository.CreateAsync(applicationEvent);

        return new ApplicationEventResponse
        {
            Id = createdEvent.Id,
            JobApplicationId = createdEvent.JobApplicationId,
            PositionTitle = jobApplication.PositionTitle,
            CompanyName = jobApplication.Company.Name,
            EventType = createdEvent.EventType,
            EventDate = createdEvent.EventDate,
            Note = createdEvent.Note
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateApplicationEventRequest request)
    {
        var applicationEvent = await _applicationEventRepository.GetByIdAsync(id);

        if (applicationEvent is null)
        {
            return false;
        }

        applicationEvent.EventType = request.EventType;
        applicationEvent.EventDate = request.EventDate;
        applicationEvent.Note = request.Note;

        await _applicationEventRepository.UpdateAsync(applicationEvent);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var applicationEvent = await _applicationEventRepository.GetByIdAsync(id);

        if (applicationEvent is null)
        {
            return false;
        }

        await _applicationEventRepository.DeleteAsync(applicationEvent);

        return true;
    }

    private static ApplicationEventResponse MapToResponse(ApplicationEvent applicationEvent)
    {
        return new ApplicationEventResponse
        {
            Id = applicationEvent.Id,
            JobApplicationId = applicationEvent.JobApplicationId,
            PositionTitle = applicationEvent.JobApplication.PositionTitle,
            CompanyName = applicationEvent.JobApplication.Company.Name,
            EventType = applicationEvent.EventType,
            EventDate = applicationEvent.EventDate,
            Note = applicationEvent.Note
        };
    }
}