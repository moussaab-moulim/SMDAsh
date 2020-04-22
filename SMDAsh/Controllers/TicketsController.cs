using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SMDAsh.Models;

namespace SMDAsh.Controllers
{

    //[Route("api/[controller]")]
    [ODataRoutePrefix("Tickets")]
    //[ApiController]
    public class TicketsController : ODataController
    {
        private readonly TicketsContext _context;

        public TicketsController(TicketsContext context)
        {
            _context = context;
        }

        

        // GET: api/Tickets
        [EnableQuery(PageSize = 50)]
        [ODataRoute]
        public  ActionResult<IQueryable<Ticket>> GetTickets()
        {
            return  _context.Tickets;
        }

        // GET: api/Tickets/5
        [EnableQuery()]
        [ODataRoute("({id})")]
        public  SingleResult<Ticket> GetTicket([FromODataUri]int id)
        {
            IQueryable<Ticket> ticket = _context.Tickets.Where(p => p.TicketID == id);

            return SingleResult.Create(ticket);
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        

        // DELETE: api/Tickets/5
        [ODataRoute("({id})")]

        public async Task<ActionResult<Ticket>> DeleteTicket([FromODataUri] int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }


        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.TicketID == id);
        }
    }
}
