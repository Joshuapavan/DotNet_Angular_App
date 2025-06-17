using Microsoft.AspNetCore.Mvc;

namespace SimpleAPI.Controllers;

public class HealthCheckController : BaseApiController
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "The Server is up and running"});
    }

}