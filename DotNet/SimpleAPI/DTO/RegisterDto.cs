using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.DTO;

public class RegisterDto
{
    [Required]
    [MaxLength(20)]
    public String Username { get; set; } = string.Empty;
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public String Password { get; set; } = string.Empty;
}