using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SMDAsh.Models;

namespace SMDAsh.Controllers
{

    [Route("api")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        // GET: api/Tickets
        private readonly TicketsContext _context;

        public TicketsController(TicketsContext context)
        {
            _context = context;
        }

        //[Route("[action]/{SourceTool}/{Category}")]
        [HttpGet("[action]/{Category}")]
        public async Task<ActionResult<List<Backlog>>> GetBacklog(string Category)
        {
            //System.Diagnostics.Debug.WriteLine();
            var cmdText = "GetBacklogByCat @Cat = @c";
            var @params = new[]{
            new SqlParameter("c", Category)};
            List<Backlog> queryResIn = await _context.Backlog.FromSqlRaw(cmdText, @params).ToListAsync<Backlog>();

            return queryResIn;

        }


    }
}
