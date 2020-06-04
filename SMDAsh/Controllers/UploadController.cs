using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SMDAsh.Helpers;
using SMDAsh.Helpers.Exceptions;
using SMDAsh.Helpers.Params;
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


            int count = 0;

            string filename = Path.Combine("Data", sourcetool + "_" + DateTime.Now.ToString("yyyy-MM-dd_HH-mm") + fileExtension);
            //Load excel stream
            using (var stream = new FileStream(filename, FileMode.Create))
            {
                await excelFile.CopyToAsync(stream);
                //excelPack.Load(stream);
            
            using (var excelPack = new ExcelPackage(stream))
            {
                
                //Lets Deal with first worksheet.
                //System.Diagnostics.Debug.WriteLine(excelPack.Workbook.Worksheets.Count);
                var ws = excelPack.Workbook.Worksheets[0];

                // list to save the data of excel as tickets
                List<Tickets> tickets = new List<Tickets>();
                //list to save the first row of data sheet as keys
                List<string> keys = new List<string>();
                foreach (var firstRowCell in ws.Cells[1, 1, 1, ws.Dimension.End.Column])
                {
                    //Get names from first row
                    if (!string.IsNullOrEmpty(firstRowCell.Text))
                    {
                        keys.Add(firstRowCell.Text);
   
                    }
                }
                var startRow = 2;
                var endRow = ws.Dimension.End.Row;
                //Get row details
                for (int rowNum = startRow; rowNum <= endRow; rowNum++)
                {
                    var wsRow = ws.Cells[rowNum, 1, rowNum, keys.Count];
                    Dictionary<string, string> ligne = new Dictionary<string, string>();
                    int j = 0;
                        var endCell = ws.Dimension.End.Column;
                    for(int cellNum = 1; cellNum <= endCell; cellNum++)
                        {
                            var cell = ws.Cells[rowNum, cellNum];
                            string currentcellvalue = cell.Text;
                            ligne.Add(keys[j++], currentcellvalue);
                        }
                    

                    tickets.Add(createNewTicket(ligne, sourcetool));
                    count++;


                }
                // IMPORT TO DATABASE
                _context.AddRange(tickets);
                int created = _context.SaveChanges();
                return Created("File imported successfully", new { name = filename, SourceTool = sourcetool, RowsInserted = created });
            }

        }
        }

        private Tickets createNewTicket(Dictionary<string, string> ligne,string sourcetool)
        {
            if (sourcetool.ToLower().Equals("mantis"))
            {

                return (new Tickets()
                {
                    TicketID = ligne["Identifiant"],
                    SourceTool = sourcetool,
                    AssignedTo = ligne["Assigné à"],
                    DateSent = ligne["Date de soumission"],
                    DateResolved = ligne["Date résolution"],
                    DateClosed = ligne["Clos"],
                    Priority = integrateColumn(ligne["Priorité"], "Priority"),
                    P = integrateColumn(ligne["P"], "P"),
                    Status = integrateColumn(ligne["Statut"], "Status"),
                    Description = ligne["Résumé"],
                    Category = integrateColumn(ligne["Catégorie"], "Category"),
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
                    Application = ligne["Projet Court"] + ":" + ligne["Projet"],
                    AssignedToService = integrateColumn(ligne["Statut"], "AssignedToService"),
                    Update = ligne["Mis à jour"]
                });;


            }
            else if (sourcetool.ToLower().Equals("sm9"))
            {
                return new Tickets()
                {
                    TicketID = ligne["ID Incident"],
                    SourceTool = sourcetool,
                    AssignedTo = ligne["Responsable"],
                    DateSent = ligne["Date/Heure d'ouverture"],
                    DateResolved = ligne["Date/Heure de résolution"],
                    DateClosed = ligne["Date/Heure de clôture"],
                    Priority = integrateColumn(ligne["Priorité"], "Priority"),
                    P = integrateColumn(ligne["P"], "P"),
                    Status = integrateColumn(ligne["État"], "Status"),
                    Description = ligne["Titre"],
                    Category = integrateColumn(ligne["New Cat"], "Category"),
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
                    AssignedToService = integrateColumn(ligne["État"], "AssignedToService")
                };

            }
            else return null;

        }

        private string integrateColumn(string valueToCompare,string destination)
        {
            string finalVal = String.Empty;
            string ligneVal = valueToCompare;

            switch (destination)
            {
                case "Status":
                    finalVal = ligneVal.In("Fermée", "Abondonnée", "closed", "Clôturé") ? StatusParams.ABANDONED
                                                : ligneVal.In("Nouvelle", "Accepté") ? StatusParams.NEW
                                                : ligneVal.In("Prise en charge retours tests", "A tester", "En attente du client") ? StatusParams.TO_BE_TESTED
                                                : ligneVal.In("ETUDE_A_VALIDER", "Queued") ? StatusParams.QUEUED
                                                : ligneVal.In("Queued_first_TEAL", "Prise en charge/Etude de faisabilité SI", "A appliquer en PROD", "A appliquer en RECETTE") ? StatusParams.QUEUED_TEAL
                                                : ligneVal.In("A fermer", "Résolu") ? StatusParams.RESOLVED
                                                : ligneVal.In("") ? StatusParams.EMPTY
                                                : ligneVal.In("Travail en cours", "En cours chez le métier", "En cours DEV SI", "En Cours DEV SI", "En cours chez le prestataire") ? StatusParams.IN_PROCRESS : StatusParams.NOT_CONFIGURED;
                    break;
                case "Category":
                    finalVal = ligneVal.In("incident", "réclamation", "Anomalie") ? CategoryParams.INCIDENT
                    : ligneVal.In("Demande d'extraction", "Demande d'information", "Demande d'accès") ? CategoryParams.SR
                    : ligneVal.In("Evolution") ? CategoryParams.EVOLUTION : CategoryParams.NOT_CONFIGURED;
                    break;
                case "Priority":
                    finalVal = ligneVal.In("basse", "Faible") ? "Faible"
                     : ligneVal.In("normale", "Moyenne") ? "Moyenne"
                     : ligneVal.In("élevée") ? "Elevée"
                     : ligneVal.In("Critique/Elevée", "urgente") ? "Urgente" : "Priority not configured";
                    break;
                case "P":
                    finalVal = ligneVal.In("P1", "1") ? "P1"
                    : ligneVal.In("P2", "2") ? "P2"
                    : ligneVal.In("P3", "3") ? "P3"
                    : ligneVal.In("P4", "4") ? "P4" : "P not configured";
                    break;
                case "AssignedToService":
                    finalVal = ligneVal.In("A appliquer en PROD__", "A appliquer en recette__", "A tester", "Demande de clarification métier",
                                        "En cours chez le métier", "ETUDE_A_VALIDER") ? AssignedToService.OCP
                     : ligneVal.In("SR Oracle en cours") ? AssignedToService.EDITOR
                     : ligneVal.In("A appliquer en RECETTE", "En cours chez le prestataire", "A appliquer en PROD",
                                         "En cours DEV SI", "Prise en charge retours tests", "Prise en charge/Etude de faisabilité SI",
                                         "Nouvelle") ? AssignedToService.TEAL
                     : ligneVal.In("En cours chez le prestataire__") ? AssignedToService.OWNER
                     : ligneVal.In("A fermer", "Fermée", "Abondonnée") ? AssignedToService.EMPTY : AssignedToService.NOT_CONFIGURED;
                    break;


                default:
                    throw new DataIntegrationException(destination,new Exception());
            }

      
            //System.Diagnostics.Debug.WriteLine(ligneVal + " to " + finalVal);

            return finalVal;
        }
    }
}