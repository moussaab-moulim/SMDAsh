using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models
{
    public class Backlogs
    {
        public string SourceTool { get; set; }
        [Key]
        public string YearWeek { get; set; }
        public int Year { get; set; }
        public int Week { get; set; }
        public int In { get; set; }
        public int Out { get; set; }

        public int? backlog { get; set; }


    }
}
