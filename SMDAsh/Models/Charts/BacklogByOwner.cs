using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class BacklogByOwner
    {
        public string category { get; set; }
        public string assignedToService { get; set; }

        public string status { get; set; }
        public string application { get; set; }
        public int yearIn { get; set; }
        public int count { get; set; }
    }
}
