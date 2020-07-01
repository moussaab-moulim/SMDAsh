using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class digiselfcolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sharepoint",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TicketEtat",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Sharepoint",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TicketEtat",
                table: "Tickets");
        }
    }
}
