﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SMDAsh.Models;

namespace SMDAsh.Migrations
{
    [DbContext(typeof(SmDashboardContext))]
    [Migration("20200813134348_removeRealtions")]
    partial class removeRealtions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SMDAsh.Models.Charts.Backlogs", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Day")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("In")
                        .HasColumnType("int");

                    b.Property<int>("Out")
                        .HasColumnType("int");

                    b.Property<string>("SourceTool")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Week")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.Property<string>("YearWeek")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("backlog")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Backlogs");
                });

            modelBuilder.Entity("SMDAsh.Models.SlaTickets", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AssignedTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AssignedToService")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateClosed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateResolved")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateSent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("DsAge")
                        .HasColumnType("float");

                    b.Property<string>("P")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParentCategory")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParentTicketId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Priority")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Sharepoint")
                        .HasColumnType("bit");

                    b.Property<string>("SlaID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SourceTool")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TargetType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Team")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Update")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SlaID", "SourceTool")
                        .IsUnique()
                        .HasName("Index_by_SlaId_Source_tool")
                        .HasFilter("[SlaID] IS NOT NULL AND [SourceTool] IS NOT NULL");

                    b.ToTable("SlaTickets");
                });

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

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateClosed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateResolved")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateSent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("DsAge")
                        .HasColumnType("float");

                    b.Property<string>("DsFormattedInDay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DsFormattedOutDay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DsFormattedStatus")
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

                    b.Property<bool>("Sharepoint")
                        .HasColumnType("bit");

                    b.Property<string>("SourceTool")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Team")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TicketEtat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TicketID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Update")
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

                    b.HasIndex("TicketID", "SourceTool")
                        .IsUnique()
                        .HasName("Index_by_TicketId_Source_tool")
                        .HasFilter("[TicketID] IS NOT NULL AND [SourceTool] IS NOT NULL");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("SMDAsh.Models.Users.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
