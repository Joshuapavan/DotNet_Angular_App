using System.ComponentModel.DataAnnotations;

namespace SimpleAPI.DTO;

public class RegisterDto
{
    [Required] [MaxLength(20)]
    public required String username { get; set; }
    [Required]
    public required String password { get; set; }
}