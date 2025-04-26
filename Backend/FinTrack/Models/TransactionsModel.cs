using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class TransactionsModel
    {
        [Key] public Guid? TransactionId { get; set; }
        public Guid UserId { get; set; }

        /// <summary>
        /// (Ration, Dailyutility spendings)
        /// </summary>
        public string SourceCategory { get; set; }

        [Column(TypeName = "decimal(18,2)")] public decimal Amount { get; set; }

        /// <summary>
        /// action (Add/Delete/Update)
        /// </summary>
        public int TransactionType { get; set; }

        /// <summary>
        ///  (investment, debt, etc.).
        /// </summary>
        public string FinanceType { get; set; }

        public DateTime? CreatedAt { get; set; }
        [JsonIgnore] public UserModel? User { get; set; }
    }
}