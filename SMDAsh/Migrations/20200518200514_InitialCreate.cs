using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketID = table.Column<string>(nullable: true),
                    SourceTool = table.Column<string>(nullable: true),
                    Application = table.Column<string>(nullable: true),
                    AssignedTo = table.Column<string>(nullable: true),
                    DateSent = table.Column<string>(nullable: true),
                    DateResolved = table.Column<string>(nullable: true),
                    DateClosed = table.Column<string>(nullable: true),
                    Priority = table.Column<string>(nullable: true),
                    P = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    WeekIn = table.Column<string>(nullable: true),
                    WeekOut = table.Column<string>(nullable: true),
                    YearIn = table.Column<string>(nullable: true),
                    YearOut = table.Column<string>(nullable: true),
                    YearWeekIn = table.Column<string>(nullable: true),
                    YearWeekOut = table.Column<string>(nullable: true),
                    SLO = table.Column<string>(nullable: true),
                    ResolutionDuration = table.Column<string>(nullable: true),
                    SLA = table.Column<string>(nullable: true),
                    SR = table.Column<string>(nullable: true),
                    Affectation = table.Column<string>(nullable: true),
                    MD = table.Column<string>(nullable: true),
                    AssignedToService = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");
        }
    }
}
