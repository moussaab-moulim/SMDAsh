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
        public DbSet<Users.User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tickets>().ToTable("Tickets");
        }
    }
}
