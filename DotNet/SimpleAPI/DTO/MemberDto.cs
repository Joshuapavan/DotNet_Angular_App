namespace SimpleAPI.DTO;

public class MemberDto
{
    public int Id { get; set; }
    public String? Username { get; set; }
    public int Age { get; set; }
    public String? PhotoUrl { get; set; }
    public String? KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public String? Gender { get; set; }
    public String? Introduction { get; set; }
    public String? Interests { get; set; }
    public String? LookingFor { get; set; }
    public String? City { get; set; }
    public String? Country { get; set; }

    // One to many realtionship
    public List<PhotoDto> Photos { get; set; }

}