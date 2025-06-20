using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.DTO;
using SimpleAPI.Interfaces;

namespace SimpleAPI.Entities;

public class UserRepository(AppDbContext context, IMapper mapper) : IUserRepository
{
    public async Task<MemberDto?> GetMemberByIdAsync(int id)
    {
        return await context.Users
                            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<MemberDto?> GetMemberByUserNameAsync(string username)
    {
        return await context.Users
                    .Where(x => x.UserName == username)
                    // we are projecting it to the DTO directly instead of the User's model
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await context.Users
                     .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                     .ToListAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await context.Users
        .Include(x => x.Photos)
        .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<User?> GetUserByUserNameAsync(string username)
    {
        return await context.Users
        .Include(x => x.Photos)
        .SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await context.Users
        .Include(x => x.Photos)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(User user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}

