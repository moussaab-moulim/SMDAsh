using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models.Errors
{
    public class BadUrl
    {
        public string Error { get; set; }
        public string Parameter { get; set; }

        public BadUrl( string parameter, string error = "Wrong get request parameter value: ")
        {
            this.Error = error;
            this.Parameter = parameter;
        }
    }
}
