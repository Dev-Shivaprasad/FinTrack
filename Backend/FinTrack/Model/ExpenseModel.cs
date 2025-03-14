using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class ExpenseModel
    {
        [Key]
        public int ExpenseId { get; set; }
        public Guid UserId { get; set; }
        public string Category { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateSpent { get; set; }
        public bool IsFixed { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}
