using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class SlaCount
    {
        public string category { get; set; }
        public string year { get; set; }
        public string week { get; set; }

        public string application { get; set; }
        private int _ok;
        private int _ko;
        private int _total;
        public int ok { get { return _ok; } set { _ok = value; _total = _ok + _ko; } }
        public int ko { get { return _ko; } set { _ko = value; _total = _ok + _ko; } }

        public int total { get { return _total; } set { _total = value; } }

    }
}
