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
        [HttpGet("[action]/{InOrOut}")]
        public ActionResult<IQueryable> GetWeeks(string InOrOut)
        {
            IQueryable query = null;
            if (InOrOut.Equals("In", StringComparison.OrdinalIgnoreCase))
            {
                query = (from t in _context.Tickets
                         select new { t.WeekIn })
                          .ToList()
                          .Distinct()
                          .OrderBy(t => t.WeekIn).AsQueryable();

            }
            else if (InOrOut.Equals("Out", StringComparison.OrdinalIgnoreCase))
            {
                query = (from t in _context.Tickets
                         select new { t.WeekOut })
                          .ToList()
                          .Distinct()
                          .OrderBy(t => t.WeekOut).AsQueryable();

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