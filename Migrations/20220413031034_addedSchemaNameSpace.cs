using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Guild.Migrations
{
    public partial class addedSchemaNameSpace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestUser_Quests_QuestsId",
                table: "QuestUser");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestUser_Users_UsersId",
                table: "QuestUser");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestUser_Quests_UsersId",
                table: "QuestUser",
                column: "UsersId",
                principalTable: "Quests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestUser_Users_QuestsId",
                table: "QuestUser",
                column: "QuestsId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestUser_Quests_UsersId",
                table: "QuestUser");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestUser_Users_QuestsId",
                table: "QuestUser");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestUser_Quests_QuestsId",
                table: "QuestUser",
                column: "QuestsId",
                principalTable: "Quests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestUser_Users_UsersId",
                table: "QuestUser",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
