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
        private readonly DBContext _context;

        public TicketsController(DBContext context)
        {
            _context = context;
        }

        //[Route("[action]/{SourceTool}/{Category}")]

        //[HttpGet]
        //[ODataRoute("Tickets/BacklogInOut/{Category)")]
        [HttpGet("[action]/{Category}"), AutoQueryable]
        public IQueryable<Backlog> GetBacklog(string Category)
        {

            //System.Diagnostics.Debug.WriteLine();
            var cmdText = "GetBacklogByCat @Cat";
            var param = new SqlParameter("@Cat", Category);

            IQueryable<Backlog> back = _context.Backlog.FromSqlRaw(cmdText, param).ToList<Backlog>().AsQueryable();
            return back;

        }
    }
}
