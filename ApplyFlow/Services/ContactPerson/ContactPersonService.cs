using ApplyFlow.Api.Dtos.ContactPerson;
using ApplyFlow.Api.Exceptions;
using ApplyFlow.Api.Models;
using ApplyFlow.Api.Repositories;

namespace ApplyFlow.Api.Services;

public class ContactPersonService : IContactPersonService
{
    private readonly IContactPersonRepository _contactPersonRepository;
    private readonly ICompanyRepository _companyRepository;

    public ContactPersonService(IContactPersonRepository contactPersonRepository, ICompanyRepository companyRepository)
    {
        _contactPersonRepository = contactPersonRepository;
        _companyRepository = companyRepository;
    }

    public async Task<List<ContactPersonResponse>> GetAllAsync()
    {
        var contacts = await _contactPersonRepository.GetAllAsync();

        return contacts.Select(MapToResponse).ToList();
    }

    public async Task<ContactPersonResponse?> GetByIdAsync(int id)
    {
        var contact = await _contactPersonRepository.GetByIdAsync(id);

        return contact is null ? null : MapToResponse(contact);
    }

    public async Task<ContactPersonResponse> CreateAsync(CreateContactPersonRequest request)
    {
        var company = await _companyRepository.GetByIdAsync(request.CompanyId);

        if (company is null)
        {
            throw new CompanyNotFoundException(request.CompanyId);
        }

        var contactPerson = new ContactPerson
        {
            CompanyId = request.CompanyId,
            Name = request.Name,
            Role = request.Position,
            Email = request.Email,
            Phone = request.PhoneNumber
        };

        var createdContact = await _contactPersonRepository.CreateAsync(contactPerson);

        return new ContactPersonResponse
        {
            Id = createdContact.Id,
            CompanyId = createdContact.CompanyId,
            CompanyName = company.Name,
            Name = createdContact.Name,
            Position = createdContact.Role,
            Email = createdContact.Email,
            PhoneNumber = createdContact.Phone
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateContactPersonRequest request)
    {
        var contact = await _contactPersonRepository.GetByIdAsync(id);

        if (contact is null)
        {
            return false;
        }

        contact.Name = request.Name;
        contact.Role = request.Position;
        contact.Email = request.Email;
        contact.Phone = request.PhoneNumber;

        await _contactPersonRepository.UpdateAsync(contact);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var contact = await _contactPersonRepository.GetByIdAsync(id);

        if (contact is null)
        {
            return false;
        }

        await _contactPersonRepository.DeleteAsync(contact);

        return true;
    }

    private static ContactPersonResponse MapToResponse(ContactPerson contact)
    {
        return new ContactPersonResponse
        {
            Id = contact.Id,
            CompanyId = contact.CompanyId,
            CompanyName = contact.Company.Name,
            Name = contact.Name,
            Position = contact.Role,
            Email = contact.Email,
            PhoneNumber = contact.Phone
        };
    }
}