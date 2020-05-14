using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SMDAsh.Entities;

namespace SMDAsh.Models
{
    public class TicketsContext : DbContext
    {
        public TicketsContext(DbContextOptions<TicketsContext> options)
            : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Backlog> Backlog { get; set; }

        public DbSet<User> Users { get; set; }

    }
}
