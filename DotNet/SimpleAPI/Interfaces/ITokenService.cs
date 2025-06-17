using SimpleAPI.Entities;

namespace SimpleAPI.Interfaces;

public interface ITokenService
{
    String CreateToken(User user);
}