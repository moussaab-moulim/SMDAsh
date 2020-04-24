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
              List<List<string>> list = new List<List<string>>();
           
            string test1 = fileExtension;

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
                            foreach (var row in sheetData.ChildElements)
                            {
                                List<string> str = new List<string>();
                                foreach (var cell in (row as Row).ChildElements)
                                {
                                    var cellValue = (cell as Cell).CellValue;
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
                                    str.Add(currentcellvalue);
                                }
                                list.Add(str);
                            }
                        }
                    }

                    //            //create the object for workbook part  
                    //            WorkbookPart workbookPart = doc.WorkbookPart;
                    //            Sheets thesheetcollection = workbookPart.Workbook.GetFirstChild<Sheets>();
                    //            StringBuilder excelResult = new StringBuilder();

                    //            //using for each loop to get the sheet from the sheetcollection  
                    //            foreach (Sheet thesheet in thesheetcollection)
                    //            {
                    //                excelResult.AppendLine("Excel Sheet Name : " + thesheet.Name);
                    //                excelResult.AppendLine("----------------------------------------------- ");
                    //                //statement to get the worksheet object by using the sheet id  
                    //                Worksheet theWorksheet = ((WorksheetPart)workbookPart.GetPartById(thesheet.Id)).Worksheet;

                    //                SheetData thesheetdata = (SheetData)theWorksheet.GetFirstChild<SheetData>();
                    //                foreach (Row thecurrentrow in thesheetdata)
                    //                {
                    //                    foreach (Cell thecurrentcell in thecurrentrow)
                    //                    {
                    //                        //statement to take the integer value  
                    //                        string currentcellvalue = string.Empty;
                    //                        if (thecurrentcell.DataType != null)
                    //                        {
                    //                            if (thecurrentcell.DataType == CellValues.SharedString)
                    //                            {
                    //                                int id;
                    //                                if (Int32.TryParse(thecurrentcell.InnerText, out id))
                    //                                {
                    //                                    SharedStringItem item = workbookPart.SharedStringTablePart.SharedStringTable.Elements<SharedStringItem>().ElementAt(id);
                    //                                    if (item.Text != null)
                    //                                    {
                    //                                        //code to take the string value  
                    //                                        excelResult.Append(item.Text.Text + " ");
                    //                                    }
                    //                                    else if (item.InnerText != null)
                    //                                    {
                    //                                        currentcellvalue = item.InnerText;
                    //                                    }
                    //                                    else if (item.InnerXml != null)
                    //                                    {
                    //                                        currentcellvalue = item.InnerXml;
                    //                                    }
                    //                                }
                    //                            }
                    //                        }
                    //                        else
                    //                        {
                    //                            excelResult.Append(Convert.ToInt16(thecurrentcell.InnerText) + " ");
                    //                        }
                    //                    }
                    //                    excelResult.AppendLine();
                    //                }
                    //                excelResult.Append("");
                    //                Console.WriteLine(excelResult.ToString());
                    //                Console.ReadLine();
                    //            }
                    //        }

                    catch (Exception e)
                    {
                        throw e;
                    }
                }


                // IMPORT TO DATABASE
            //    _context.Tickets.Add(new Ticket());

            }


            return Ok(new{
                    Status = list[0].ToString(), 
                    count = list
                });

        }
    }
}