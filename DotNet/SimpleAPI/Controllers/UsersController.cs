using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAPI.DTO;
using SimpleAPI.Entities;
using SimpleAPI.Extensions;
using SimpleAPI.Interfaces;

namespace SimpleAPI.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetAllUsers()
    {
        var users = await userRepository.GetMembersAsync();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MemberDto>> GetUserById(int id)
    {
        var User = await userRepository.GetMemberByIdAsync(id);

        if (User == null) return NotFound();

        return Ok(mapper.Map<MemberDto>(User));
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
    {
        var User = await userRepository.GetMemberByUserNameAsync(username);
        return Ok(User);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.GetUserName();

        if (username == null) return BadRequest("Invalid Username, Please Login again");
        var user = await userRepository.GetUserByUserNameAsync(username);

        if (user == null) return BadRequest("Could not find User");

        mapper.Map(memberUpdateDto, user);
        if (await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update the user");
    }


    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> addPhoto(IFormFile file)
    {
        var username = User.GetUserName();
        var user = await userRepository.GetUserByUserNameAsync(username);

        var result = await photoService.AddPhotoAsync(file);

        if (result.Error != null) return BadRequest(result.Error.Message);
        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        if (user.Photos.Count == 0)
        {
            photo.IsMain = true;
        }
        user.Photos.Add(photo);

        if (await userRepository.SaveAllAsync()) {
            return mapper.Map<PhotoDto>(photo);
        }
        return BadRequest("Error adding photo");
    }



}