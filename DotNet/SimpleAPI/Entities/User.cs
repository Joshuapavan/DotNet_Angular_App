using SimpleAPI.Extensions;

namespace SimpleAPI.Entities;

public class User
{
    public int Id { get; set; }
    public required String UserName { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateOnly DateOfBirth { get; set; }
    public required String KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required String Gender { get; set; }
    public string? Introduction { get; set; }
    public string? Interests { get; set; }
    public string? LookingFor { get; set; }
    public required String City { get; set; }
    public required string Country { get; set; }

    // One to many realtionship
    public List<Photo> Photos { get; set; } = [];

    // // it should have Get at the start for Automapper
    // public int GetAge()
    // {
    //     return DateOfBirth.CalculateAge();
    // }

    // Many to many relationships for likes USer Like is the join table.
    public List<UserLike> LikedByUsers { get; set; } = [];
    public List<UserLike> LikedUsers { get; set; } = [];

}