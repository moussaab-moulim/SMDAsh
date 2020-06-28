using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoQueryable.AspNetCore.Filter.FilterAttributes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMDAsh.Models;

namespace SMDAsh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltersController : ControllerBase
    {
        private readonly SmDashboardContext _context;

        public FiltersController(SmDashboardContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public ActionResult<IQueryable> GetCategories()
        {
            var query = (from t in _context.Tickets select new { t.Category })
                .ToList()
                .Distinct()
                .OrderBy(t => t.Category);
            return Ok(query.AsQueryable());

        }
        [HttpGet("[action]")]
        public ActionResult<IQueryable> GetServices()
        {
            var query = (from t in _context.Tickets 
                         select new { t.AssignedToService })
                         .ToList().Distinct()
                         .OrderBy(t => t.AssignedToService);
            return Ok(query.AsQueryable());

        }
        [HttpGet("[action]")]
        public ActionResult<IQueryable> GetApplications(bool projectCourt=false)
        {
            int project = projectCourt ? 1 : 0;
            var query = (from t in _context.Tickets 
                         select new { t.Application })
                         .ToList().Select(t=> new {application = t.Application.ToString().Split(":")[project] })
                         .Distinct()
                         .OrderBy(t => t.application);
            return Ok(query.AsQueryable());

        }

        [HttpGet("[action]/{InOrOut}")]
        public ActionResult<IQueryable> GetYears(string InOrOut)
        {
            IQueryable query=null;
            if(InOrOut.Equals("In",StringComparison.OrdinalIgnoreCase))
            {
                query = (from t in _context.Tickets
                         select new { t.YearIn })
                          .ToList()
                          .Distinct()
                          .OrderBy(t => t.YearIn).AsQueryable();

            }else if (InOrOut.Equals("Out", StringComparison.OrdinalIgnoreCase))
            {
                query = (from t in _context.Tickets
                         select new { t.YearOut })
                          .ToList()
                          .Distinct()
                          .OrderBy(t => t.YearOut).AsQueryable();

            }


            return Ok(query);

        }
        [HttpGet("[action]/{year}")]
        public ActionResult<IQueryable> GetWeeks(string year, string InOrOut="In")
        {
            IQueryable query = null;
            if (InOrOut.Equals("In", StringComparison.OrdinalIgnoreCase))
            {
                query = (from t in _context.Tickets
                         where t.YearIn.Contains((year.Equals("all") ? "" : year))
                         && t.YearIn != ""
                         select new { t.YearIn, WeekIn = Int16.Parse(t.WeekIn) })
                          .ToList()
                          .GroupBy(x => x.WeekIn).Select(x => x.FirstOrDefault())
                          .OrderBy(t => t.YearIn).ThenBy(t => t.WeekIn).AsQueryable();

            }
            else if (InOrOut.Equals("Out", StringComparison.OrdinalIgnoreCase))
            {
                query = (from t in _context.Tickets
                             where t.YearOut.Contains((year.Equals("all") ? "" : year))
                             && t.YearOut != ""
                             select new { t.YearOut, WeekOut = Int16.Parse(t.WeekOut) })
                          .ToList()
                          .GroupBy(x => x.WeekOut).Select(x => x.FirstOrDefault())
                          .OrderBy(t => t.YearOut).ThenBy(t => t.WeekOut).AsQueryable();

            }
            else
            {
                BadRequest("wrong parameter");
            }


            return Ok(query);

        }

        [HttpGet("[action]/{year}")]
        public ActionResult<IQueryable> GetUpdateMonths(int year)
        {
            
               var query = (from t in _context.Tickets
                            select new { updateDate = t.Update })
                          .ToList()
                          .Where(t => DateTime.Parse(t.updateDate).Year == year)
                          .Select(t => new { update = DateTime.Parse(t.updateDate).ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US")) })
                          .Distinct()
                          .OrderBy(m => DateTime.ParseExact(m.update, "MMMM", CultureInfo.CreateSpecificCulture("en-US")))
                          .AsQueryable();

           


            return Ok(query);

        }



    }
}