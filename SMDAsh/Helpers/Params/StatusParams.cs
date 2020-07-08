using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Params
{
    public static class StatusParams
    {
        public const string ABANDONED = "ABANDONED";
        public const string NEW = "NEW";
        public const string TO_BE_TESTED = "TO BE TESTED";
        public const string QUEUED = "QUEUED";
        public const string QUEUED_TEAL = "QUEUED TEAL";
        public const string RESOLVED = "RESOLVED";
        public const string EMPTY = "-";
        public const string IN_PROGRESS = "IN PROGRESS";
        public const string NOT_CONFIGURED = "STATUS NOT CONFIGURED";

        public static List<string> GetAll() {
            var fields = typeof(StatusParams).GetFields();
            int paramsCount = fields.Length;
            List<string> allStatus =new List<string>();
            for (int i = 0; i<paramsCount;i++)
            {
                string status = fields[i].GetValue(null).ToString();
                allStatus.Add(status);
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
                if (status.In(EMPTY, NOT_CONFIGURED, ABANDONED,RESOLVED)) continue;
                allStatus.Add(status);
            }

            return allStatus;
        }
        public static List<string> GetGigiselfStatus(){
            return null;
        }
    }
}
