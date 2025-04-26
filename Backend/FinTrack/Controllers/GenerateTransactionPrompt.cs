using System.Collections.Specialized;
using FinTrack.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GenerateTransactionPrompt(DBcontext PromptDB) : ControllerBase
{
    [HttpGet]
    [Route("{UserId}")]
    public async Task<ActionResult<AiPromptDataModel>> GetPrompt(Guid UserId)
    {
        try
        {
            string currency = "Indian Rupees";

            var Debts = await PromptDB.Debts.Where(id => id.UserId == UserId).ToListAsync();
            var Expenses = await PromptDB.Expenses.Where(id => id.UserId == UserId).ToListAsync();
            var Incomes = await PromptDB.Incomes.Where(id => id.UserId == UserId).ToListAsync();
            var Investments = await PromptDB.Investments.Where(id => id.UserId == UserId).ToListAsync();
            var Savings = await PromptDB.Savings.Where(id => id.UserId == UserId).ToListAsync();

            var allSummaries = "";

            allSummaries += string.Join(" ", Debts.Select(data =>
                $"Amount {data.AmountOwed} {currency} owed to {data.Lender} at interest rate of {data.InterestRate}% due in {(data.DueDate.ToDateTime(TimeOnly.MinValue) - DateTime.Today).Days} days,"));

            allSummaries += " " + string.Join(" ", Expenses.Select(data =>
                $"Spent {data.Amount} {currency} on {data.Category} and it is {(data.IsFixed ? "a fixed" : "not a fixed")} expense,"));

            allSummaries += " " + string.Join(" ", Incomes.Select(data =>
                $"Income of {data.Amount} {currency} from {data.Source} and it is {(data.IsFixed ? "a fixed" : "not a fixed")} income,"));

            allSummaries += " " + string.Join(" ", Investments.Select(data =>
                $"Invested {data.Amount} {currency} into {data.Category},"));

            allSummaries += " " + string.Join(" ", Savings.Select(data =>
                $"Started saving for {data.GoalName} which costs {data.TargetAmount} {currency}. Saved so far: {data.CurrentAmount} {currency},"));

            if (string.IsNullOrWhiteSpace(allSummaries))
                return NotFound(new { message = "prompt record not found." });

            return Ok(new AiPromptDataModel()
            {
                PromptData = allSummaries.Trim()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching by UserId.", error = ex.Message });
        }
    }

    // [HttpGet]
    // [Route("GetAISuggestions/{UserId}")]
    // public async Task<ActionResult<AiPromptDataModel>> GetAISuggestions(Guid UserId)
    // {
    //     var data = new Dictionary<string, string>
    //     {
    //         { "Prompt", GetPrompt(UserId).Result.ToString() }
    //     };
    //     using (var client = new HttpClient())
    //     {
    //         client.BaseAddress = new Uri("http://localhost:8000/");
    //
    //         var content = new FormUrlEncodedContent(data);
    //
    //         var response = await client.PostAsync("api/AnalyzeFinancialData/", content);
    //
    //         if (response.IsSuccessStatusCode)
    //         {
    //             string result = await response.Content.ReadAsStringAsync();
    //             return Content(result);
    //         }
    //         else
    //         {
    //             // Handle error
    //             string error = await response.Content.ReadAsStringAsync();
    //             Console.WriteLine($"Error: {response.StatusCode} - {error}");
    //             return BadRequest();
    //         }
    //     }
    // }
}