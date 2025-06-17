using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.Entities;

namespace SimpleAPI.Controllers;

public class UsersController : BaseApiController
{
    // Dependency Injection
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        return Ok(await _context.Users.ToListAsync());
    }

    [HttpGet]
    [Route("{id:int}")]
    [Authorize]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var User = await _context.Users.FindAsync(id);

        if (User == null) return NotFound();

        return Ok(User);
    }


}