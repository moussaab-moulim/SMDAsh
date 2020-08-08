using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class Backlogs
    {
        public int Id { get; set; } 
        public string SourceTool { get; set; }
        public string YearWeek { get; set; }
        public string Day { get; set; }
        public int Year { get; set; }
        public int Week { get; set; }
        public int In { get; set; }
        public int Out { get; set; }

        public int? backlog { get; set; }


    }
}
