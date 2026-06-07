using ApplyFlow.Api.Dtos.ContactPerson;

namespace ApplyFlow.Api.Services;

public interface IContactPersonService
{
    Task<List<ContactPersonResponse>> GetAllAsync();

    Task<ContactPersonResponse?> GetByIdAsync(int id);

    Task<ContactPersonResponse> CreateAsync(CreateContactPersonRequest request);

    Task<bool> UpdateAsync(int id, UpdateContactPersonRequest request);

    Task<bool> DeleteAsync(int id);
}