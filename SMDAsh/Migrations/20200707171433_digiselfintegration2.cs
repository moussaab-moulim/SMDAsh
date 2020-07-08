using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class digiselfintegration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Sharepoint",
                table: "Tickets",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "DsAge",
                table: "Tickets",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "DsFormattedInDay",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DsFormattedOutDay",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DsFormattedStatus",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DsAge",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DsFormattedInDay",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DsFormattedOutDay",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DsFormattedStatus",
                table: "Tickets");

            migrationBuilder.AlterColumn<string>(
                name: "Sharepoint",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(bool));
        }
    }
}
