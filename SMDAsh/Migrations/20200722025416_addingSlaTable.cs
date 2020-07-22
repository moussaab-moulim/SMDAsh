using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class addingSlaTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TicketID",
                table: "Tickets",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tickets_TicketID",
                table: "Tickets",
                column: "TicketID");

            migrationBuilder.CreateTable(
                name: "SlaTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SlaID = table.Column<string>(nullable: true),
                    ParentTicketId = table.Column<string>(nullable: true),
                    SourceTool = table.Column<string>(nullable: true),
                    TargetType = table.Column<string>(nullable: true),
                    AssignedTo = table.Column<string>(nullable: true),
                    DateSent = table.Column<string>(nullable: true),
                    DateResolved = table.Column<string>(nullable: true),
                    DateClosed = table.Column<string>(nullable: true),
                    Update = table.Column<string>(nullable: true),
                    Priority = table.Column<string>(nullable: true),
                    P = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    ParentCategory = table.Column<string>(nullable: true),
                    AssignedToService = table.Column<string>(nullable: true),
                    Team = table.Column<string>(nullable: true),
                    Sharepoint = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    DsAge = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SlaTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SlaTickets_Tickets_ParentTicketId",
                        column: x => x.ParentTicketId,
                        principalTable: "Tickets",
                        principalColumn: "TicketID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SlaTickets_ParentTicketId",
                table: "SlaTickets",
                column: "ParentTicketId",
                unique: true,
                filter: "[ParentTicketId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SlaTickets");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tickets_TicketID",
                table: "Tickets");

            migrationBuilder.AlterColumn<string>(
                name: "TicketID",
                table: "Tickets",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
