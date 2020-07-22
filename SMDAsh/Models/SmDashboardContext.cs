using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
        public DbSet<Users.User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tickets>().ToTable("Tickets")
                .HasIndex(t => new {t.TicketID,t.SourceTool })
                .IsUnique()
                .HasName("Index_by_TicketId_source_tool");

            modelBuilder.Entity<Tickets>()
            .HasOne(s => s.SlaTicket)
            .WithOne(t => t.ParentTicket)
            .HasForeignKey<SlaTickets>(s => s.ParentTicketId).HasPrincipalKey<Tickets>(t=>t.TicketID);
            
        }
    }
}
