using ApplyFlow.Api.Data;
using ApplyFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplyFlow.Api.Repositories;

public class ApplicationEventRepository : IApplicationEventRepository
{
    private readonly ApplyFlowDbContext _dbContext;

    public ApplicationEventRepository(ApplyFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<ApplicationEvent>> GetAllAsync()
    {
        return await _dbContext.ApplicationEvents
            .Include(eventItem => eventItem.JobApplication)
                .ThenInclude(application => application.Company)
            .AsNoTracking()
            .OrderByDescending(eventItem => eventItem.EventDate)
            .ToListAsync();
    }

    public async Task<List<ApplicationEvent>> GetByJobApplicationIdAsync(int jobApplicationId)
    {
        return await _dbContext.ApplicationEvents
            .Include(eventItem => eventItem.JobApplication)
                .ThenInclude(application => application.Company)
            .AsNoTracking()
            .Where(eventItem => eventItem.JobApplicationId == jobApplicationId)
            .OrderBy(eventItem => eventItem.EventDate)
            .ToListAsync();
    }

    public async Task<ApplicationEvent?> GetByIdAsync(int id)
    {
        return await _dbContext.ApplicationEvents
            .Include(eventItem => eventItem.JobApplication)
                .ThenInclude(application => application.Company)
            .AsNoTracking()
            .FirstOrDefaultAsync(eventItem => eventItem.Id == id);
    }

    public async Task<ApplicationEvent> CreateAsync(ApplicationEvent applicationEvent)
    {
        _dbContext.ApplicationEvents.Add(applicationEvent);
        await _dbContext.SaveChangesAsync();

        return applicationEvent;
    }

    public async Task UpdateAsync(ApplicationEvent applicationEvent)
    {
        _dbContext.ApplicationEvents.Update(applicationEvent);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(ApplicationEvent applicationEvent)
    {
        _dbContext.ApplicationEvents.Remove(applicationEvent);
        await _dbContext.SaveChangesAsync();
    }
}