using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMDAsh.Helpers;
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

                            List<Tickets> tickets = new List<Tickets>();
                            List<string> keys = new List<string>();
                            int rowCount = sheetData.ChildElements.Count;
                            for (int i = 0;i< rowCount;i++)
                            {
                                var row = sheetData.ChildElements[i];
                                Dictionary<string, string> ligne = new Dictionary<string, string>();

                                int cellCount = (row as Row).ChildElements.Count;
                                for (int j = 0; j< cellCount;j++)
                                {
                                    var cell = (row as Row).ChildElements[j];
                                    Cell thecurrentcell = cell as Cell;
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
                                               // System.Diagnostics.Debug.WriteLineIf(j == 21, "cell" + j + thecurrentcell.DataType + currentcellvalue);
                                            }
                                        }
                                    }
                                    else
                                    {
                                         currentcellvalue = thecurrentcell.CellValue.ToString();
                                       
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

                                        var Msta = ligne["Statut"].In("Fermée", "Abondonnée", "closed", "Clôturé") ? "Abandonnée"
                                                : ligne["Statut"].In("Nouvelle", "Accepté") ? "Nouvelle"
                                                : ligne["Statut"].In("Prise en charge retours tests", "A tester", "En attente du client") ? "A tester"
                                                : ligne["Statut"].In("ETUDE_A_VALIDER", "Queued") ? "Queued"
                                                : ligne["Statut"].In("Queued_first_TEAL", "Prise en charge/Etude de faisabilité SI", "A appliquer en PROD", "A appliquer en RECETTE") ? "Queued TEAL"
                                                : ligne["Statut"].In("A fermer", "Résolu") ? "Resolved"
                                                : ligne["Statut"].In("") ? "-"
                                                : ligne["Statut"].In("Travail en cours", "En cours chez le métier", "En cours DEV SI", "En cours chez le prestataire") ? "En Cours" : "status not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["Statut"] + " to " + Msta);

                                        var Mats = ligne["Statut"].In("A appliquer en PROD", "A appliquer en recette", "A tester", "Demande de clarification métier",
                                                                    "En cours chez le métier", "ETUDE_A_VALIDER") ? "OCP"
                                                 : ligne["Statut"].In("SR Oracle en cours") ? "Editeur"
                                                 : ligne["Statut"].In("En cours chez le prestataire") ? "Prestataire"
                                                 : ligne["Statut"].In("A fermer", "Fermée", "Abondonnée") ? "-" : "AssignedToService not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["Statut"] + " to " + Mats);

                                        var Mp = ligne["P"].In("P1", "1") ? "P1"
                                                : ligne["P"].In("P2", "2") ? "P2"
                                                : ligne["P"].In("P3", "3") ? "P3"
                                                : ligne["P"].In("P4", "4") ? "P4" : "P not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["P"] + " to " + Mp);

                                       var Mprio = ligne["Priorité"].In("basse", "Faible") ? "Faible"
                                                : ligne["Priorité"].In("normale", "Moyenne") ? "Moyenne"
                                                : ligne["Priorité"].In("élevée") ? "Elevée"
                                                : ligne["Priorité"].In("Critique/Elevée", "urgente") ? "Urgente" : "Priority not configured";
                                       //System.Diagnostics.Debug.WriteLine(ligne["Priorité"] + " to " + Mprio);

                                        var Mcat = ligne["Catégorie"].In("incident", "réclamation", "Anomalie") ? "Anomalie"
                                                : ligne["Catégorie"].In("Demande d'extraction", "Demande d'information", "Demande d'accès") ? "SR"
                                                : ligne["Catégorie"].In("Evolution") ? "Evolution" : "Category not configured";
                                       //System.Diagnostics.Debug.WriteLine(ligne["Catégorie"] + " to " + Mcat);

                                        
                                        tickets.Add(new Tickets() {
                                        TicketID = ligne["Identifiant"], 
                                       SourceTool = sourcetool.ToUpper(), 
                                       AssignedTo = ligne["Assigné à"], 
                                       DateSent = ligne["Date de soumission"], 
                                       DateResolved = ligne["Date résolution"], 
                                       DateClosed = ligne["Clos"], 
                                       Priority = Mprio, 
                                       P = Mp, 
                                       Status = Msta, 
                                       Description = ligne["Résumé"], 
                                       Category = Mcat, 
                                       WeekIn = ligne["Week in"], 
                                       WeekOut = ligne["Week out"], 
                                       YearIn = ligne["Year in"], 
                                       YearOut = ligne["Year out"], 
                                       YearWeekIn = ligne["Year / Week in"], 
                                       YearWeekOut = ligne["Year / Week Out"], 
                                       SLO = ligne["SLO"], 
                                       ResolutionDuration = ligne["TimeResol"], 
                                       SLA = ligne["SLA"], 
                                       SR = ligne["SR"], 
                                       Affectation = ligne["Affectation"], 
                                       MD = ligne["M/D"], 
                                       Application=ligne["Projet Court"],
                                       AssignedToService = Mats });

                            count++;
                                    }
                                    else if (sf.SourceTool.ToLower().Equals("sm9")) {

                                        var Ssta = ligne["État"].In("Fermée", "Abondonnée", "closed", "Clôturé", "A fermer") ? "Abandonnée"
                                                : ligne["État"].In("Nouvelle", "Accepté") ? "Nouvelle"
                                                : ligne["État"].In("Prise en charge retours tests", "A tester", "En attente du client") ? "A tester"
                                                : ligne["État"].In("ETUDE_A_VALIDER", "Queued") ? "Queued"
                                                : ligne["État"].In("Queued_first_TEAL", "Prise en charge/Etude de faisabilité SI", "A appliquer en PROD", "A appliquer en RECETTE") ? "Queued TEAL"
                                                : ligne["État"].In("A fermer", "Résolu") ? "Resolved"
                                                : ligne["État"].In("Travail en cours", "En cours chez le métier", "En cours DEV SI", "En cours chez le prestataire") ? "En Cours" : "status not configured";
                                        
                                        var Sats = ligne["État"].In("A appliquer en PROD__", "A appliquer en recette", "A tester", "Demande de clarification métier",
                                                                    "En cours chez le métier", "ETUDE_A_VALIDER") ? "OCP"
                                                 : ligne["État"].In("SR Oracle en cours") ? "Editeur"
                                                 : ligne["État"].In("En cours chez le prestataire") ? "Presta"
                                                 : ligne["État"].In("A fermer", "Fermée", "Abondonnée") ? "" : "AssignedToService not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["État"] + " to " + Sats);

                                        var Sp = ligne["P"].In("P1", "1") ? "P1"
                                                : ligne["P"].In("P2", "2") ? "P2"
                                                : ligne["P"].In("P3", "3") ? "P3"
                                                : ligne["P"].In("P4", "4") ? "P4" : "P not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["P"] + " to " + Sp);

                                       var Sprio = ligne["Priorité"].In("basse", "3 - Faible", "4 - Faible") ? "Faible"
                                                : ligne["Priorité"].In("normale", "2 - Moyenne") ? "Moyenne"
                                                : ligne["Priorité"].In("1 - Critique/Elevée", "urgente") ? "Urgente" : "Priority not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["Priorité"] + " to " + Sprio);

                                        var Scat = ligne["New Cat"].In("incident", "réclamation", "Anomalie") ? "Anomalie"
                                                : ligne["New Cat"].In("Demande d'extraction", "Demande d'information", "Demande d'accès", "service request") ? "SR"
                                                : ligne["New Cat"].In("") ? ""
                                                : ligne["New Cat"].In("Evolution") ? "Evolution"
                                                : ligne["New Cat"].In("Monitoring") ? "Monitoring"
                                                : ligne["New Cat"].In("EFC") ? "EFC"
                                                : ligne["New Cat"].In("RFC") ? "RFC" : "Category not configured";
                                        //System.Diagnostics.Debug.WriteLine(ligne["New Cat"] + " to " + Scat);


                                        tickets.Add(new Tickets() {
                                            TicketID = ligne["ID Incident"], 
                                            SourceTool = sourcetool.ToUpper(), 
                                            AssignedTo = ligne["Responsable"], 
                                            DateSent = ligne["Date/Heure d'ouverture"], 
                                            DateResolved = ligne["Date/Heure de résolution"], 
                                            DateClosed = ligne["Date/Heure de clôture"], 
                                            Priority = Sprio, 
                                            P = Sp, 
                                            Status = Ssta,
                                            Description = ligne["Titre"], 
                                            Category = Scat, 
                                            WeekIn = ligne["week in"], 
                                            WeekOut = ligne["week out"], 
                                            YearIn = ligne["year in"], 
                                            YearOut = ligne["year out"], 
                                            YearWeekIn = ligne["Year / Week in"], 
                                            YearWeekOut = ligne["Year / Week Out"], 
                                            SLO = ligne["Slo"], 
                                            ResolutionDuration = ligne["Realisation time"], 
                                            SLA = ligne["SLA"], 
                                            SR = ligne["SR"], 
                                            Affectation = ligne["Best effort"], 
                                            MD = ligne["M/D"], 
                                            Application = ligne["Application"],
                                            AssignedToService = Sats});
                                        count++;
                                    }
                                }

                            }
                            // IMPORT TO DATABASE
                            _context.AddRange(tickets);
                            int created = _context.SaveChanges();
                            return Created("File imported successfully", new { name = filename, SourceTool = sourcetool ,RowsInserted = created });
                        }

                    }

                    catch (Exception e)
                    {
                        //throw e;
                        return StatusCode(StatusCodes.Status500InternalServerError,new { 
                            errorMessage = e.Message, exception = e.ToString() ,
                            innerException=e.InnerException.ToString()});
                    }
                }
                
            }else
            {
                return BadRequest("File type Not Supported: " +fileExtension);
            }


        }
    }
}