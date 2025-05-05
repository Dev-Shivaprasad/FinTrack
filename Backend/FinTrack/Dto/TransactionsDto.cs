using System.ComponentModel.DataAnnotations.Schema;

namespace FinTrack.Dto;

public class TransactionsDto
{
    public Guid? TransactionId { get; set; }
    public Guid UserId { get; set; }

    /// <summary>
    /// (Ration, Dailyutility spendings)
    /// </summary>
    public string SourceCategory { get; set; }

    [Column(TypeName = "decimal(18,2)")] public decimal Amount { get; set; }

    /// <summary>
    /// action (Add/Delete/Update)
    /// </summary>
    public string TransactionType { get; set; }

    public DateTime? Date { get; set; }

    /// <summary>
    ///  (investment, debt, etc.).
    /// </summary>
    public string FinanceType { get; set; }
}