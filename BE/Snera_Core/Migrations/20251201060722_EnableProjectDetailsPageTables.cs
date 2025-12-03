using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Snera_Core.Migrations
{
    /// <inheritdoc />
    public partial class EnableProjectDetailsPageTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Difficulty_Level",
                table: "UserPost_Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "End_Date",
                table: "UserPost_Details",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserProject",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Team_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProject", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectCurrentTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Project_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Task_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Task_End_Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Is_Trashed = table.Column<bool>(type: "bit", nullable: false),
                    Is_Completed = table.Column<bool>(type: "bit", nullable: false),
                    Last_Edited_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectCurrentTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectCurrentTasks_UserProject_Project_Id",
                        column: x => x.Project_Id,
                        principalTable: "UserProject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectCurrentTasks_Users_User_Id",
                        column: x => x.User_Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectDeveloperRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Project_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Project_Interested_Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Project_Experience_Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Active_Hour = table.Column<int>(type: "int", nullable: false),
                    Last_Edited_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDeveloperRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectDeveloperRequests_UserProject_Project_Id",
                        column: x => x.Project_Id,
                        principalTable: "UserProject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectDeveloperRequests_Users_User_Id",
                        column: x => x.User_Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTeamMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Project_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Member_Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Is_Admin = table.Column<bool>(type: "bit", nullable: false),
                    Last_Edited_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTeamMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTeamMembers_UserProject_Project_Id",
                        column: x => x.Project_Id,
                        principalTable: "UserProject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTeamMembers_Users_User_Id",
                        column: x => x.User_Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTimelines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Project_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TimeLine_Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date_TimeFrame = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Timeline_Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Last_Edited_Timestamp = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Record_State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTimelines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTimelines_UserProject_Project_Id",
                        column: x => x.Project_Id,
                        principalTable: "UserProject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTimelines_Users_User_Id",
                        column: x => x.User_Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCurrentTasks_Project_Id",
                table: "ProjectCurrentTasks",
                column: "Project_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCurrentTasks_User_Id",
                table: "ProjectCurrentTasks",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDeveloperRequests_Project_Id",
                table: "ProjectDeveloperRequests",
                column: "Project_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDeveloperRequests_User_Id",
                table: "ProjectDeveloperRequests",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeamMembers_Project_Id",
                table: "ProjectTeamMembers",
                column: "Project_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeamMembers_User_Id",
                table: "ProjectTeamMembers",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTimelines_Project_Id",
                table: "ProjectTimelines",
                column: "Project_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTimelines_User_Id",
                table: "ProjectTimelines",
                column: "User_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectCurrentTasks");

            migrationBuilder.DropTable(
                name: "ProjectDeveloperRequests");

            migrationBuilder.DropTable(
                name: "ProjectTeamMembers");

            migrationBuilder.DropTable(
                name: "ProjectTimelines");

            migrationBuilder.DropTable(
                name: "UserProject");

            migrationBuilder.DropColumn(
                name: "Difficulty_Level",
                table: "UserPost_Details");

            migrationBuilder.DropColumn(
                name: "End_Date",
                table: "UserPost_Details");
        }
    }
}
