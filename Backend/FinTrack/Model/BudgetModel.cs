
using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class BudgetModel
    {
        [Key]
        public int BudgetId { get; set; }
        public Guid UserId { get; set; }
        public string MonthYear { get; set; }
        public string Category { get; set; }
        public decimal AllocatedAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}
