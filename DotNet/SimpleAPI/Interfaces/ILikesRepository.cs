using System;
using SimpleAPI.DTO;
using SimpleAPI.Entities;

namespace SimpleAPI.Interfaces;

public interface ILikesRepository
{
    Task<UserLike?> GetUserLike(int sourceUserId, int targetUserId);
    Task<IEnumerable<MemberDto>> GetUserLikes(string predicate, int userId);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId);
    void DeleteLike(UserLike like);
    void AddLike(UserLike like);
    Task<bool> SaveChanges();
}
