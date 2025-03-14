using System.ComponentModel.DataAnnotations;

namespace FinTrack.Model
{
    public class TransactionsModel
    {
        [Key]
        public int TransactionId { get; set; }
        public Guid UserId { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserModel User { get; set; }
    }
}
