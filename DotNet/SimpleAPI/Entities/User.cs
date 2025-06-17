
namespace SimpleAPI.Entities;
public class User
{
    public int Id { get; set; }
    public required String UserName { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}