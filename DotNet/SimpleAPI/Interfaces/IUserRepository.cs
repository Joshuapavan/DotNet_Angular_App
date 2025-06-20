using SimpleAPI.DTO;
using SimpleAPI.Entities;

namespace SimpleAPI.Interfaces;

public interface IUserRepository
{
    void Update(User user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User?> GetUserByIdAsync(int id);
    Task<User?> GetUserByUserNameAsync(string username);
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<MemberDto?> GetMemberByUserNameAsync(string username);
    Task<MemberDto?> GetMemberByIdAsync(int id);
}