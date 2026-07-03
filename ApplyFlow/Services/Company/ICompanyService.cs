using ApplyFlow.Api.Dtos.Company;

namespace ApplyFlow.Api.Services;

public interface ICompanyService
{
    Task<List<CompanyResponse>> GetAllAsync(int appUserId);
    Task<CompanyResponse?> GetByIdAsync(int id, int appUserId);
    Task<CompanyResponse> CreateAsync(CreateCompanyRequest request, int appUserId);
    Task<bool> UpdateAsync(int id, UpdateCompanyRequest request, int appUserId);
    Task<bool> DeleteAsync(int id, int appUserId);
}