using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class TicketsByType
    {
        public string service { get; set; }
        public string year { get; set; }
        public Dictionary<string, List<MonthStats>> quarters { get; set; }


    }

    public class MonthStats
    {
        public string month { get; set; }
        public int m { get; set; }
        private Dictionary<string, int> _categories { get; set; }
        private int _countTotal { get; set; }

        public Dictionary<string, int> categories { get { return _categories; } set { _categories = value; _countTotal = CalculateCount(); } }
        public int countTotal { get { return _countTotal; } set { _countTotal = value; } }
        private int CalculateCount()
        {
            int count = 0;
            foreach (var cat in _categories)
            {
                count += cat.Value;
            }
            return count;
        }

        
    }
}
