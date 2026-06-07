using ApplyFlow.Api.Models;

namespace ApplyFlow.Api.Repositories;

public interface IContactPersonRepository
{
    Task<List<ContactPerson>> GetAllAsync();

    Task<ContactPerson?> GetByIdAsync(int id);

    Task<ContactPerson> CreateAsync(ContactPerson contactPerson);

    Task UpdateAsync(ContactPerson contactPerson);

    Task DeleteAsync(ContactPerson contactPerson);
}