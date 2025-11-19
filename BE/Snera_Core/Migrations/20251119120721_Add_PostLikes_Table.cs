using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Snera_Core.Migrations
{
    /// <inheritdoc />
    public partial class Add_PostLikes_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostLikes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Post_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Like_Count = table.Column<int>(type: "int", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostLikes_UserPost_Post_Id",
                        column: x => x.Post_Id,
                        principalTable: "UserPost",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostLikes_Post_Id",
                table: "PostLikes",
                column: "Post_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostLikes");
        }
    }
}
