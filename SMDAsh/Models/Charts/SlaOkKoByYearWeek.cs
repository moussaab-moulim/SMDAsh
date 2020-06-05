using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class SlaOkKoByYearWeek
    {
        public string category { get; set; }
        public string yearOut { get; set; }
        public string yearWeekOut { get; set; }
        public string ok { get; set; }
        public string ko { get; set; }
        public int total { get; set; }
    }
}
