using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinTrack.Controllers.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class Validate : ControllerBase
{
    [HttpGet]
    public bool Func()
    {
        return true;
    }

    [AllowAnonymous]
    [HttpGet("Apiworking")]
    public bool tr()
    {
        return true;
    }
}