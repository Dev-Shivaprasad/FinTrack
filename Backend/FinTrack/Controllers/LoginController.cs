using FinTrack.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(DBcontext Logindb) : ControllerBase
{
    [HttpPost]
    public ActionResult<bool> ValidateLogin([FromBody] LoginModel Data)
    {
        var userExists = Logindb.Users.Where(u => u.Email == Data.Email && u.PasswordHash == Data.Password);

        return userExists.Count() > 0 ? true : false;
    }
}