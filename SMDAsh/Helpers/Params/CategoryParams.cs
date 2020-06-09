using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers.Params
{
    public static class CategoryParams
    {
        public const string INCIDENT = "Anomalie";
        public const string SR = "SR";
        public const string EVOLUTION = "Evolution";
        public const string NOT_CONFIGURED = "Category not configured";

        public static List<string> GetAll()
        {
            var fields = typeof(CategoryParams).GetFields();
            int paramsCount = fields.Length;
            List<string> allStatus = new List<string>();
            for (int i = 0; i < paramsCount; i++)
            {
                string status = fields[i].GetValue(null).ToString();
                allStatus.Add(status);
            }

            return allStatus;
        }
        public static List<string> GetAllForCharts()
        {
            var fields = typeof(CategoryParams).GetFields();
            int paramsCount = fields.Length;
            List<string> allCategory = new List<string>();
            for (int i = 0; i < paramsCount; i++)
            {
                string category = fields[i].GetValue(null).ToString();
                if(!category.In(NOT_CONFIGURED))
                    allCategory.Add(category);
            }

            return allCategory;
        }


    }
}
