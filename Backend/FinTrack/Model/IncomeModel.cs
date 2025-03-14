using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class IncomeModel
    {
        [Key]
        public int IncomeId { get; set; }
        public Guid UserId { get; set; }
        public string Source { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}

