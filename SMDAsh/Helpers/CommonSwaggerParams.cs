using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Helpers
{
    public class CommonSwaggerParams : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null) operation.Parameters = new List<OpenApiParameter>();

            var descriptor = context.ApiDescription.ActionDescriptor as ControllerActionDescriptor;

            if (descriptor != null && !descriptor.ControllerName.StartsWith("Weather"))
            {
                operation.Parameters.Add(CreateParameter(context,"select","select columns"));
                operation.Parameters.Add(CreateParameter(context, "take", "only show specific number","int"));
                operation.Parameters.Add(CreateParameter(context, "skip", "skip a specific number of results", "int"));
                operation.Parameters.Add(CreateParameter(context, "first", "show first result (true)"));
                operation.Parameters.Add(CreateParameter(context, "last", "show first result (true)"));
                operation.Parameters.Add(CreateParameter(context, "orderby", "order asc by specific column"));
                operation.Parameters.Add(CreateParameter(context, "orderbydesc", "order desc by specific column"));
                operation.Parameters.Add(CreateParameter(context, "wrapwith", "wrapwith=count,total-count,next-link"));
                operation.Parameters.Add(CreateParameter(context, "pagesize", "specify how many result to shwo per page"));
                
            }
        }

        private OpenApiParameter CreateParameter(OperationFilterContext context, string name, string description, string type = null)
        {
            type = type ?? "string";
            return (new OpenApiParameter()
            {
                Name = name,
                In = ParameterLocation.Query,
                Description = description,
                Required = false,
                Schema = new OpenApiSchema
                {
                    Type = type
                   
                }
            });
        }
    }
}
