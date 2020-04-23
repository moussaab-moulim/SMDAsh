using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SMDAsh.Models;

namespace SMDAsh.Controllers
{
    //[Route("api/[controller]")]
    [ODataRoutePrefix("Charts")]
    //[ApiController]
    public class ChartsController : ODataController
    {
        private readonly TicketsContext _context;

        public ChartsController(TicketsContext context)
        {
            _context = context;
        }
       
        /*
        [HttpGet]
        public virtual ActionResult<IQueryable<Backlog>> GetBacklogByYearWeek(string Cat, string YearWeek)
        {
            //var catParam = Cat != null ? new ObjectParameter("Cat", Cat) : new ObjectParameter("Cat", typeof(string));
            //var ywParam = Cat != null ? new ObjectParameter("YearWeek", YearWeek) : new ObjectParameter("YearWeek", typeof(string));

            var cmdText = "GetBacklogByYearWeek @Cat = @c, @YearWeek = @yw";
            var @params = new[]{
            new SqlParameter("c", Cat),
            new SqlParameter("yw", YearWeek)};


            var backl = _context.Tickets.FromSqlRaw(cmdText, @params).AsQueryable();
            return Ok(backl);
            //db.Database.SqlQuery<EmployeeSummary>("GetEmployeesSummary").ToList();
            //return this.Tickets.SqlQuery<Ob>("GetBacklogByYearWeek @Cat , @YearWeek",
            //catParam, ywParam);

        }*/


    }
}