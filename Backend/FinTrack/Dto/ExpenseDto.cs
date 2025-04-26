namespace FinTrack.Dto;

public class ExpenseDto
{
    public Guid? ExpenseId { get; set; }
    public Guid UserId { get; set; }
    public string Category { get; set; }
    public decimal Amount { get; set; }
    public DateOnly DateSpent { get; set; }
    public string IsFixed { get; set; }
    public DateTime? CreatedAt { get; set; }
}