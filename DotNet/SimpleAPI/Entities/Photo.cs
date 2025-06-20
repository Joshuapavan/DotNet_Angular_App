using System.ComponentModel.DataAnnotations.Schema;

namespace SimpleAPI.Entities;

[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required String Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation properities

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}