using FinTrack.Model;
using FinTrack.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(DBcontext Logindb, JwtService JWT) : ControllerBase
{
    [HttpPost("login")]
    public ActionResult Login([FromBody] LoginModel logininfo)
    {
        var user = Logindb.Users.FirstOrDefault(u =>
            u.Email == logininfo.Email);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var token = JWT.GenerateToken(user.Name, user.UserId.ToString());
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true, // Prevent JavaScript access (protects against XSS)
            Secure = true, // Only send over HTTPS
            SameSite = SameSiteMode.Strict, // Protects against CSRF
            Expires = DateTime.UtcNow.AddHours(1) // Set expiration time
        };

        Response.Cookies.Append("jwt", token, cookieOptions);

        return Ok(new { message = "Login successful!" });
    }
}