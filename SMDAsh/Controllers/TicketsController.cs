using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoQueryable.AspNetCore.Filter.FilterAttributes;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SMDAsh.Helpers.Params;
using SMDAsh.Models;
using SMDAsh.Models.Charts;
using AutoQueryable;
using SMDAsh.Helpers.Exceptions;
using SMDAsh.Models.Errors;

namespace SMDAsh.Controllers
{
   
    [Route("api")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        // GET: api/Tickets
        private readonly SmDashboardContext _context;

        public TicketsController(SmDashboardContext context)
        {
            _context = context;
        }

        [HttpGet("[action]/{Category}"), AutoQueryable]
        public IQueryable<Backlogs> GetBacklog(string Category)

        {

            //System.Diagnostics.Debug.WriteLine();
            var cmdText = "GetBacklogByCat @Cat";
            var param = new SqlParameter("@Cat", Category);
            IQueryable<Backlogs> back = _context.Backlogs.FromSqlRaw(cmdText, param).ToList<Backlogs>().AsQueryable();
            return back;

        }

        [HttpGet("[action]/{Category}/{Service}")]
        [AutoQueryable]
        public  ActionResult<IQueryable> TicketsAssigned(string Category,string Service)
        {
            List<string> allStatus = StatusParams.GetForTicketsAssigned();
            List<string> allCategory = CategoryParams.GetAll();

            //bad request error;
            List<BadUrl> lit = new List<BadUrl>();

            if (!allCategory.Contains(Category, StringComparer.OrdinalIgnoreCase) && !Category.Equals("all"))
            {

                BadUrl obj = new BadUrl(Category);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            } else if (!AssignedToService.GetAll().Contains(Service, StringComparer.OrdinalIgnoreCase) && !Service.Equals("all"))
            {
                BadUrl obj = new BadUrl(Service);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            }
            
            var query =
                 (from t in _context.Tickets
                  where t.Category.Contains((Category.Equals("all")?"":Category))
                  && allStatus.Contains(t.Status)
                  && t.AssignedToService.Contains((Service.Equals("all") ? "" : Service))
                  select t);
            var results = query.ToList().GroupBy(t => t.Application)
                                   .Select(t => new TicketsAssigned()
                                   {
                                       category = Category,
                                       assignedToService = Service,
                                       application = t.Key,
                                       count = t.Count()
                                   })
                                   .AsQueryable<TicketsAssigned>();
            
            

            return Ok(results);






        }
    }
}
