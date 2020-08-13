using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class backolgByage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BacklogByAge",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<string>(nullable: true),
                    Cat0To5 = table.Column<int>(nullable: false),
                    Cat6To12 = table.Column<int>(nullable: false),
                    Cat12To20 = table.Column<int>(nullable: false),
                    Cat20More = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BacklogByAge", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BacklogByAge");
        }
    }
}
