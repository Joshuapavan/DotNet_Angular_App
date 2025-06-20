using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Entities;

namespace SimpleAPI.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext dbContext)
    {
        if (await dbContext.Users.AnyAsync()) return;
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var users = JsonSerializer.Deserialize<List<User>>(userData, options);

        if (users == null) return;

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Test@123"));
            user.PasswordSalt = hmac.Key;

            dbContext.Users.Add(user);
        }
        await dbContext.SaveChangesAsync();
    }
}