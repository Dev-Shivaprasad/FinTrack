using FinTrack.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DebtController(DBcontext Debtdb) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DebtModel>>> GetAllDebts()
    {
        try
        {
            var Debt = await Debtdb.Debts.ToListAsync();
            return Ok(Debt);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving debts.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DebtModel>> GetDebt(Guid id)
    {
        try
        {
            var Debt = await Debtdb.Debts.FindAsync(id);
            if (Debt == null) return NotFound(new { message = "Debt record not found." });

            return Ok(Debt);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the Debt.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<DebtModel>> PostDebt(DebtModel addDebt)
    {
        try
        {
            if (addDebt == null)
                return BadRequest(new { message = "Invalid Debt data provided." });

            Debtdb.Debts.Add(addDebt);
            await Debtdb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDebt), new { id = addDebt.DebtId }, addDebt);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding Debt.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutDebt(Guid id, DebtModel updateDebt)
    {
        try
        {
            updateDebt.DebtId = id;
            var existingDebt = await Debtdb.Debts.FindAsync(id);
            if (existingDebt == null)
                return NotFound(new { message = "Debt record not found." });

            // Preserve CreatedAt from the existing record
            updateDebt.CreatedAt = existingDebt.CreatedAt;

            // Update only necessary fields (avoid full entity replacement)
            existingDebt.Lender = updateDebt.Lender;
            existingDebt.AmountOwed = updateDebt.AmountOwed;
            existingDebt.DueDate = updateDebt.DueDate;
            existingDebt.UserId = updateDebt.UserId;

            await Debtdb.SaveChangesAsync();

            return Ok(new { message = "Debt updated successfully." });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating Debt.", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDebt(Guid id)
    {
        try
        {
            var Debt = await Debtdb.Debts.FindAsync(id);
            if (Debt == null) return NotFound(new { message = "Debt record not found." });

            Debtdb.Debts.Remove(Debt);
            await Debtdb.SaveChangesAsync();

            return Ok(new { message = "Debt record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting Debt.", error = ex.Message });
        }
    }
}