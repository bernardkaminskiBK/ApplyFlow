using ApplyFlow.Api.Authentication.Services.CurrentUser;
using ApplyFlow.Api.Dtos.Company;
using ApplyFlow.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/companies")]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _companyService;
    private readonly ICurrentUserService _currentUserService;

    public CompaniesController(ICompanyService companyService, ICurrentUserService currentUserService)
    {
        _companyService = companyService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<List<CompanyResponse>>> GetAll()
    {
        var companies = await _companyService.GetAllAsync(_currentUserService.UserId);

        return Ok(companies);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CompanyResponse>> GetById(int id)
    {
        var company = await _companyService.GetByIdAsync(id, _currentUserService.UserId);

        return company is null ? NotFound() : Ok(company);
    }

    [HttpPost]
    public async Task<ActionResult<CompanyResponse>> Create(CreateCompanyRequest request)
    {
        var company = await _companyService.CreateAsync(request, _currentUserService.UserId);

        return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateCompanyRequest request)
    {
        var updated = await _companyService.UpdateAsync(id, request, _currentUserService.UserId);

        return !updated ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _companyService.DeleteAsync(id, _currentUserService.UserId);

        return !deleted ? NotFound() : NoContent();
    }
}