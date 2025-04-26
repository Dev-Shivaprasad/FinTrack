using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ReportController(DBcontext ReportDB) : ControllerBase
{
    [HttpGet]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<ReportModel[]>> GetReportdata(Guid UserId)
    {
        try
        {
            var debts = await ReportDB.Debts.Where(x => x.UserId == UserId).ToListAsync();
            var expenses = await ReportDB.Expenses.Where(x => x.UserId == UserId).ToListAsync();
            var incomes = await ReportDB.Incomes.Where(x => x.UserId == UserId).ToListAsync();
            var investments = await ReportDB.Investments.Where(x => x.UserId == UserId).ToListAsync();
            var savings = await ReportDB.Savings.Where(x => x.UserId == UserId).ToListAsync();

            List<ReportModel> allData = new List<ReportModel>
            {
                new ReportModel
                {
                    name = "Debts",
                    amount = debts.Sum(d => d.AmountOwed)
                },
                new ReportModel
                {
                    name = "Expenses",
                    amount = expenses.Sum(e => e.Amount)
                },
                new ReportModel
                {
                    name = "Incomes",
                    amount = incomes.Sum(i => i.Amount)
                },
                new ReportModel
                {
                    name = "Investments",
                    amount = investments.Sum(inv => inv.Amount)
                },
                new ReportModel
                {
                    name = "Savings",
                    amount = savings.Sum(s => s.CurrentAmount)
                }
            };

            return Ok(allData.ToList());
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching data by UserId.", error = ex.Message });
        }
    }
}