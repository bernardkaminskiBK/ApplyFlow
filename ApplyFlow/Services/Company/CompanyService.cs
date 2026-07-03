using ApplyFlow.Api.Dtos.Company;
using ApplyFlow.Api.Exceptions;
using ApplyFlow.Api.Models;
using ApplyFlow.Api.Repositories;

namespace ApplyFlow.Api.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _companyRepository;

    public CompanyService(ICompanyRepository companyRepository)
    {
        _companyRepository = companyRepository;
    }

    public async Task<List<CompanyResponse>> GetAllAsync(int appUserId)
    {
        var companies = await _companyRepository.GetAllAsync(appUserId);

        return companies
            .Select(MapToResponse)
            .ToList();
    }

    public async Task<CompanyResponse?> GetByIdAsync(int id, int appUserId)
    {
        var company = await _companyRepository.GetByIdAsync(id, appUserId);

        return company is null ? null : MapToResponse(company);
    }

    public async Task<CompanyResponse> CreateAsync(CreateCompanyRequest request, int appUserId)
    {
        var existingCompany = await _companyRepository.GetByNameAsync(request.Name, appUserId);

        if (existingCompany is not null)
        {
            throw new CompanyAlreadyExistsException(request.Name);
        }

        var company = new Company
        {
            Name = request.Name,
            City = request.City,
            Website = request.Website,
            Note = request.Note,
            AppUserId = appUserId,
        };

        var createdCompany = await _companyRepository.CreateAsync(company);

        return MapToResponse(createdCompany);
    }

    public async Task<bool> UpdateAsync(int id, UpdateCompanyRequest request, int appUserId)
    {
        var company = await _companyRepository.GetByIdAsync(id, appUserId);

        if (company is null)
        {
            return false;
        }

        company.Name = request.Name;
        company.City = request.City;
        company.Website = request.Website;
        company.Note = request.Note;

        await _companyRepository.UpdateAsync(company);

        return true;
    }

    public async Task<bool> DeleteAsync(int id, int appUserId)
    {
        var company = await _companyRepository.GetByIdAsync(id, appUserId);

        if (company is null)
        {
            return false;
        }

        await _companyRepository.DeleteAsync(company);

        return true;
    }

    private static CompanyResponse MapToResponse(Company company)
    {
        return new CompanyResponse
        {
            Id = company.Id,
            Name = company.Name,
            City = company.City,
            Website = company.Website,
            Note = company.Note
        };
    }
}