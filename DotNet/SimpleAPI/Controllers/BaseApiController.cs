using Microsoft.AspNetCore.Mvc;
using SimpleAPI.Helpers;

namespace SimpleAPI.Controllers;

[ServiceFilter(typeof(LogUserActivity))]
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

}