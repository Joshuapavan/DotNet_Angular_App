using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.DTO;

public class LoginDto
{
    [Required]
    public String Username { get; set; } = string.Empty;
    [Required]
    public String Password { get; set; } = string.Empty;

}