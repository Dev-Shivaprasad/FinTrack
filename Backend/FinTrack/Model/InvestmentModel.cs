using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class InvestmentModel
    {
        [Key]
        public int InvestmentId { get; set; }
        public Guid UserId { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateInvested { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}
