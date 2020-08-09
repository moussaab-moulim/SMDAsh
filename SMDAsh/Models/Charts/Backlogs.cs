using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Charts
{
    public class Backlogs
    {
        public int Id { get; set; } 
        public string SourceTool { get; set; }
        private string _YearWeek { get; set; } = "0000W00";
        public string Day { get; set; }
        private int _Year { get; set; }
        private int _Week { get; set; }
        public int In { get; set; }
        public int Out { get; set; }
        public int? backlog { get; set; }

        public string YearWeek { get { return _YearWeek; } set { _YearWeek = value; } }
        public int Year { get { return _Year; } 
            set { _Year = value;
                _YearWeek = value.Equals("") ? "" : _YearWeek.Remove(0,4).Insert(0,value.ToString()); } }

        public int Week
        {
            get { return _Week; }
            set
            {
                _Week = value;
                string week = value.ToString();
                if (value < 10) week = week.Insert(0, "0");
                _YearWeek = value.Equals("") ? "" : _YearWeek.Remove(5, 2).Insert(5, week);
            }
        }
        


    }
}
