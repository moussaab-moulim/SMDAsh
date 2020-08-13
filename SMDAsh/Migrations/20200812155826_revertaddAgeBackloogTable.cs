using Microsoft.EntityFrameworkCore.Migrations;

namespace SMDAsh.Migrations
{
    public partial class revertaddAgeBackloogTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ageStats");

            migrationBuilder.DropTable(
                name: "BacklogByAge");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BacklogByAge",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BacklogByAge", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ageStats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BacklogByAgeId = table.Column<int>(type: "int", nullable: true),
                    ageCategory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ageStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ageStats_BacklogByAge_BacklogByAgeId",
                        column: x => x.BacklogByAgeId,
                        principalTable: "BacklogByAge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ageStats_BacklogByAgeId",
                table: "ageStats",
                column: "BacklogByAgeId");
        }
    }
}
