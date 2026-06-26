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

    public CompaniesController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [HttpGet]
    public async Task<ActionResult<List<CompanyResponse>>> GetAll()
    {
        var companies = await _companyService.GetAllAsync();

        return Ok(companies);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CompanyResponse>> GetById(int id)
    {
        var company = await _companyService.GetByIdAsync(id);

        return company is null ? NotFound() : Ok(company);
    }

    [HttpPost]
    public async Task<ActionResult<CompanyResponse>> Create(CreateCompanyRequest request)
    {
        var company = await _companyService.CreateAsync(request);

        return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateCompanyRequest request)
    {
        var updated = await _companyService.UpdateAsync(id, request);

        return !updated ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _companyService.DeleteAsync(id);

        return !deleted ? NotFound() : NoContent();
    }
}