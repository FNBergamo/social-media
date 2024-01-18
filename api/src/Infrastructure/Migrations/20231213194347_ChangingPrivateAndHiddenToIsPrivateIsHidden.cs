using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangingPrivateAndHiddenToIsPrivateIsHidden : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Private",
                table: "Posts",
                newName: "IsPrivate");

            migrationBuilder.RenameColumn(
                name: "Hidden",
                table: "Posts",
                newName: "IsHidden");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPrivate",
                table: "Posts",
                newName: "Private");

            migrationBuilder.RenameColumn(
                name: "IsHidden",
                table: "Posts",
                newName: "Hidden");
        }
    }
}
