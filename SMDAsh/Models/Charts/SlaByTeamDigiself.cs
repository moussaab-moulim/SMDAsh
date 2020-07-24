using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class SlaByTeamDigiself
    {
        public string sourceTool { get; set; }
        public string category { get; set; }
        public int achieved { get; set; }
        public int failed { get; set; }
        public int total { get; set; }
        public List<TargetType> targetType { get; set; }
        
    }

    public class TargetType
    {
        public string type { get; set; }
        public int achieved { get; set; }
        public int failed { get; set; }
        public int total { get; set; }
        public List<SlaByTeamNames> team { get; set; }
    }

    public class SlaByTeamNames
    {
        public string name { get; set; }
        public int achieved { get; set; }
        public int failed { get; set; }
        public int total { get; set; }
    }


}
