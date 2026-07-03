using ApplyFlow.Api.Dtos.JobApplications;
using ApplyFlow.Api.Exceptions;
using ApplyFlow.Api.Models;
using ApplyFlow.Api.Repositories;

namespace ApplyFlow.Api.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly IJobApplicationRepository _jobApplicationRepository;
    private readonly ICompanyRepository _companyRepository;

    public JobApplicationService(IJobApplicationRepository jobApplicationRepository, ICompanyRepository companyRepository)
    {
        _jobApplicationRepository = jobApplicationRepository;
        _companyRepository = companyRepository;
    }

    public async Task<List<JobApplicationResponse>> GetAllAsync(int appUserId)
    {
        var applications = await _jobApplicationRepository.GetAllAsync(appUserId);

        return applications.Select(MapToResponse).ToList();
    }

    public async Task<JobApplicationResponse?> GetByIdAsync(int id, int appUserId)
    {
        var application = await _jobApplicationRepository.GetByIdAsync(id, appUserId);

        return application is null ? null : MapToResponse(application);
    }

    public async Task<JobApplicationResponse> CreateAsync(CreateJobApplicationRequest request, int appUserId)
    {
        var company = await _companyRepository.GetByIdAsync(request.CompanyId, appUserId);

        if (company is null)
        {
            throw new CompanyNotFoundException(request.CompanyId);
        }

        var application = new JobApplication
        {
            CompanyId = request.CompanyId,
            PositionTitle = request.PositionTitle,
            Location = request.Location,
            WorkMode = request.WorkMode,
            Status = request.Status,
            Source = request.Source,
            AppliedDate = request.AppliedDate,
            SalaryMin = request.SalaryMin,
            SalaryMax = request.SalaryMax,
            Note = request.Note
        };

        var createdApplication = await _jobApplicationRepository.CreateAsync(application);

        return new JobApplicationResponse
        {
            Id = createdApplication.Id,
            CompanyId = createdApplication.CompanyId,
            CompanyName = company.Name,
            PositionTitle = createdApplication.PositionTitle,
            Location = createdApplication.Location,
            WorkMode = createdApplication.WorkMode,
            Status = createdApplication.Status,
            Source = createdApplication.Source,
            AppliedDate = createdApplication.AppliedDate,
            SalaryMin = createdApplication.SalaryMin,
            SalaryMax = createdApplication.SalaryMax,
            Note = createdApplication.Note
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateJobApplicationRequest request, int appUserId)
    {
        var application = await _jobApplicationRepository.GetByIdAsync(id, appUserId);

        if (application is null)
        {
            return false;
        }

        var targetCompany = await _companyRepository.GetByIdAsync(request.CompanyId, appUserId);

        if (targetCompany is null)
        {
            throw new CompanyNotFoundException(request.CompanyId);
        }

        application.CompanyId = request.CompanyId;
        application.PositionTitle = request.PositionTitle;
        application.Location = request.Location;
        application.WorkMode = request.WorkMode;
        application.Status = request.Status;
        application.Source = request.Source;
        application.AppliedDate = request.AppliedDate;
        application.SalaryMin = request.SalaryMin;
        application.SalaryMax = request.SalaryMax;
        application.Note = request.Note;

        await _jobApplicationRepository.UpdateAsync(application);

        return true;
    }

    public async Task<bool> DeleteAsync(int id, int appUserId)
    {
        var application = await _jobApplicationRepository.GetByIdAsync(id, appUserId);

        if (application is null)
        {
            return false;
        }

        await _jobApplicationRepository.DeleteAsync(application);

        return true;
    }

    private static JobApplicationResponse MapToResponse(JobApplication application)
    {
        return new JobApplicationResponse
        {
            Id = application.Id,
            CompanyId = application.CompanyId,
            CompanyName = application.Company.Name,
            PositionTitle = application.PositionTitle,
            Location = application.Location,
            WorkMode = application.WorkMode,
            Status = application.Status,
            Source = application.Source,
            AppliedDate = application.AppliedDate,
            SalaryMin = application.SalaryMin,
            SalaryMax = application.SalaryMax,
            Note = application.Note
        };
    }
}