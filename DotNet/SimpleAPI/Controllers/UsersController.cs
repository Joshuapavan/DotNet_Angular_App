using Microsoft.AspNetCore.Mvc;
using SimpleAPI.Data;
using SimpleAPI.Entities;

namespace SimpleAPI.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UsersController : ControllerBase
    {

        // Dependency Injection
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            return Ok(_context.Users.ToList());    
        }


    }
}