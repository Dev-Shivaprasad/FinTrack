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
    public ActionResult<bool> ValidateLogin([FromBody] LoginModel logininfo)
    {
        var userExists = Logindb.Users.Where(u => u.Email == logininfo.Email && u.PasswordHash == logininfo.Password);
        return userExists.Count() > 0
            ? Ok(new { id = userExists.FirstOrDefault().UserId, username = userExists.FirstOrDefault().Name })
            : NotFound(new { message = "User not found." });
    }
}