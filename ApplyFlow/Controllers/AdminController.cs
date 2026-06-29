using ApplyFlow.Api.Dtos.Admin;
using ApplyFlow.Api.Services.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApplyFlow.Api.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("summary")]
    public IActionResult GetAdminSummary()
    {
        return Ok(new
        {
            message = "Only admins can see this.",
            serverTime = DateTime.UtcNow
        });
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<AdminUserResponse>>> GetUsers()
    {
        var response = await _adminService.GetUsersAsync();
        return Ok(response);
    }

    [HttpPut("users/{id}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, UpdateUserRoleRequest request)
    {
        var updated = await _adminService.UpdateUserRoleAsync(id, request);
        return !updated ? NotFound() : NoContent();
    }
}
