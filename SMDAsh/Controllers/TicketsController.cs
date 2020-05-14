using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SMDAsh.Models;

namespace SMDAsh.Controllers
{

    //[Route("api")]
    //[ApiController]
    public class TicketsController : ODataController
    {
        // GET: api/Tickets
        private readonly TicketsContext _context;

        public TicketsController(TicketsContext context)
        {
            _context = context;
        }

        //[Route("[action]/{SourceTool}/{Category}")]
        //[HttpGet("[action]/{SourceTool}/{Category}")]
        [HttpGet]
        [EnableQuery]
        [ODataRoute("backlog/{SourceTool}")]
        public async Task<ActionResult<List<Backlog>>> GetBacklog([FromODataUri] string SourceTool)
        {

            string Category = "Anomalie";
            //System.Diagnostics.Debug.WriteLine();
            var cmdText = "GetBacklogByCat @Cat = @c, @SourceTool = @st";
            var @params = new[]{
            new SqlParameter("c", Category),
            new SqlParameter("st", SourceTool)};
            List<Backlog> queryResIn = await _context.Backlog.FromSqlRaw(cmdText, @params).ToListAsync<Backlog>();

            return queryResIn;

        }


    }
}
