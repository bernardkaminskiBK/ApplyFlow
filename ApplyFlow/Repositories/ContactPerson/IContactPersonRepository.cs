using ApplyFlow.Api.Models;
using ApplyFlow.Api.Models.Shared;

namespace ApplyFlow.Api.Repositories;

public interface IContactPersonRepository
{
    Task<PagedResult<ContactPerson>> GetAllAsync(int page, int pageSize, int appUserId);

    Task<ContactPerson?> GetByIdAsync(int id, int appUserId);

    Task<ContactPerson> CreateAsync(ContactPerson contactPerson);

    Task UpdateAsync(ContactPerson contactPerson);

    Task DeleteAsync(ContactPerson contactPerson);

    Task<int> CountAsync(int appUserId);
}