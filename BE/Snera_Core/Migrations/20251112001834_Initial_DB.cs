using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Snera_Core.Migrations
{
    /// <inheritdoc />
    public partial class Initial_DB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Post_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Comment_Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Last_Edited_By = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostComments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostSkills",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Post_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Skill_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Skill_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Last_Edited_By = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostSkills", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UserPost",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Post_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Budget = table.Column<int>(type: "int", nullable: false),
                    Post_Like = table.Column<int>(type: "int", nullable: false),
                    Created_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Last_Edited_By = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPost", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPost_Details",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserPost_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Project_Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Weekly_Commitment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Start_Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Requirements = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Team_Info = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Team_Size = table.Column<int>(type: "int", nullable: false),
                    Author_Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author_Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author_Rating = table.Column<double>(type: "float", nullable: true),
                    Project_Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPost_Details", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPost_Details_UserPost_UserPost_Id",
                        column: x => x.UserPost_Id,
                        principalTable: "UserPost",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSkills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Skill_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSkills_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPost_Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Post_Details_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Role_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPost_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPost_Roles_UserPost_Details_Post_Details_Id",
                        column: x => x.Post_Details_Id,
                        principalTable: "UserPost_Details",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPost_Skills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Post_Details_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Skill_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Skill_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPost_Skills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPost_Skills_UserPost_Details_Post_Details_Id",
                        column: x => x.Post_Details_Id,
                        principalTable: "UserPost_Details",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPost_Details_UserPost_Id",
                table: "UserPost_Details",
                column: "UserPost_Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserPost_Roles_Post_Details_Id",
                table: "UserPost_Roles",
                column: "Post_Details_Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserPost_Skills_Post_Details_Id",
                table: "UserPost_Skills",
                column: "Post_Details_Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_UserId",
                table: "UserSkills",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostComments");

            migrationBuilder.DropTable(
                name: "PostSkills");

            migrationBuilder.DropTable(
                name: "UserPost_Roles");

            migrationBuilder.DropTable(
                name: "UserPost_Skills");

            migrationBuilder.DropTable(
                name: "UserSkills");

            migrationBuilder.DropTable(
                name: "UserPost_Details");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserPost");
        }
    }
}
