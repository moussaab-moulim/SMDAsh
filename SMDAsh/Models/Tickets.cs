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
        private string _WeekIn { get; set; }
        private string _WeekOut { get; set; }
        private string _YearIn { get; set; }
        private string _YearOut { get; set; }
        private string _YearWeekIn { get; set; } = "0000W00";
        private string _YearWeekOut { get; set; } = "0000W00";

        public string WeekIn { get { return _WeekIn; } set { _WeekIn = value;
                _YearWeekIn = value.Equals("") ?"" : _YearWeekIn.Remove(5, 2).Insert(5, value.Length == 1 ? value.Insert(0, "0") : value); } }
        public string WeekOut { get { return _WeekOut; } set { _WeekOut = value;
                _YearWeekOut = value.Equals("") ? "" : _YearWeekOut.Remove(5, 2).Insert(5, value.Length == 1 ? value.Insert(0, "0") : value);
            } }
        public string YearIn { get { return _YearIn; } set { _YearIn = value;
                _YearWeekIn = value.Equals("") ? "" : _YearWeekIn.Remove(0, 4).Insert(0, value);
            } }
        public string YearOut { get { return _YearOut; } set { _YearOut = value;
                
                _YearWeekOut = value.Equals("") ?
                    "" : 
                    _YearWeekOut.Remove(0, 4).Insert(0, value);
            } }
        public string YearWeekIn { get { return _YearWeekIn; } set { _YearWeekIn = value; } }
        public string YearWeekOut { get { return _YearWeekOut; } set { _YearWeekOut = value; } }

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

        public virtual ICollection<SlaTickets> SlaTickets { get; set; }

    }
}
