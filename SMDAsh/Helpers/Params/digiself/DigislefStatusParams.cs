using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Params.digiself
{
    public static class DigislefStatusParams
    {
        public const string REJECTED = "REJECTED";
        public const string IN_PROGRESS = "IN PROGRESS";
        public const string PENDING = "PENDING";
        public const string CLOSED = "CLOSED";
        public const string RESOLVED_WAIT_USER = "RESOLVED WAIT. USER";
        public const string NOT_CONFIGURED_STATUS = "NOT CONFIGURED STATUS";

        public static Dictionary<string,string> StatusParams()
        {
            var status = new Dictionary<string, string>();

            status.Add("Open_c",IN_PROGRESS);
            status.Add("Pending",PENDING);
            status.Add("RequestStatusAssigned_c", IN_PROGRESS);
            status.Add("RequestStatusInProgress", IN_PROGRESS);
            status.Add("RequestStatusPending", PENDING);
            status.Add("RequestStatusRejected", REJECTED);
            status.Add("RequestStatusReopened_c", IN_PROGRESS);
            status.Add("RequestStatusSuspended", PENDING);
            status.Add("Suspended", PENDING);
            status.Add("Closed_c", CLOSED);
            status.Add("InProgress", IN_PROGRESS);
            status.Add("Resolved_c", CLOSED);
            status.Add("RequestStatusComplete", CLOSED);
            status.Add("Additional", RESOLVED_WAIT_USER); 

            return status;
        }
    }
}
