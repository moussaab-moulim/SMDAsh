using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Exceptions
{
    public class WrongUrlValueException : Exception
    {
        public WrongUrlValueException() : base() { }

        public WrongUrlValueException(string message) : base(String.Format("Wrong get request parameter value: {0}", message)) { }
        public WrongUrlValueException(string message, Exception inner) : base(String.Format("Wrong get request parameter value: {0}", message), inner) { }
    }
}
