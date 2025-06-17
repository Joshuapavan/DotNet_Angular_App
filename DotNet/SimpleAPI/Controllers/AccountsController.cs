using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.DTO;
using SimpleAPI.Entities;

namespace SimpleAPI.Controllers;

public class AccountsController(AppDbContext context) : BaseApiController
{

    [HttpPost("register")]
    public async Task<ActionResult<User>> RegisterUser(RegisterDto registerDto)
    {
        if (await UserExists(registerDto)) return BadRequest("User Already Exists");

        using var hmac = new HMACSHA512();

        var user = new User
        {
            UserName = registerDto.username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(
            x => x.UserName.ToLower() == loginDto.username.ToLower()
        );

        if (user == null) return Unauthorized("Invalid UserName");

        var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid Password");
            }
        }

        return new UserDto
        {
            username = user.UserName,
            Token = user.UserName
        };
    }


    private async Task<bool> UserExists(RegisterDto registerDto)
    {
        return await context.Users.AnyAsync(x => x.UserName == registerDto.username);
    }
}