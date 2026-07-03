using ApplyFlow.Api.Authentication.Services.CurrentUser;
using ApplyFlow.Api.Dtos.ApplicationEvents;
using ApplyFlow.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/application-events")]
public class ApplicationEventsController : ControllerBase
{
    private readonly IApplicationEventService _applicationEventService;
    private readonly ICurrentUserService _currentUserService;

    public ApplicationEventsController(IApplicationEventService applicationEventService, ICurrentUserService currentUserService)
    {
        _applicationEventService = applicationEventService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ApplicationEventResponse>>> GetAll()
    {
        var events = await _applicationEventService.GetAllAsync(_currentUserService.UserId);

        return Ok(events);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApplicationEventResponse>> GetById(int id)
    {
        var applicationEvent = await _applicationEventService.GetByIdAsync(id, _currentUserService.UserId);

        return applicationEvent is null ? NotFound() : Ok(applicationEvent);
    }

    [HttpGet("by-job-application/{jobApplicationId:int}")]
    public async Task<ActionResult<List<ApplicationEventResponse>>> GetByJobApplicationId(int jobApplicationId)
    {
        var events = await _applicationEventService.GetByJobApplicationIdAsync(jobApplicationId);

        return Ok(events);
    }

    [HttpPost]
    public async Task<ActionResult<ApplicationEventResponse>> Create(CreateApplicationEventRequest request)
    {
        var applicationEvent = await _applicationEventService.CreateAsync(request, _currentUserService.UserId);

        return CreatedAtAction(nameof(GetById), new { id = applicationEvent.Id }, applicationEvent);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateApplicationEventRequest request)
    {
        var updated = await _applicationEventService.UpdateAsync(id, request, _currentUserService.UserId);

        return !updated ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _applicationEventService.DeleteAsync(id, _currentUserService.UserId);

        return !deleted ? NotFound() : NoContent();
    }
}