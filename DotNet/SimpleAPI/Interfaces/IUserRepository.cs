using SimpleAPI.DTO;
using SimpleAPI.Entities;
using SimpleAPI.Helpers;

namespace SimpleAPI.Interfaces;

public interface IUserRepository
{
    void Update(User user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<User>> GetUsersAsync();
    Task<User?> GetUserByIdAsync(int id);
    Task<User?> GetUserByUserNameAsync(string username);
    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto?> GetMemberByUserNameAsync(string username);
    Task<MemberDto?> GetMemberByIdAsync(int id);
}