using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class removeRealtions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SlaTickets_Tickets_ParentTicketId1",
                table: "SlaTickets");

            migrationBuilder.DropIndex(
                name: "IX_SlaTickets_ParentTicketId1",
                table: "SlaTickets");

            migrationBuilder.DropColumn(
                name: "ParentTicketId1",
                table: "SlaTickets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentTicketId1",
                table: "SlaTickets",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SlaTickets_ParentTicketId1",
                table: "SlaTickets",
                column: "ParentTicketId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SlaTickets_Tickets_ParentTicketId1",
                table: "SlaTickets",
                column: "ParentTicketId1",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
