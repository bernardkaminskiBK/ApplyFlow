using ApplyFlow.Api.Dtos.ContactPerson;
using ApplyFlow.Api.Models.Shared;

namespace ApplyFlow.Api.Services;

public interface IContactPersonService
{
    Task<PagedResult<ContactPersonResponse>> GetAllAsync(int page, int pageSize, int appUserId);

    Task<ContactPersonResponse?> GetByIdAsync(int id, int appUserId);

    Task<ContactPersonResponse> CreateAsync(CreateContactPersonRequest request, int appUserId);

    Task<bool> UpdateAsync(int id, UpdateContactPersonRequest request, int appUserId);

    Task<bool> DeleteAsync(int id, int appUserId);
}