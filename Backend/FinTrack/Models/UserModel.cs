using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Model
{
    public class UserModel
    {
        [Key] public Guid UserId { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}