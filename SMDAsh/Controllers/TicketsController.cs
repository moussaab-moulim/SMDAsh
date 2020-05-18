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
using SMDAsh.Models;

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
    }
}
