using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class indexingSlaTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SlaTickets_Tickets_ParentTicketId",
                table: "SlaTickets");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tickets_TicketID",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "Index_by_TicketId_source_tool",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_SlaTickets_ParentTicketId",
                table: "SlaTickets");

            migrationBuilder.AlterColumn<string>(
                name: "TicketID",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "SourceTool",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SourceTool",
                table: "SlaTickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SlaID",
                table: "SlaTickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ParentTicketId",
                table: "SlaTickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParentTicketId1",
                table: "SlaTickets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SlaTickets_ParentTicketId1",
                table: "SlaTickets",
                column: "ParentTicketId1");

            migrationBuilder.CreateIndex(
                name: "Index_by_SlaId_Source_tool",
                table: "SlaTickets",
                columns: new[] { "SlaID", "SourceTool" },
                unique: true,
                filter: "[SlaID] IS NOT NULL AND [SourceTool] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_SlaTickets_Tickets_ParentTicketId1",
                table: "SlaTickets",
                column: "ParentTicketId1",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SlaTickets_Tickets_ParentTicketId1",
                table: "SlaTickets");

            migrationBuilder.DropIndex(
                name: "IX_SlaTickets_ParentTicketId1",
                table: "SlaTickets");

            migrationBuilder.DropIndex(
                name: "Index_by_SlaId_Source_tool",
                table: "SlaTickets");

            migrationBuilder.DropColumn(
                name: "ParentTicketId1",
                table: "SlaTickets");

            migrationBuilder.AlterColumn<string>(
                name: "TicketID",
                table: "Tickets",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SourceTool",
                table: "Tickets",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SourceTool",
                table: "SlaTickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SlaID",
                table: "SlaTickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ParentTicketId",
                table: "SlaTickets",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tickets_TicketID",
                table: "Tickets",
                column: "TicketID");

            migrationBuilder.CreateIndex(
                name: "Index_by_TicketId_source_tool",
                table: "Tickets",
                columns: new[] { "TicketID", "SourceTool" },
                unique: true,
                filter: "[TicketID] IS NOT NULL AND [SourceTool] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SlaTickets_ParentTicketId",
                table: "SlaTickets",
                column: "ParentTicketId",
                unique: true,
                filter: "[ParentTicketId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_SlaTickets_Tickets_ParentTicketId",
                table: "SlaTickets",
                column: "ParentTicketId",
                principalTable: "Tickets",
                principalColumn: "TicketID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
