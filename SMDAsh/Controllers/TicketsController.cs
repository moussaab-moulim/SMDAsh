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

        [HttpGet("[action]/{Category}/{Service}"), AutoQueryable]
        public IQueryable TicketsAssigned(string Category,string Service)

        {
            List<string> allStatus = StatusParams.GetForTicketsAssigned();
            System.Diagnostics.Debug.WriteLine(allStatus.Contains("Abondonnée"));
            allStatus.ForEach(i => System.Diagnostics.Debug.WriteLine(i));
            var query = Category.ToLower().Equals("all") ?
                (from t in _context.Tickets
                 where  allStatus.Contains(t.Status)
                 select t) :
                 (from t in _context.Tickets
                  where t.Category == Category && allStatus.Contains(t.Status)
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
            

            return results;






        }
    }
}
