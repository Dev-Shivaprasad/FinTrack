using FinTrack.Model;

namespace FinTrack.BusinessLogics;

public static class AddTrasactions
{
    public static void AddTrasaction(DBcontext transactionDb, TransactionsModel transaction)
    {
        transactionDb.Transactions.Add(transaction);
        transactionDb.SaveChanges();
    }
}