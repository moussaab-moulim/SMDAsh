using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
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
        public async Task<IActionResult> Upload([FromForm]SourceFile sf)
        {
            // Getting source tool
            string sourcetool = sf.SourceTool;
            // Getting file
            var excelFile = sf.file;

            if (excelFile == null || excelFile.Length == 0)
                return NoContent();
            if (excelFile.Length <= 0)
                return BadRequest("FileNotFound");
            string fileExtension = Path.GetExtension(excelFile.FileName);
               

            int count  = 0;

            if (fileExtension == ".xls" || fileExtension == ".xlsx")
            {
                
                string filename = Guid.NewGuid() + fileExtension;
          
                using (var fileStream = new FileStream(filename, FileMode.Create))
                {
                    await excelFile.CopyToAsync(fileStream);

                    try
                    {

                        //Lets open the existing excel file and read through its content . Open the excel using openxml sdk
                        using (SpreadsheetDocument doc = SpreadsheetDocument.Open(fileStream, false))
                        {
                            WorkbookPart wbPart = doc.WorkbookPart;
                            Sheet mysheet = (Sheet)doc.WorkbookPart.Workbook.Sheets.GetFirstChild<Sheet>();
                            Worksheet worksheet = ((WorksheetPart)wbPart.GetPartById(mysheet.Id)).Worksheet;
                            SheetData sheetData = (SheetData)worksheet.GetFirstChild<SheetData>();


                            List<string> keys = new List<string>();
                            for (int i = 0;i< sheetData.ChildElements.Count;i++)
                            {
                                var row = sheetData.ChildElements[i];
                                Dictionary<string, string> ligne = new Dictionary<string, string>();

                                
                                for(int j = 0; j< (row as Row).ChildElements.Count;j++)
                                {
                                    var cell = (row as Row).ChildElements[j];
                                    Cell thecurrentcell = cell as Cell;
                                    /*
                                    if (cellValue != null)
                                    {
                                        //Console.WriteLine(cellValue.Text);
                                        str.Add(cellValue.Text);
                                    }*/
                                    string currentcellvalue = string.Empty;
                                    if (thecurrentcell.DataType != null)
                                    {
                                        if (thecurrentcell.DataType == CellValues.SharedString)
                                        {
                                            int id;
                                            if (Int32.TryParse(thecurrentcell.InnerText, out id))
                                            {
                                                SharedStringItem item = wbPart.SharedStringTablePart.SharedStringTable.Elements<SharedStringItem>().ElementAt(id);
                                                if (item.Text != null)
                                                {
                                                    //code to take the string value  
                                                    currentcellvalue = item.Text.Text;
                                                }
                                                else if (item.InnerText != null)
                                                {
                                                    currentcellvalue = item.InnerText;
                                                }
                                                else if (item.InnerXml != null)
                                                {
                                                    currentcellvalue = item.InnerXml;
                                                }
                                            }
                                        }
                                    }

                                    if (i == 0)
                                    {
                                        keys.Add(currentcellvalue);
                                    }
                                    else
                                    {
                                        
                                            ligne.Add(keys[j], currentcellvalue);


                                    }

                                }
                                
                                if (i != 0) { 
                                if (sf.SourceTool.Equals("MANTIS")) { 
                                _context.Tickets.Add(new Ticket() { ID = ligne["Identifiant"], SourceTool = "MANTIS", AssignedTo = ligne["Assigné à"], DateSent = ligne["Date de soumission"], DateResolved = ligne["Date résolution"], DateClosed = ligne["Clos"], Priority = ligne["Priorité"], P = ligne["P"], Status = ligne["Statut"], Description = ligne["Résumé"], Category = ligne["Catégorie"], WeekIn = ligne["Week in"], WeekOut = ligne["Week out"], YearIn = ligne["Year in"], YearOut = ligne["Year out"], YearWeekIn = ligne["Year / Week in"], YearWeekOut = ligne["Year / Week Out"], SLO = ligne["SLO"], ResolutionDuration = ligne["TimeResol"], SLA = ligne["SLA"], SR = ligne["SR"], Affectation = ligne["Affectation"], MD = ligne["M/D"] });
                                        count++;
                                    }
                                    else if (sf.SourceTool.Equals("SM9")) { 
                                 _context.Tickets.Add((new Ticket() { ID = ligne["ID Incident"], SourceTool = "SM9", AssignedTo = ligne["Responsable"], DateSent = "Date/Heure d'ouverture", DateResolved = "Date/Heure de résolution", DateClosed = "Date/Heure de clôture", Priority = "Priorité", P = "P", Status = "État", Description = "Titre", Category = "New Cat", WeekIn = "week in", WeekOut = "week out", YearIn = "year in", YearOut = "year out", YearWeekIn = "Year / Week in", YearWeekOut = "Year / Week Out", SLO = "Slo", ResolutionDuration = "Realisation time", SLA = "SLA", SR = "SR", Affectation = "Best effort", MD = "M/D" }));
                                        count++;
                                    }
                                }

                            }
                        }
                    }

                    catch (Exception e)
                    {
                        throw e;
                    }
                }


                // IMPORT TO DATABASE
                
               _context.SaveChanges();
            }


            return Ok(new
            {
                Status = "sucess",
                count = count +" row inserted",
            }); ;

        }
    }
}