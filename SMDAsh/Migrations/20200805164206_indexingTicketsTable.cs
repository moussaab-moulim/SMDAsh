using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class indexingTicketsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TicketID",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SourceTool",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Index_by_TicketId_Source_tool",
                table: "Tickets",
                columns: new[] { "TicketID", "SourceTool" },
                unique: true,
                filter: "[TicketID] IS NOT NULL AND [SourceTool] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Index_by_TicketId_Source_tool",
                table: "Tickets");

            migrationBuilder.AlterColumn<string>(
                name: "TicketID",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SourceTool",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
