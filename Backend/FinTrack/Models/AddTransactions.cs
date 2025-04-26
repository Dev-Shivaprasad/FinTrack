using Microsoft.EntityFrameworkCore;

namespace FinTrack.Model;

public class AddTransactions(DBcontext _transactionDb, String FinanceType)
{
    public void AddTransaction(TransactionsModel transaction)
    {
        _transactionDb.Add(new TransactionsModel()
        {
            TransactionType = transaction.TransactionType,
            Amount = transaction.Amount,
            FinanceType = FinanceType,
            SourceCategory = transaction.SourceCategory,
            UserId = transaction.UserId,
            TransactionId = transaction.TransactionId,
        });
        _transactionDb.SaveChanges();
    }
}