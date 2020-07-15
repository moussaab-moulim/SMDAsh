using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class BacklogByAge
    {
        public string date { get; set; }
        public List<ageStats> ageCategory { get; set; }
    }

    public class ageStats
    {
        public string ageCategory { get; set; }
        public int count { get; set; }

    }
}
