using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.DTO;
using SimpleAPI.Entities;
using SimpleAPI.Interfaces;

namespace SimpleAPI.Controllers;

public class AccountsController(AppDbContext context, ITokenService tokenService, IMapper mapper) : BaseApiController
{

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> RegisterUser(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("UserName Already Exists");

        using var hmac = new HMACSHA512();
        var user = mapper.Map<User>(registerDto);
        user.UserName = registerDto.Username.ToLower();
        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
        user.PasswordSalt = hmac.Key;

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
    {
        var user = await context.Users
        .Include(p => p.Photos)
        .FirstOrDefaultAsync(
            x => x.UserName.ToLower() == loginDto.Username.ToLower()
        );

        if (user == null) return Unauthorized("Invalid UserName");

        var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid Password");
            }
        }

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            Gender = user.Gender
        };
    }


    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}