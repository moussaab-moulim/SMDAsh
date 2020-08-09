using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SMDAsh.Models.Charts;

namespace SMDAsh.Models
{
    public partial class SmDashboardContext : DbContext
    {
        public SmDashboardContext()
        {
        }

        public SmDashboardContext(DbContextOptions<SmDashboardContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tickets> Tickets { get; set; }
        public virtual DbSet<SlaTickets> SlaTickets { get; set; }
        public virtual DbSet<Backlogs> Backlogs { get; set; }
        public DbSet<Users.User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tickets>().ToTable("Tickets")
                .HasIndex(t => new { t.TicketID, t.SourceTool })
                .IsUnique()
                .HasName("Index_by_TicketId_Source_tool");
            modelBuilder.Entity<SlaTickets>().ToTable("SlaTickets")
                .HasIndex(t => new { t.SlaID, t.SourceTool })
                .IsUnique()
                .HasName("Index_by_SlaId_Source_tool");
            modelBuilder.Entity<Tickets>()
            .HasMany(s => s.SlaTickets)
            .WithOne(t => t.ParentTicket);
            
        }
    }
}
