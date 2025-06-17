using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.DTO;

public class LoginDto
{
    [Required]
    [MaxLength(20)]
    public required String Username { get; set; }
    [Required]
    public required String Password { get; set; }

}