using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinTrack.Migrations
{
    /// <inheritdoc />
    public partial class updated_Transaction_schema_Name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpendingCategory",
                table: "Transactions",
                newName: "SourceCategory");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "MonthYear",
                table: "Budgets",
                type: "date",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SourceCategory",
                table: "Transactions",
                newName: "SpendingCategory");

            migrationBuilder.AlterColumn<string>(
                name: "MonthYear",
                table: "Budgets",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }
    }
}
