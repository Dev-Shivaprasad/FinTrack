using FinTrack.Model;
using FinTrack.Services;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(DBcontext Logindb, JwtService JWT) : ControllerBase
{
    [HttpPost]
    public ActionResult Login([FromBody] LoginModel loginInfo)
    {
        if (string.IsNullOrWhiteSpace(loginInfo.Email) || string.IsNullOrWhiteSpace(loginInfo.Password))
        {
            return BadRequest(new { message = "Email and password are required." });
        }

        var user = Logindb.Users.FirstOrDefault(u =>
            u.Email == loginInfo.Email && u.PasswordHash == loginInfo.Password);

        if (user == null)
        {
            return NotFound(new { message = "User does not exist." });
        }

        if (user.PasswordHash != loginInfo.Password) // Replace this with proper password hashing
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var token = JWT.GenerateToken(username: user.Name, userid: user.UserId.ToString());

        return Ok(new { message = "Login successful!", JwtToken = token });
    }
}