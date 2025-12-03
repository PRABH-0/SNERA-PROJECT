using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Snera_Core.Migrations
{
    /// <inheritdoc />
    public partial class Add_post_Id_in_UserProject_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Post_Id",
                table: "UserProject",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProject_Post_Id",
                table: "UserProject",
                column: "Post_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProject_UserPost_Post_Id",
                table: "UserProject",
                column: "Post_Id",
                principalTable: "UserPost",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProject_UserPost_Post_Id",
                table: "UserProject");

            migrationBuilder.DropIndex(
                name: "IX_UserProject_Post_Id",
                table: "UserProject");

            migrationBuilder.DropColumn(
                name: "Post_Id",
                table: "UserProject");
        }
    }
}
