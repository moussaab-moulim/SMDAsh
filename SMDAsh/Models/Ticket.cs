using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models
{
    public class Ticket
    {
        [Key]
        public int TicketID { get; set; }

        public string ID { get; set; }

        public string SourceTool { get; set; }

        public string AssignedTo { get; set; }

        public string DateSent { get; set; }

        public string DateResolved { get; set; }

        public string DateClosed { get; set; }

        public string Priority { get; set; }

        public string P { get; set; }

        public string Status { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string WeekIn { get; set; }

        public string WeekOut { get; set; }

        public string YearIn { get; set; }

        public string YearOut { get; set; }

        public string YearWeekIn { get; set; }

        public string YearWeekOut { get; set; }

        public string SLO { get; set; }

        public string ResolutionDuration { get; set; }

        public string SLA { get; set; }

        public string SR { get; set; }

        public string Affectation { get; set; }

        public string MD { get; set; }
    }
}
