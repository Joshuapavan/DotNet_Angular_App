using Microsoft.AspNetCore.Mvc;

namespace SimpleAPI.Controllers{

    [ApiController]
    [Route("api/[controller]")]
    public class HealthCheckController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "The Server is up and running"});
        }

    }
}