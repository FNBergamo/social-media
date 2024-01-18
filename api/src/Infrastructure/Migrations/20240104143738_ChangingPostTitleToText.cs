using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangingPostTitleToText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Posts",
                newName: "Text");

            migrationBuilder.AddColumn<int>(
                name: "UserInteraction",
                table: "Posts",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserInteraction",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Posts",
                newName: "Title");
        }
    }
}
