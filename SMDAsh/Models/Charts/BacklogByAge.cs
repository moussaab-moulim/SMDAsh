using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class BacklogByAge
    {
        public int Id { get; set; }
        public string date { get; set; }
        public int Cat0To5 { get; set; }
        public int Cat6To12 { get; set; }
        public int Cat12To20 { get; set; }
        public int Cat20More { get; set; }
       
    }

}
