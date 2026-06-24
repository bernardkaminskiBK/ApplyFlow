using ApplyFlow.Api.Dtos.Dashboard;

namespace ApplyFlow.Api.Services.Dashboard
{
    public interface IDashboardService
    {
        Task<DashboardStatsResponse> GetStatsAsync();
    }
}
