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
        public ActionResult<IQueryable> GetBacklog(string Category)

        {

            //System.Diagnostics.Debug.WriteLine();
            //var cmdText = "GetBacklogByCat @Cat";
            //var param = new SqlParameter("@Cat", Category);
            //IQueryable<Backlogs> back = _context.Backlogs.FromSqlRaw(cmdText, param).ToList<Backlogs>().AsQueryable();

            List<string> allCategory = CategoryParams.GetAll();

            //bad request error;
            List<BadUrl> lit = new List<BadUrl>();

            if (!allCategory.Contains(Category, StringComparer.OrdinalIgnoreCase) && !Category.Equals("all"))
            {

                BadUrl obj = new BadUrl(Category);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            }
            

            var queryIn = (from t in _context.Tickets
                           where t.Category.Contains((Category.Equals("all") ? "" : Category))
                           select t).ToList().GroupBy( t =>t.YearWeekIn).ToDictionary(g => g.Key, g => new { first = g.First(), count = g.Count() });
            var queryOut = (from t in _context.Tickets
                            where t.Category.Contains((Category.Equals("all") ? "" : Category)) && t.YearWeekOut != ""
                            select t).ToList().GroupBy(t => t.YearWeekOut).ToDictionary(g => g.Key, g => new { first = g.First(), count = g.Count() });

            

            List<Backlogs> back = new List<Backlogs>();
            int i = 0;

            int bBacklog = 0;
            foreach (var item in queryIn.OrderBy(i => i.Key))
            {
                string sourceTool = item.Value.first.SourceTool;
                string yearWeek = item.Key;
                int year = Int16.Parse(yearWeek.Split("W")[0]);
                int week = Int16.Parse(yearWeek.Split("W")[1]);
                int bIn = item.Value.count;
                int bOut = (queryOut.Keys.Contains(yearWeek)) ? queryOut[yearWeek].count : 0;
                bBacklog = (i == 0) ? bIn - bOut : bIn - bOut + bBacklog;
                Backlogs b = new Backlogs()
                {
                    SourceTool = sourceTool,
                    YearWeek = yearWeek,
                    Year = year,
                    Week = week,
                    In = bIn,
                    Out = bOut,
                    backlog = bBacklog
                };
                back.Add(b);
                i++;

            }

            back.Reverse();

            return Ok(back.AsQueryable());

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

        public ActionResult<IQueryable> BacklogByOwner(string Category, int year)
        {


            return null;
        }
    }
}
