using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models
{
    public class BacklogInOut
    {
        [Key]
        public int backlogID { get; set; }
        public string SourceTool { get; set; }
        public string YearWeek { get; set; }

        public string Year { get; set; }
        public string Week { get; set; }
        public int In { get; set; }
        public int Out { get; set; }
       
        public int Backlog { get; set; }
    }
}
