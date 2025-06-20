using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenamesInterestsInUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Intrests",
                table: "Users",
                newName: "Interests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Interests",
                table: "Users",
                newName: "Intrests");
        }
    }
}
