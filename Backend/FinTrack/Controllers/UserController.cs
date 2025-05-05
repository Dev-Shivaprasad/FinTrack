using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(DBcontext Userreg) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            try
            {
                var user = await Userreg.Users.ToListAsync();
                return user.Select(User => new UserModel()
                {
                    UserId = User.UserId,
                    CreatedAt = User.CreatedAt,
                    Name = User.Name,
                    Email = User.Email,
                    PasswordHash = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                }).ToList();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching users.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(Guid id)
        {
            try
            {
                var user = await Userreg.Users.FindAsync(id);

                if (user == null) return NotFound(new { message = "User not found." });
                return new UserModel()
                {
                    UserId = user.UserId,
                    CreatedAt = user.CreatedAt,
                    Name = user.Name,
                    Email = user.Email,
                    PasswordHash = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occurred while fetching the user.", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<object>> PostUser(UserModel user)
        {
            if (user == null) return BadRequest(new { message = "Invalid user data." });
            if (await Userreg.Users.AnyAsync(model => model.Email == user.Email))
                return BadRequest(new { message = "This email is already taken." });

            try
            {
                Userreg.Users.Add(user);
                await Userreg.SaveChangesAsync();
                return Ok(new { message = "User created." });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occurred while creating the user.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, UserModel user)
        {
            if (user == null)
                return BadRequest(new { message = "Invalid user data." });

            try
            {
                var existingUser = await Userreg.Users.FindAsync(id);
                if (existingUser == null)
                    return NotFound(new { message = "User not found." });

                // Preserve CreatedAt
                user.CreatedAt = existingUser.CreatedAt;

                // Update only necessary fields (DO NOT replace the whole entity)
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.PasswordHash = user.PasswordHash;

                await Userreg.SaveChangesAsync();
                return Ok(new { message = "User updated successfully." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await UserExists(id))
                    return NotFound(new { message = "User not found." });

                throw;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { message = "An error occurred while updating the user.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                var user = await Userreg.Users.FindAsync(id);
                if (user == null) return NotFound(new { message = "User not found." });


                Userreg.Users.Remove(user);
                await Userreg.SaveChangesAsync();
                return StatusCode(204, new { message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occurred while deleting the user.", error = ex.Message });
            }
        }

        private async Task<bool> UserExists(Guid id)
        {
            return await Userreg.Users.AnyAsync(u => u.UserId == id);
        }
    }
}