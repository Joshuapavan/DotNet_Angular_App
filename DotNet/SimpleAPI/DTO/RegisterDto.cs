using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.DTO;

public class RegisterDto
{
    [Required]
    public String Username { get; set; } = string.Empty;

    [Required]
    public String? KnownAs { get; set; }

    [Required]
    public String? Gender { get; set; }

    [Required]
    public String? DateOfBirth { get; set; }

    [Required]
    public String? City { get; set; }

    [Required]
    public String? Country { get; set; }
    
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public String Password { get; set; } = string.Empty;
}