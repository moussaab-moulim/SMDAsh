using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Exceptions
{
    public class DataIntegrationException : Exception
    {
        public DataIntegrationException() : base() { }

        public DataIntegrationException(string message) : base(String.Format("Column Destination Does not Exist {0}",message)) { }
        public DataIntegrationException(string message, Exception inner) : base(String.Format("Column Destination Does not Exist {0}", message), inner) { }
        
    }
}
