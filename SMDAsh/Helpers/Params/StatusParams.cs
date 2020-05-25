using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Params
{
    public static class StatusParams
    {
        public const string ABANDONED = "Abandonnée";
        public const string NEW = "Nouvelle";
        public const string TO_BE_TESTED = "A tester";
        public const string QUEUED = "Queued";
        public const string QUEUED_TEAL = "Queued TEAL";
        public const string RESOLVED = "Resolved";
        public const string EMPTY_STATUS = "-";
        public const string IN_PROCRESS = "En Cours";
        public const string NOT_CONFIGURED = "status not parametered";
            
        public static String[] GetAll() {
            var fields = typeof(StatusParams).GetFields();
            int paramsCount = fields.Length;
            string[] allStatus =new string[paramsCount];
            for (int i = 0; i<paramsCount;i++)
            {
                allStatus[i] = fields[i].GetValue(null).ToString();
            }

            return allStatus;
        }
        public static List<string> GetForTicketsAssigned()
        {
            var fields = typeof(StatusParams).GetFields();
            int paramsCount = fields.Length;
            List<string> allStatus = new List<string>();
            for (int i = 0; i < paramsCount; i++)
            {
                string status = fields[i].GetValue(null).ToString();
                if (status.In(EMPTY_STATUS, NOT_CONFIGURED, ABANDONED,RESOLVED)) continue;
                allStatus.Add(status);
            }

            return allStatus;
        }
    }
}
