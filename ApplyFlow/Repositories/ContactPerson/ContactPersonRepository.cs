using ApplyFlow.Api.Data;
using ApplyFlow.Api.Models;
using ApplyFlow.Api.Models.Shared;
using Microsoft.EntityFrameworkCore;

namespace ApplyFlow.Api.Repositories;

public class ContactPersonRepository : IContactPersonRepository
{
    private readonly ApplyFlowDbContext _dbContext;

    public ContactPersonRepository(ApplyFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResult<ContactPerson>> GetAllAsync(int page, int pageSize, int appUserId)
    {
        var totalCount = await CountAsync(appUserId);
        var contacts = await _dbContext.ContactPersons
            .Include(contact => contact.Company)
            .Where(contact => contact.Company.AppUserId == appUserId)
            .AsNoTracking()
            .OrderBy(contact => contact.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<ContactPerson> { Items = contacts, TotalCount = totalCount };
    }

    public async Task<ContactPerson?> GetByIdAsync(int id, int appUserId)
    {
        return await _dbContext.ContactPersons
            .Include(contact => contact.Company)
            .Where(contact => contact.Company.AppUserId == appUserId)
            .AsNoTracking()
            .FirstOrDefaultAsync(contact => contact.Id == id);
    }

    public async Task<ContactPerson> CreateAsync(ContactPerson contactPerson)
    {
        _dbContext.ContactPersons.Add(contactPerson);

        await _dbContext.SaveChangesAsync();

        return contactPerson;
    }

    public async Task UpdateAsync(ContactPerson contactPerson)
    {
        _dbContext.ContactPersons.Update(contactPerson);

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(ContactPerson contactPerson)
    {
        _dbContext.ContactPersons.Remove(contactPerson);

        await _dbContext.SaveChangesAsync();
    }

    public async Task<int> CountAsync(int appUserId)
    {
        return await _dbContext.ContactPersons.CountAsync(contactPersons => contactPersons.Company.AppUserId == appUserId);
    }
}