using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class DebtModel
    {
        [Key]
        public int DebtId { get; set; }
        public Guid UserId { get; set; }
        public string Lender { get; set; }
        public decimal AmountOwed { get; set; }
        public float InterestRate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}
