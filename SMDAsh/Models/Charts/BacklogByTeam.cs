using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class BacklogByTeam
    {
        
        public string status { get; set; }
        public List<TeamStats> backlog { get; set; }


    }
    public class TeamStats
    {
        public string key { get; set; }
        public int count { get; set; }
    }

   
}

