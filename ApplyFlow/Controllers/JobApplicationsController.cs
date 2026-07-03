using ApplyFlow.Api.Authentication.Services.CurrentUser;
using ApplyFlow.Api.Dtos.JobApplications;
using ApplyFlow.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/job-applications")]
public class JobApplicationsController : ControllerBase
{
    private readonly IJobApplicationService _jobApplicationService;
    private readonly ICurrentUserService _currentUserService;

    public JobApplicationsController(IJobApplicationService jobApplicationService, ICurrentUserService currentUserService)
    {
        _jobApplicationService = jobApplicationService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobApplicationResponse>>> GetAll()
    {
        var applications = await _jobApplicationService.GetAllAsync(_currentUserService.UserId);

        return Ok(applications);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<JobApplicationResponse>> GetById(int id)
    {
        var application = await _jobApplicationService.GetByIdAsync(id, _currentUserService.UserId);

        return application is null ? NotFound() : Ok(application);
    }

    [HttpPost]
    public async Task<ActionResult<JobApplicationResponse>> Create(CreateJobApplicationRequest request)
    {
        var application = await _jobApplicationService.CreateAsync(request, _currentUserService.UserId);

        return CreatedAtAction(nameof(GetById), new { id = application.Id }, application);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateJobApplicationRequest request)
    {
        var updated = await _jobApplicationService.UpdateAsync(id, request, _currentUserService.UserId);

        return !updated ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _jobApplicationService.DeleteAsync(id, _currentUserService.UserId);

        return !deleted ? NotFound() : NoContent();
    }
}