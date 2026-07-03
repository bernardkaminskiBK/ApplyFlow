using ApplyFlow.Api.Authentication.Services.CurrentUser;
using ApplyFlow.Api.Dtos.ContactPerson;
using ApplyFlow.Api.Models.Shared;
using ApplyFlow.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/contact-persons")]
public class ContactPersonsController : ControllerBase
{
    private readonly IContactPersonService _contactPersonService;
    private readonly ICurrentUserService _currentUserService;

    public ContactPersonsController(IContactPersonService contactPersonService, ICurrentUserService currentUserService)
    {
        _contactPersonService = contactPersonService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<ContactPersonResponse>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var contacts = await _contactPersonService.GetAllAsync(page, pageSize, _currentUserService.UserId);

        return Ok(contacts);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ContactPersonResponse>> GetById(int id)
    {
        var contact = await _contactPersonService.GetByIdAsync(id, _currentUserService.UserId);

        return contact is null ? NotFound() : Ok(contact);
    }

    [HttpPost]
    public async Task<ActionResult<ContactPersonResponse>> Create(CreateContactPersonRequest request)
    {
        var contact = await _contactPersonService.CreateAsync(request, _currentUserService.UserId);

        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateContactPersonRequest request)
    {
        var updated = await _contactPersonService.UpdateAsync(id, request, _currentUserService.UserId);

        return !updated ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _contactPersonService.DeleteAsync(id, _currentUserService.UserId);

        return !deleted ? NotFound() : NoContent();
    }
}