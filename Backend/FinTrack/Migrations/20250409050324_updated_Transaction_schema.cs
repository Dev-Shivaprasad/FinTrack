using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinTrack.Migrations
{
    /// <inheritdoc />
    public partial class updated_Transaction_schema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Transactions",
                newName: "SpendingCategory");

            migrationBuilder.RenameColumn(
                name: "Action",
                table: "Transactions",
                newName: "TransactionType");

            migrationBuilder.AddColumn<string>(
                name: "FinanceType",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinanceType",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "Transactions",
                newName: "Action");

            migrationBuilder.RenameColumn(
                name: "SpendingCategory",
                table: "Transactions",
                newName: "Category");
        }
    }
}
