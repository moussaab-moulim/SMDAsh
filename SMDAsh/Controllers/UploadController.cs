using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMDAsh.Models;

namespace SMDAsh.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UploadController : ControllerBase
    {

        private readonly TicketsContext _context;

        public UploadController(TicketsContext context)
        {
            _context = context;
        }

        [HttpPost("")]
        public IActionResult Student([FromForm]SourceFile sf)
        {
            // Getting source tool
            string sourcetool = sf.SourceTool;
            // Getting file
            var excelFile = sf.file;

            if (sf.file == null || sf.file.Length == 0)
                return NoContent();

            string fileExtension = Path.GetExtension(sf.file.FileName);

            if (fileExtension == ".xls" || fileExtension == ".xlsx")
            {
                var rootFolder = @"D:\Files";
                var fileName = sf.file.FileName;
                var filePath = Path.Combine(rootFolder, fileName);
                var fileLocation = new FileInfo(filePath);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    sf.file.CopyTo(fileStream);
                }

                if (sf.file.Length <= 0)
                    return BadRequest("FileNotFound");

                // mn hna bda lcode dyl t9ra fichier excel




                // fch tbghi t3amar lbase de donnees had lcode li hna ky3amar ligne f table li flabase de données
                _context.Tickets.Add(new Ticket());



            }


            return Ok(new{
                    Status = "success",    
                    Message = "data added successfully"
                });

        }
    }
}