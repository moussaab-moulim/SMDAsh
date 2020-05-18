using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SMDAsh.Models;

namespace SMDAsh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {

        private readonly SmDashboardContext _context;
      

        public UploadController(SmDashboardContext context)
        {
            _context = context;
     
        }

        [HttpPost("")]
        public async Task<IActionResult> Upload([FromForm]SourceFile sf)
        {
            // Getting source tool
            string sourcetool = sf.SourceTool;
            // Getting file
            var excelFile = sf.DataFile;

            if (excelFile == null || excelFile.Length == 0)
                return NoContent();
            if (excelFile.Length <= 0)
                return BadRequest("FileNotFound");
            string fileExtension = Path.GetExtension(excelFile.FileName);
               

            int count  = 0;

            if (fileExtension == ".xls" || fileExtension == ".xlsx")
            {

                string filename = Path.Combine("Data", sourcetool + "_" + DateTime.Now.ToString("yyyy-MM-dd_HH-mm") + fileExtension)  ;


                using (var fileStream = new FileStream(filename, FileMode.Create))
                {
                    await excelFile.CopyToAsync(fileStream);

                    try
                    {

                        //Lets open the existing excel file and read through its content . Open the excel using openxml sdk
                        using (SpreadsheetDocument doc = SpreadsheetDocument.Open(fileStream, false))
                        {
                            WorkbookPart wbPart = doc.WorkbookPart;
                            Sheet mysheet = doc.WorkbookPart.Workbook.Sheets.GetFirstChild<Sheet>();
                            Worksheet worksheet = ((WorksheetPart)wbPart.GetPartById(mysheet.Id)).Worksheet;
                            SheetData sheetData = worksheet.GetFirstChild<SheetData>();

                            
                            List<string> keys = new List<string>();
                            /*
                            string text;
                            List<List<string>> secondApproach = new List<List<string>>();

                            foreach (Row r in sheetData.Elements<Row>())
                            {
                                secondApproach.Add(new List<string>());
                                foreach (Cell c in r.Elements<Cell>())
                                {
                                    text = c.CellValue.Text;
                                    secondApproach[secondApproach.Count - 1].Add(text);
                                }
                            }   */
                            for (int i = 0;i< sheetData.ChildElements.Count;i++)
                            {
                                Row row = sheetData.ChildElements[i] as Row;
                                Dictionary<string, string> ligne = new Dictionary<string, string>();

                                
                                for(int j = 0; j< row.ChildElements.Count;j++)
                                {
                                    Cell thecurrentcell = row.ChildElements[j] as Cell ;
                                    /*
                                    if (cellValue != null)
                                    {
                                        //Console.WriteLine(cellValue.Text);
                                        str.Add(cellValue.Text);
                                    }*/
                                    
                                    if(i>3 && j == 21) {
                                        var here = false;
                                    }
                                    string currentcellvalue = string.Empty;
                                    if (thecurrentcell.DataType != null && thecurrentcell.DataType == CellValues.SharedString)
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
                                    else
                                    {
                                        System.Diagnostics.Debug.WriteLine(thecurrentcell.CellValue.Text);
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
                                if (sf.SourceTool.ToLower().Equals("mantis")) { 
                                   var entity= _context.Tickets.Add(new Tickets() { 
                                       TicketID = ligne["Identifiant"],
                                       SourceTool = sourcetool,
                                       AssignedTo = ligne["Assigné à"], DateSent = ligne["Date de soumission"], DateResolved = ligne["Date résolution"], DateClosed = ligne["Clos"], Priority = ligne["Priorité"], P = ligne["P"], Status = ligne["Statut"], Description = ligne["Résumé"], Category = ligne["Catégorie"], WeekIn = ligne["Week in"], WeekOut = ligne["Week out"], YearIn = ligne["Year in"], YearOut = ligne["Year out"], YearWeekIn = ligne["Year / Week in"], YearWeekOut = ligne["Year / Week Out"], SLO = ligne["SLO"], ResolutionDuration = ligne["TimeResol"], SLA = ligne["SLA"], SR = ligne["SR"], Affectation = ligne["Affectation"], MD = ligne["M/D"], Application=ligne["Projet Court"] });
                                        count++;
                                        System.Diagnostics.Debug.WriteLine(entity.State.ToString()+" "+ count);
                                    }
                                    else if (sf.SourceTool.ToLower().Equals("sm9")) {
                                        var entity = _context.Tickets.Add((new Tickets() { TicketID = ligne["ID Incident"], SourceTool = sourcetool, AssignedTo = ligne["Responsable"], DateSent = ligne["Date/Heure d'ouverture"], DateResolved = ligne["Date/Heure de résolution"], DateClosed = ligne["Date/Heure de clôture"], Priority = ligne["Priorité"], P = ligne["P"], Status = ligne["État"], Description = ligne["Titre"], Category = ligne["New Cat"], WeekIn = ligne["week in"], WeekOut = ligne["week out"], YearIn = ligne["year in"], YearOut = ligne["year out"], YearWeekIn = ligne["Year / Week in"], YearWeekOut = ligne["Year / Week Out"], SLO = ligne["Slo"], ResolutionDuration = ligne["Realisation time"], SLA = ligne["SLA"], SR = ligne["SR"], Affectation = ligne["Best effort"], MD = ligne["M/D"], Application = ligne["Application"] }));
                                        count++;
                                        System.Diagnostics.Debug.WriteLine(entity.State.ToString() +" "+count);
                                    }
                                }

                            }
                            // IMPORT TO DATABASE

                            int created = _context.SaveChanges();
                            return Created("File imported successfully",
                                new { name = filename, SourceTool = sourcetool ,RowsInserted = created });
                        }

                        
                    }

                    catch (Exception e)
                    {
                        //throw e;
                        return StatusCode(StatusCodes.Status500InternalServerError,new { errorMessage = e.Message, exception = e.ToString() , innerException=e.InnerException.ToString()});
                    }
                }


                
            }else
            {
                return BadRequest("File type Not Supported: " +fileExtension);
            }
        }
    }
}