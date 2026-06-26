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

    public ApplicationEventsController(IApplicationEventService applicationEventService)
    {
        _applicationEventService = applicationEventService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ApplicationEventResponse>>> GetAll()
    {
        var events = await _applicationEventService.GetAllAsync();

        return Ok(events);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApplicationEventResponse>> GetById(int id)
    {
        var applicationEvent = await _applicationEventService.GetByIdAsync(id);

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
        var applicationEvent = await _applicationEventService.CreateAsync(request);

        return CreatedAtAction(nameof(GetById), new { id = applicationEvent.Id }, applicationEvent);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateApplicationEventRequest request)
    {
        var updated = await _applicationEventService.UpdateAsync(id, request);

        return !updated ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _applicationEventService.DeleteAsync(id);

        return !deleted ? NotFound() : NoContent();
    }
}