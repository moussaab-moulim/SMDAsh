using AutoQueryable.Extensions.DependencyInjection;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OData.Edm;
using SMDAsh.Models;
using System;

namespace SMDAsh
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // adding entity freameworke context 
            services.AddDbContext<SmDashboardContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("TicketConLocal")));

            services.AddControllersWithViews().AddNewtonsoftJson();

            //odata 
            //services.AddOData();
            //autoqueryable 
            services.AddAutoQueryable();
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
           
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            /* odata 
            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action}/{id?}");
                endpoints.MapControllers();
                //Sendpoints.EnableDependencyInjection();
                endpoints.Select().Filter().OrderBy().Count().MaxTop(null);
                endpoints.MapODataRoute("odata", "api", GetEdmModel());


            });
            */


            
             app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
             
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
        /*
        private IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.Namespace = "sm";
            builder.EntitySet<Tickets>("Tickets");

            var function = builder.EntityType<Tickets>().Collection.Function("BacklogInOut").Returns<Backlogs>();
            function.Parameter<string>("Category");
            //function.Parameter<string>("SourceTool");

            return builder.GetEdmModel();
        }
        */
    }
}
