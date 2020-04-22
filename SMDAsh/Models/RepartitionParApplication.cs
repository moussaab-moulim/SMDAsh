using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models
{
    public class RepartitionParApplication
    {
        [Key]
        public int RPAID { get; set; }
        public string Project { get; set; }

        public int Count { get; set; }
    }
}
