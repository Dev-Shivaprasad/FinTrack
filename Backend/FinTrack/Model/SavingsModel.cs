using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class SavingsModel
    {
        [Key]
        public int SavingId { get; set; }
        public Guid UserId { get; set; }
        public string GoalName { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}
