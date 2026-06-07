using ApplyFlow.Api.Dtos.ContactPerson;
using ApplyFlow.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Controllers;

[ApiController]
[Route("api/contact-persons")]
public class ContactPersonsController : ControllerBase
{
    private readonly IContactPersonService _contactPersonService;

    public ContactPersonsController(IContactPersonService contactPersonService)
    {
        _contactPersonService = contactPersonService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ContactPersonResponse>>> GetAll()
    {
        var contacts = await _contactPersonService.GetAllAsync();

        return Ok(contacts);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ContactPersonResponse>> GetById(int id)
    {
        var contact = await _contactPersonService.GetByIdAsync(id);

        if (contact is null)
        {
            return NotFound();
        }

        return Ok(contact);
    }

    [HttpPost]
    public async Task<ActionResult<ContactPersonResponse>> Create(CreateContactPersonRequest request)
    {
        var contact = await _contactPersonService.CreateAsync(request);

        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateContactPersonRequest request)
    {
        var updated = await _contactPersonService.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _contactPersonService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}