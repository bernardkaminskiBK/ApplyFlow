namespace ApplyFlow.Api.Authentication.Service;

using ApplyFlow.Api.Authentication.Dtos;
using ApplyFlow.Api.Authentication.Exceptions;
using ApplyFlow.Api.Authentication.Models;
using ApplyFlow.Api.Authentication.Repository;
using ApplyFlow.Api.Authentication.Services;
using Microsoft.AspNetCore.Identity;


public class AuthService : IAuthService
{
    private readonly IAppUserRepository _appUserRepository;

    public AuthService(IAppUserRepository appUserRepository)
    {
        _appUserRepository = appUserRepository;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _appUserRepository.GetByEmailAsync(request.Email);

        if (existingUser is not null)
        {
            throw new EmailAlreadyExistsException();
        }

        var user = new AppUser
        {
            Email = request.Email,
            Role = "User"
        };

        var passwordHasher = new PasswordHasher<AppUser>();

        user.PasswordHash = passwordHasher.HashPassword(
            user,
            request.Password
        );

        await _appUserRepository.CreateAsync(user);
    }

    public async Task LoginAsync(LoginRequest request)
    {
        var user = await _appUserRepository.GetByEmailAsync(request.Email);

        if (user is null)
        {
            throw new EmailAlreadyExistsException();
        }

        var passwordHasher = new PasswordHasher<AppUser>();

        var result = passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password
        );

        if (result == PasswordVerificationResult.Failed)
        {
            throw new InvalidCredentialsException();
        }
    }

}
