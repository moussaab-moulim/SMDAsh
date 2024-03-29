﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SMDAsh.Models;

namespace SMDAsh.Migrations
{
    [DbContext(typeof(SmDashboardContext))]
    [Migration("20200518200514_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SMDAsh.Models.Tickets", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Affectation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Application")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AssignedTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AssignedToService")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateClosed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateResolved")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateSent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MD")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("P")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Priority")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ResolutionDuration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SLA")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SLO")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SR")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SourceTool")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TicketID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WeekIn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WeekOut")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearIn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearOut")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearWeekIn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearWeekOut")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tickets");
                });
#pragma warning restore 612, 618
        }
    }
}
