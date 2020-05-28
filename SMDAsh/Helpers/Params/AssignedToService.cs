using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Params
{
    public static class AssignedToService
    {
        public const string OCP = "OCP";
        public const string EDITOR = "Editeur";
        public const string TEAL = "Run service";
        public const string OWNER = "Presta";
        public const string EMPTY = "-";
        public const string NOT_CONFIGURED = "AssignedToService not configured";

        public static List<string> GetAll()
        {
            var fields = typeof(AssignedToService).GetFields();
            int paramsCount = fields.Length;
            List<string> allStatus = new List<string>();
            for (int i = 0; i < paramsCount; i++)
            {
                string status = fields[i].GetValue(null).ToString();
                allStatus.Add(status);
            }

            return allStatus;
        }
    }
    
}
