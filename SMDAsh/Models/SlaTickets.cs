using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models
{
    public class SlaTickets
    {
        public int Id { get; set; }
        public string SlaID { get; set; }
        public string ParentTicketId { get; set; }
        public string SourceTool { get; set; }
        public string TargetType { get; set; }
        public string AssignedTo { get; set; }
        public string DateSent { get; set; }
        public string DateResolved { get; set; }
        public string DateClosed { get; set; }
        public string Update { get; set; }
        public string Priority { get; set; }
        public string P { get; set; }
        public string Status { get; set; }
        public string ParentCategory { get; set; }
        public string AssignedToService { get; set; }
        public string Team { get; set; }
        public bool Sharepoint { get; set; }
        public string CreatedBy { get; set; }
        public double DsAge { get; set; }
        public virtual Tickets ParentTicket { get; set; }
    }
}
