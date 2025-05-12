using FinTrack.Dto;
using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ExpenseController(DBcontext Expensedb) : ControllerBase
{
    AddTransactions t = new AddTransactions(Expensedb, FinanceType:"Expense");


    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExpenseModel>>> GetAllExpenses()
    {
        try
        {
            var Expense = await Expensedb.Expenses.ToListAsync();
            return Ok(Expense);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving Expenses.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExpenseModel>> GetExpense(Guid id)
    {
        try
        {
            var Expense = await Expensedb.Debts.FindAsync(id);
            if (Expense == null) return NotFound(new { message = "Expense record not found." });

            return Ok(Expense);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the Expense.", error = ex.Message });
        }
    }

    [HttpGet()]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<ExpenseModel>> GetExpenseByUserId(Guid UserId)
    {
        try
        {
            var expense = await Expensedb.Expenses.Where(id => id.UserId == UserId).ToListAsync();
            if (expense == null) return NotFound(new { message = "Expense record not found." });

            var d = expense.ToList();
            return Ok(d);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the expense by UserId.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<ExpenseModel>> PostExpense(ExpenseModel addExpense)
    {
        try
        {
            if (addExpense == null)
                return BadRequest(new { message = "Invalid Debt data provided." });

            Expensedb.Expenses.Add(addExpense);
            t.AddTransaction(new TransactionsModel()
            {
                UserId = addExpense.UserId,
                TransactionType = 1,
                Amount = addExpense.Amount,
                SourceCategory = addExpense.Category
            });
            await Expensedb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExpense), new { id = addExpense.ExpenseId }, addExpense);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding Expense.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutExpense(Guid id, ExpenseModel updateExpense)
    {
        try
        {
            updateExpense.ExpenseId = id;
            var existingExpense = await Expensedb.Expenses.FindAsync(id);
            if (existingExpense == null)
                return NotFound(new { message = "Expense record not found." });

            updateExpense.CreatedAt = existingExpense.CreatedAt;
            existingExpense.Category = updateExpense.Category;
            existingExpense.Amount = updateExpense.Amount;
            existingExpense.DateSpent = updateExpense.DateSpent;
            existingExpense.IsFixed = updateExpense.IsFixed;
            existingExpense.UserId = updateExpense.UserId;
            t.AddTransaction(new TransactionsModel()
            {
                UserId = updateExpense.UserId,
                TransactionType = 2,
                Amount = updateExpense.Amount,
                SourceCategory = updateExpense.Category,
            });
            await Expensedb.SaveChangesAsync();

            return Ok(new { message = "Expense updated successfully." });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating Expense.", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpense(Guid id)
    {
        try
        {
            var Expense = await Expensedb.Expenses.FindAsync(id);
            if (Expense == null) return NotFound(new { message = "Expense record not found." });

            Expensedb.Expenses.Remove(Expense);
            t.AddTransaction(new TransactionsModel()
            {
                UserId = Expense.UserId,
                TransactionType = 3,
                Amount = Expense.Amount,
                SourceCategory = Expense.Category,
            });
            await Expensedb.SaveChangesAsync();

            return Ok(new { message = "Expense record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting Expense.", error = ex.Message });
        }
    }
}