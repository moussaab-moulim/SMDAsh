using SMDAsh.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers
{
    public static class DbInitializer
    {
        public static void Initialize(SmDashboardContext context)
        {
            //context.Database.EnsureCreated();

            // Look for any students.
            if (context.Tickets.Any())
            {
                return;   // DB has been seeded
            }

        }
    }
}
