using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class addBacklog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Backlogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SourceTool = table.Column<string>(nullable: true),
                    YearWeek = table.Column<string>(nullable: true),
                    Day = table.Column<string>(nullable: true),
                    Year = table.Column<int>(nullable: false),
                    Week = table.Column<int>(nullable: false),
                    In = table.Column<int>(nullable: false),
                    Out = table.Column<int>(nullable: false),
                    backlog = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Backlogs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Backlogs");
        }
    }
}
