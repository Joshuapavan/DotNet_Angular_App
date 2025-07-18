using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleAPI.DTO;
using SimpleAPI.Entities;
using SimpleAPI.Extensions;
using SimpleAPI.Interfaces;

namespace SimpleAPI.Controllers;


public class LikesController(ILikesRepository likesRepository) : BaseApiController
{

    [HttpPut("{targetUserId:int}")]
    public async Task<ActionResult> ToggleLike(int targetUserId)
    {
        var sourceUserId = User.GetUserId();
        if (sourceUserId == targetUserId) return BadRequest("You cannot like yourself");

        var existingLike = await likesRepository.GetUserLike(sourceUserId, targetUserId);

        if (existingLike == null)
        {
            var like = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };

            likesRepository.AddLike(like);
        }
        else
        {
            likesRepository.DeleteLike(existingLike);
        }

        if (await likesRepository.SaveChanges()) return Ok();
        return BadRequest("Failed to update like");
    }

    [HttpGet("list")]
    public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikedIds()
    {
        return Ok(await likesRepository.GetCurrentUserLikeIds(User.GetUserId()));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes(string predicate)
    {
        var users = await likesRepository.GetUserLikes(predicate, User.GetUserId());
        return Ok(users);
    }


}

