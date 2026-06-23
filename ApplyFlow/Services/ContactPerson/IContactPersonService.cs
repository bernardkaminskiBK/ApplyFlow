using ApplyFlow.Api.Dtos.ContactPerson;
using ApplyFlow.Api.Models.Shared;

namespace ApplyFlow.Api.Services;

public interface IContactPersonService
{
    Task<PagedResult<ContactPersonResponse>> GetAllAsync(int page, int pageSize);

    Task<ContactPersonResponse?> GetByIdAsync(int id);

    Task<ContactPersonResponse> CreateAsync(CreateContactPersonRequest request);

    Task<bool> UpdateAsync(int id, UpdateContactPersonRequest request);

    Task<bool> DeleteAsync(int id);
}