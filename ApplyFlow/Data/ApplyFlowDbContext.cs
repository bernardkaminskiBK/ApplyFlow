using ApplyFlow.Api.Enums;
using ApplyFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplyFlow.Api.Data;

public class ApplyFlowDbContext : DbContext
{
    public ApplyFlowDbContext(DbContextOptions<ApplyFlowDbContext> options)
        : base(options)
    {
    }

    public DbSet<Company> Companies => Set<Company>();
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();
    public DbSet<ContactPerson> ContactPersons => Set<ContactPerson>();
    public DbSet<ApplicationEvent> ApplicationEvents => Set<ApplicationEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Company>().HasData(
            new Company
            {
                Id = 1,
                Name = "SEN Systems",
                City = "Bratislava",
                Website = "https://www.sensystems.sk",
                Note = "Potential React + .NET opportunity"
            },
            new Company
            {
                Id = 2,
                Name = "Alanata",
                City = "Bratislava",
                Website = "https://www.alanata.sk",
                Note = "Junior Java Developer opportunity"
            }
        );

        modelBuilder.Entity<JobApplication>().HasData(
            new JobApplication
            {
                Id = 1,
                CompanyId = 1,
                PositionTitle = "Fullstack Developer",
                Location = "Bratislava",
                WorkMode = WorkMode.Hybrid,
                Status = ApplicationStatus.Interview,
                Source = ApplicationSource.Profesia,
                AppliedDate = new DateOnly(2026, 5, 28),
                SalaryMin = 1200,
                SalaryMax = 1400,
                Note = "Minimal React knowledge required"
            },
            new JobApplication
            {
                Id = 2,
                CompanyId = 2,
                PositionTitle = "Junior Java Developer",
                Location = "Bratislava",
                WorkMode = WorkMode.Hybrid,
                Status = ApplicationStatus.Applied,
                Source = ApplicationSource.Profesia,
                AppliedDate = new DateOnly(2026, 6, 1),
                SalaryMin = 1200,
                SalaryMax = 1500,
                Note = "Good match for Spring Boot practice"
            }
        );

        modelBuilder.Entity<ContactPerson>().HasData(
            new ContactPerson
            {
                Id = 1,
                CompanyId = 1,
                Name = "HR Contact",
                Email = "hr@sensystems.sk",
                Role = "Recruiter",
                Note = "Interview coordination"
            }
        );

        modelBuilder.Entity<ApplicationEvent>().HasData(
            new ApplicationEvent
            {
                Id = 1,
                JobApplicationId = 1,
                EventType = ApplicationEventType.Applied,
                EventDate = new DateOnly(2026, 5, 28),
                Note = "Application sent"
            },
            new ApplicationEvent
            {
                Id = 2,
                JobApplicationId = 1,
                EventType = ApplicationEventType.Interview,
                EventDate = new DateOnly(2026, 6, 12),
                Note = "Interview scheduled"
            },
            new ApplicationEvent
            {
                Id = 3,
                JobApplicationId = 2,
                EventType = ApplicationEventType.Applied,
                EventDate = new DateOnly(2026, 6, 1),
                Note = "Application sent with motivation letter"
            }
        );
    }
}