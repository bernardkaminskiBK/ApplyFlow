using ApplyFlow.Api.Dtos.Dashboard;
using ApplyFlow.Api.Repositories;

namespace ApplyFlow.Api.Services.Dashboard
{
    public class DashboardService : IDashboardService
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;
        private readonly IApplicationEventRepository _applicationEventRepository;
        private readonly IContactPersonRepository _contactPersonRepository;
        private readonly ICompanyRepository _companyRepository;

        public DashboardService(
            IJobApplicationRepository jobApplicationRepository,
            IApplicationEventRepository applicationEventRepository,
            IContactPersonRepository contactPersonRepository,
            ICompanyRepository companyRepository)
        {
            _jobApplicationRepository = jobApplicationRepository;
            _applicationEventRepository = applicationEventRepository;
            _contactPersonRepository = contactPersonRepository;
            _companyRepository = companyRepository;
        }

        public async Task<DashboardStatsResponse> GetStatsAsync()
        {
            return new DashboardStatsResponse
            {
                CompanyCount = await _companyRepository.CountAsync(),
                JobApplicationCount = await _jobApplicationRepository.CountAsync(),
                ApplicationEventCount = await _applicationEventRepository.CountAsync(),
                ContactPersonCount = await _contactPersonRepository.CountAsync()
            };
        }
    }
}
