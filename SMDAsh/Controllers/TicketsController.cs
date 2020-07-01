using System;
using System.Collections.Generic;
using System.Linq;
using AutoQueryable.AspNetCore.Filter.FilterAttributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SMDAsh.Helpers.Params;
using SMDAsh.Models;
using SMDAsh.Models.Charts;
using AutoQueryable;
using SMDAsh.Helpers.Exceptions;
using SMDAsh.Models.Errors;
using System.Globalization;

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

        [HttpGet("[action]/{Category}/{Year}/{Month}"), AutoQueryable]
        public ActionResult<IQueryable> GetBacklog(string Category ,string Year,string Month, bool ByDay = false)

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


            var month = Month.Length == 2 ? Month : Month.Insert(0, "0");
            var queryIn = (from t in _context.Tickets
                           where t.Category.Contains((Category.Equals("all") ? "" : Category))
                           && t.YearIn.Contains((Year.Equals("all") ? "" : Year))
                           select t)
                           .ToList()
                           .Where(
                                t => DateTime.Parse(t.DateSent)
                                .ToString("MM")
                                .Contains((month.Equals("all") ? "" : month)))
                            .OrderBy(t => DateTime.Parse(t.DateSent))
                            .GroupBy(t => (ByDay) ? t.DateSent : t.YearWeekIn)
                            .ToDictionary(g => g.Key, g => new { first = g.First(), count = g.Count() });

            var queryOut = (from t in _context.Tickets
                            where t.Category.Contains((Category.Equals("all") ? "" : Category))
                            && t.YearOut.Contains((Year.Equals("all") ? "" : Year))
                            && t.YearWeekOut != ""
                            select t)
                            .ToList()
                            .Where(
                                t => DateTime.Parse(t.DateClosed)
                                .ToString("MM")
                                .Contains((month.Equals("all") ? "" : month)))
                            .OrderBy(t => DateTime.Parse(t.DateClosed))
                            .GroupBy(t => (ByDay) ? t.DateClosed : t.YearWeekOut)
                            .ToDictionary(g => g.Key, g => new { first = g.First(), count = g.Count() });

            

            List<Backlogs> back = new List<Backlogs>();
            int i = 0;

            int bBacklog = 0;
            foreach (var item in queryIn)
            {
                string sourceTool = item.Value.first.SourceTool;
                string yearWeek = (ByDay)? "":item.Key;
                string day = (ByDay) ? item.Key : "";
                int year = Int16.Parse(item.Value.first.YearIn);
                int week = Int16.Parse(item.Value.first.WeekIn);
                int bIn = item.Value.count;
                int bOut = (queryOut.Keys.Contains((ByDay)?day:yearWeek)) ? queryOut[ByDay ? day : yearWeek].count : 0;
                bBacklog = (i == 0) ? bIn - bOut : bIn - bOut + bBacklog;
                Backlogs b = new Backlogs()
                {
                    SourceTool = sourceTool,
                    YearWeek = yearWeek,
                    Year = year,
                    Week = week,
                    Day = day,
                    In = bIn,
                    Out = bOut,
                    backlog = bBacklog,
                    
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
                                       category = t.First().Category,
                                       assignedToService = t.First().AssignedToService,
                                       application = t.Key,
                                       count = t.Count()
                                   })
                                   .AsQueryable<TicketsAssigned>();
            
            

            return Ok(results);


        }

        [HttpGet("[action]/{Category}/{Year}")]
        [AutoQueryable]
        public ActionResult<IQueryable> BacklogByOwner(string Category, string Year, string exclude)
        {

            List<string> allCategory = CategoryParams.GetAll();
            //bad request error;
            List<BadUrl> lit = new List<BadUrl>();

            if (!allCategory.Contains(Category, StringComparer.OrdinalIgnoreCase) && !Category.Equals("all"))
            {

                BadUrl obj = new BadUrl(Category);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            }

            List<string> excludeApp = new List<string>();
            if(exclude!=null && !exclude.Equals(String.Empty))
            foreach(var item in exclude.Split(","))
            {
                excludeApp.Add(item.Trim());
            }
            

            var back = new List<BacklogByOwner>();
            var query = (from t in _context.Tickets
                         where t.YearWeekIn.Contains((Year.Equals("all") ? "" : Year))
                         && t.Category.Contains((Category.Equals("all") ? "" : Category)) 
                         && t.AssignedToService != "-"
                         && !excludeApp.Contains(t.Application)
                         select t)
                         .OrderByDescending(t => t.YearWeekIn)
                         .Select(t => new {
                             category = t.Category,
                             assignedToService = t.AssignedToService,
                             status = t.Status,
                             application = t.Application,
                             year = t.YearIn,
                             yearWeek = t.YearWeekIn
                         }).ToList();
            var services = query.GroupBy(t => t.assignedToService);
            foreach ( var item in services)
            {
                var service = item.GroupBy(g => g.status);
                
                foreach (var srv in service)
                {
                    BacklogByOwner b = new BacklogByOwner()
                    {
                        category = item.First().category,
                        assignedToService = item.Key,
                        status = srv.Key,
                        countStatus = srv.Count()
                    };
                    back.Add(b);
                }
                
                
                
            }



            return Ok(back.AsQueryable());
        }

        [HttpGet("[action]/{Category}/{Year}/{Week}")]
        [AutoQueryable]
        public ActionResult<IQueryable> SlaByProject(string Category, string Year,string Week)
        {
            List<string> allCategory = CategoryParams.GetAll();
            //bad request error;
            List<BadUrl> lit = new List<BadUrl>();

            if (!allCategory.Contains(Category, StringComparer.OrdinalIgnoreCase) && !Category.Equals("all"))
            {

                BadUrl obj = new BadUrl(Category);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            }

            var query = (from t in _context.Tickets
                         where t.Category.Contains((Category.Equals("all") ? "" : Category))
                         && t.YearOut.Contains((Year.Equals("all") ? "" : Year))
                         && t.WeekOut.Contains((Week.Equals("all") ? "" : Week))
                         select t).ToList();

            var queryOK = query.Where(t => t.SLA == "OK").GroupBy(t => t.Application)
                                   .ToDictionary(g => g.Key.Split(":")[1],
                                   g => new SlaCount() { category = g.First().Category,
                                       year = Year,
                                       application = g.Key.Split(":")[1],
                                       week = Week,
                                       ok = g.Count() });
            var queryKO = query.Where(t => t.SLA == "KO").GroupBy(t => t.Application)
                           .ToDictionary(g => g.Key.Split(":")[1]
                           , g => new SlaCount() { category = g.First().Category, 
                               year = Year, 
                               application = g.Key.Split(":")[1], 
                               week = Week, 
                               ko = g.Count() });
            var okKeys = queryOK.Keys;
            var koKeys = queryKO.Keys;
            foreach (var key in koKeys)
            {
                if (okKeys.Contains(key))
                {
                    queryOK[key].ko = queryKO[key].ko;
                }
                else
                {
                    queryOK.Add(key, queryKO[key]);
                }
            }

            

            return Ok(queryOK.Select(t => t.Value).ToList().OrderBy(t => t.application).AsQueryable());
        }

        [HttpGet("[action]/{Service}/{Year}/")]
        public ActionResult<IQueryable> TicketsByService(string Service, string Year, string exclude)
        {
            List<string> allStatus = StatusParams.GetForTicketsAssigned();
            List<string> allCategory = CategoryParams.GetAllForCharts();
            //bad request error;
            List<BadUrl> lit = new List<BadUrl>();

            if (!AssignedToService.GetAll().Contains(Service, StringComparer.OrdinalIgnoreCase) && !Service.Equals("all"))
            {
                BadUrl obj = new BadUrl(Service);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            }
            if (!_context.Tickets
                .Select(t => DateTime.Parse(t.Update).Year.ToString())
                .Distinct().ToList()
                .Contains(Year, StringComparer.OrdinalIgnoreCase) && !Year.Equals("all"))
            {

                
                BadUrl obj = new BadUrl(Year);
                lit.Add(obj);
                return BadRequest(lit.AsQueryable());
            }

            List<string> excludeApp = new List<string>();
            if (exclude != null && !exclude.Equals(String.Empty))
                foreach (var item in exclude.Split(","))
                {
                    excludeApp.Add(item.Trim());
                }

            var result = new List<TicketsByType>();
            var query = (from t in _context.Tickets
                         where t.AssignedToService.Contains(Service.Equals("all") ? "" : Service) &&
                         allStatus.Contains(t.Status)
                         select t).ToList()
                         .Where(t=> !excludeApp.Contains(t.Application.Split(":")[0]) &&
                         DateTime.Parse(t.Update).ToString("yyyy").Contains(Year.Equals("all") ? "" : Year)
                         )
                        .Select(t => new {
                            t.AssignedToService,
                            t.Category,
                            month = DateTime.Parse(t.Update).ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US")),
                            m = DateTime.Parse(t.Update).Month,
                            year = DateTime.Parse(t.Update).ToString("yyyy")
                        })
                        .OrderBy(t => t.year)
                        .GroupBy(t => t.year);

            foreach (var year in query)
            {

                var entry = new TicketsByType()
                {
                    service = year.First().AssignedToService,
                    year = year.Key
                };

                //key value for quarter
                Dictionary<string, List<MonthStats>> quarters = new Dictionary<string, List<MonthStats>>();

                //list of months stats
                List<MonthStats> months = new List<MonthStats>();
                var monthStats = year.OrderBy(t => t.m).GroupBy(t => t.month);

                //delcalre quarters
                foreach (var month in monthStats)
                {
                    if (month.First().m < 4)
                    {
                        if (!quarters.Keys.Contains("quarter 1"))
                        {
                            quarters.Add("quarter 1", new List<MonthStats>());
                        }
                    }
                    else if (month.First().m < 7)
                    {
                        if (!quarters.Keys.Contains("quarter 2"))
                        {
                            quarters.Add("quarter 2", new List<MonthStats>());
                        }
                    }
                    else if (month.First().m < 10)
                    {
                        if (!quarters.Keys.Contains("quarter 3"))
                        {
                            quarters.Add("quarter 3", new List<MonthStats>());
                        }
                    }
                    else
                    {
                        if (!quarters.Keys.Contains("quarter 4"))
                        {
                            quarters.Add("quarter 4", new List<MonthStats>());
                        }
                    }
                }


                //get months stats
                foreach (var month in monthStats)
                {
                    var mon = new MonthStats() { month = month.Key, m = month.First().m };

                    Dictionary<string, int> catCount = new Dictionary<string, int>();
                    var m = month.GroupBy(t => t.Category);

                    foreach (var c in m)
                    {
                        catCount.Add(c.Key, c.Count());
                    }
                    foreach(var c in allCategory) {
                        if (!catCount.ContainsKey(c)) catCount.Add(c, 0);
                    }
                    
                    mon.categories = catCount.OrderBy(t=>t.Key).ToDictionary(pair => pair.Key, pair => pair.Value);
                    months.Add(mon);
                }

                //afect month to each quarter
                int i = 0;
                int j = 4;
                for (int index = 0; index < quarters.Keys.Count; index++)
                {

                    List<MonthStats> q = new List<MonthStats>();
                    int qtrInt = Int16.Parse(quarters.ElementAt(index).Key.Split(" ")[1]);
                    i = (qtrInt == 1) ? 0
                    : (qtrInt == 2) ? 3
                    : (qtrInt == 3) ? 6 : 9;

                    j = (qtrInt == 1) ? 4
                    : (qtrInt == 2) ? 7
                    : (qtrInt == 3) ? 10 : 13;

                    foreach (var m in months.Where(t => t.m > i && t.m < j))
                    {

                        q.Add(m);

                    }

                    quarters[quarters.ElementAt(index).Key] = q;
                    i += 3;
                    j += 3;
                }

                entry.quarters = quarters;

                result.Add(entry);

            }
            

            return Ok(result.AsQueryable());
        }
    }
}
