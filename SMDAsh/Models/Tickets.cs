using System;
using System.Collections.Generic;

namespace SMDAsh.Models
{
    public partial class Tickets
    {
        public int Id { get; set; }
        public string TicketID { get; set; }
        public string SourceTool { get; set; }
        public string Application { get; set; }
        public string AssignedTo { get; set; }
        public string DateSent { get; set; }
        public string DateResolved { get; set; }
        public string DateClosed { get; set; }
        public string Update { get; set; }
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
        public string AssignedToService { get; set; }
        public string Team { get; set; }
        public bool Sharepoint { get; set; }
        public string CreatedBy { get; set; }
        public string TicketEtat { get; set; }
        public string DsFormattedStatus { get; set; }
        public string DsFormattedInDay { get; set; }
        public string DsFormattedOutDay { get; set; }
        public double DsAge { get; set; }

    }
}
