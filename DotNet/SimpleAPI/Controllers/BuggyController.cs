using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAPI.Data;
using SimpleAPI.Entities;

namespace SimpleAPI.Controllers;

public class BuggyController(AppDbContext context) : BaseApiController
{

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetAuth()
    {
        return "Secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<string> GetNotFound()
    {
        var thing = context.Users.Find(-1);
        if (thing == null) return NotFound();

        return "Secret text";
    }


    [HttpGet("server-error")]
    public ActionResult<User> GetServerError()
    {
        var thing = context.Users.Find(-1) ?? throw new Exception("A bad thing at the server has happended");

        return thing;
    }


    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }

}