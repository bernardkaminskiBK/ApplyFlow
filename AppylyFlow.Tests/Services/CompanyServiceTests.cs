using ApplyFlow.Api.Dtos.Company;
using ApplyFlow.Api.Exceptions;
using ApplyFlow.Api.Models;
using ApplyFlow.Api.Repositories;
using ApplyFlow.Api.Services;
using FluentAssertions;
using Moq;

namespace ApplyFlow.Tests.Services;

public class CompanyServiceTests
{
    private readonly Mock<ICompanyRepository> _companyRepositoryMock;
    private readonly CompanyService _companyService;

    public CompanyServiceTests()
    {
        _companyRepositoryMock = new Mock<ICompanyRepository>();
        _companyService = new CompanyService(_companyRepositoryMock.Object);
    }

    [Fact(DisplayName = "Should create a new company when no company with the same name exists")]
    public async Task CreateAsync_WhenCompanyNameIsUnique_ShouldCreateCompany()
    {
        // Arrange
        var request = new CreateCompanyRequest
        {
            Name = "Microsoft",
            City = "Bratislava"
        };

        _companyRepositoryMock
            .Setup(repository => repository.GetByNameAsync(request.Name, 1))
            .ReturnsAsync((Company?)null);

        _companyRepositoryMock
            .Setup(repository => repository.CreateAsync(It.IsAny<Company>()))
            .ReturnsAsync((Company company) =>
            {
                company.Id = 1;
                return company;
            });

        // Act
        var result = await _companyService.CreateAsync(request, 1);

        // Assert
        result.Id.Should().Be(1);
        result.Name.Should().Be("Microsoft");

        _companyRepositoryMock.Verify(repository => repository.CreateAsync(It.IsAny<Company>()), Times.Once);
    }

    [Fact(DisplayName = "Should throw exception when company already exists")]
    public async Task CreateAsync_WhenCompanyAlreadyExists_ShouldThrowException()
    {
        // Arrange
        var request = new CreateCompanyRequest
        {
            Name = "Microsoft",
            City = "Bratislava"
        };

        _companyRepositoryMock
            .Setup(repository => repository.GetByNameAsync(request.Name, 1))
            .ReturnsAsync(new Company
            {
                Id = 1,
                Name = "Microsoft"
            });

        // Act
        Func<Task> act = () => _companyService.CreateAsync(request, 1);

        // Assert
        await act.Should().ThrowAsync<CompanyAlreadyExistsException>();

        _companyRepositoryMock.Verify(repository => repository.CreateAsync(It.IsAny<Company>()), Times.Never);
    }

}
