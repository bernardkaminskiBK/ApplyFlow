using ApplyFlow.Api.Authentication.Services.CurrentUser;
using ApplyFlow.Api.Dtos.Dashboard;
using ApplyFlow.Api.Repositories;

namespace ApplyFlow.Api.Services.Dashboard
{
    public class DashboardService(
          IJobApplicationRepository _jobApplicationRepository,
          IApplicationEventRepository _applicationEventRepository,
          IContactPersonRepository _contactPersonRepository,
          ICompanyRepository _companyRepository,
          ICurrentUserService _currentUserService
    ) : IDashboardService
    {
        public async Task<DashboardStatsResponse> GetStatsAsync()
        {
            return new DashboardStatsResponse
            {
                CompanyCount = await _companyRepository.CountAsync(_currentUserService.UserId),
                JobApplicationCount = await _jobApplicationRepository.CountAsync(_currentUserService.UserId),
                ApplicationEventCount = await _applicationEventRepository.CountAsync(_currentUserService.UserId),
                ContactPersonCount = await _contactPersonRepository.CountAsync(_currentUserService.UserId)
            };
        }
    }
}
