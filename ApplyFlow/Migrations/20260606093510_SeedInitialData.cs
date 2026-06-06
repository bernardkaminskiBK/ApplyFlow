using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ApplyFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "City", "Name", "Note", "Website" },
                values: new object[,]
                {
                    { 1, "Bratislava", "SEN Systems", "Potential React + .NET opportunity", "https://www.sensystems.sk" },
                    { 2, "Bratislava", "Alanata", "Junior Java Developer opportunity", "https://www.alanata.sk" }
                });

            migrationBuilder.InsertData(
                table: "ContactPersons",
                columns: new[] { "Id", "CompanyId", "Email", "Name", "Note", "Phone", "Role" },
                values: new object[] { 1, 1, "hr@sensystems.sk", "HR Contact", "Interview coordination", null, "Recruiter" });

            migrationBuilder.InsertData(
                table: "JobApplications",
                columns: new[] { "Id", "AppliedDate", "CompanyId", "Location", "Note", "PositionTitle", "SalaryMax", "SalaryMin", "Source", "Status", "WorkMode" },
                values: new object[,]
                {
                    { 1, new DateOnly(2026, 5, 28), 1, "Bratislava", "Minimal React knowledge required", "Fullstack Developer", 1400, 1200, 0, 2, 1 },
                    { 2, new DateOnly(2026, 6, 1), 2, "Bratislava", "Good match for Spring Boot practice", "Junior Java Developer", 1500, 1200, 0, 1, 1 }
                });

            migrationBuilder.InsertData(
                table: "ApplicationEvents",
                columns: new[] { "Id", "EventDate", "EventType", "JobApplicationId", "Note" },
                values: new object[,]
                {
                    { 1, new DateOnly(2026, 5, 28), 0, 1, "Application sent" },
                    { 2, new DateOnly(2026, 6, 12), 2, 1, "Interview scheduled" },
                    { 3, new DateOnly(2026, 6, 1), 0, 2, "Application sent with motivation letter" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ApplicationEvents",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ApplicationEvents",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ApplicationEvents",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ContactPersons",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "JobApplications",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "JobApplications",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
