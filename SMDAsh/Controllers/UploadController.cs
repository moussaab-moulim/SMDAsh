using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SMDAsh.Helpers;
using SMDAsh.Helpers.Exceptions;
using SMDAsh.Helpers.Params;
using SMDAsh.Helpers.Params.digiself;
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
        public IActionResult Upload([FromForm] SourceFile sf)
        {
            // Getting source tool
            string sourcetool = sf.SourceTool;
            // Getting file
            var excelFile = sf.DataFile;
            //getting the sheet number of all data
            var allDataSheet = sf.AllDataSheet;
            //getting the sheet number of sla data
            var slaDataSheet = sf.SlaDataSheet;

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
                excelFile.CopyTo(stream);
                //excelPack.Load(stream);

                using (var excelPack = new ExcelPackage(stream))
                {

                    //Lets Deal with first worksheet.
                    //System.Diagnostics.Debug.WriteLine(excelPack.Workbook.Worksheets.Count);
                    var ws = excelPack.Workbook.Worksheets[allDataSheet-1];

                    // list to save the data of excel as tickets
                    List<Tickets> tickets = new List<Tickets>();
                    //list to save the first row of data sheet as keys
                    List<string> keys = new List<string>();
                    foreach (var firstRowCell in ws.Cells[1, 1, 1, getLastData("all", sourcetool)])
                    {
                        //Get names from first row
                        if (!string.IsNullOrEmpty(firstRowCell.Text))
                        {
                            keys.Add(firstRowCell.Text);

                        }
                    }
                    var startRow = 2;
                    var endRow = sf.AllDataLastRow;
                    //Get row details
                    for (int rowNum = startRow; rowNum <= endRow; rowNum++)
                    {
                        var wsRow = ws.Cells[rowNum, 1, rowNum, keys.Count];
                        Dictionary<string, string> ligne = new Dictionary<string, string>();
                        int j = 0;
                        var endCell = getLastData("all", sourcetool);
                        for (int cellNum = 1; cellNum <= endCell; cellNum++)
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

                    if (sourcetool.Equals("digiself", StringComparison.OrdinalIgnoreCase))
                    {
                        ws = excelPack.Workbook.Worksheets[slaDataSheet - 1];
                        // list to save the data of excel as tickets
                        List<SlaTickets> slaTickets = new List<SlaTickets>();
                        //list to save the first row of data sheet as keys
                        List<string> slakeys = new List<string>();
                        foreach (var firstRowCell in ws.Cells[1, 1, 1, getLastData("sla",sourcetool)])
                        {
                            //Get names from first row
                            if (!string.IsNullOrEmpty(firstRowCell.Text))
                            {
                                slakeys.Add(firstRowCell.Text);

                            }
                        }
                         startRow = 2;
                        endRow = sf.SlaDataLastRow;
                        //Get row details
                        for (int rowNum = startRow; rowNum <= endRow; rowNum++)
                        {
                            var wsRow = ws.Cells[rowNum, 1, rowNum, slakeys.Count];
                            Dictionary<string, string> ligne = new Dictionary<string, string>();
                            int j = 0;
                            var endCell = getLastData("sla", sourcetool);
                            for (int cellNum = 1; cellNum <= endCell; cellNum++)
                            {
                                var cell = ws.Cells[rowNum, cellNum];
                                string currentcellvalue = cell.Text;
                                ligne.Add(slakeys[j++], currentcellvalue);
                            }


                            slaTickets.Add(createSlaTicket(ligne, sourcetool));
                            count++;


                        }
                        _context.AddRange(slaTickets);
                    }
                    
                    int created = _context.SaveChanges();
                    return Created("File imported successfully", new { name = filename, SourceTool = sourcetool, RowsInserted = created });
                }

            }
        }

        private SlaTickets createSlaTicket(Dictionary<string, string> ligne, string sourcetool)
        {
            if (sourcetool.Equals("digiself",StringComparison.OrdinalIgnoreCase))
            {
                System.Diagnostics.Debug.WriteLine(ligne["Parent"]);
                var newSla = new SlaTickets()
                {
                    SlaID = ligne["ID"],
                    SourceTool = sourcetool,
                    DateSent = ligne["Date/Heure de création"],
                    DateClosed = ligne["Date d'accomplissement"],
                    ParentTicketId = ligne["Parent"],
                    Priority = integrateColumn(ligne["Priorité"], "Priority"),
                    Status = ligne["État"],

                    ParentCategory = integrateColumn(ligne["Type de parent"], "Category"),

                    AssignedToService = AssignedToService.TEAL,
                    TargetType = ligne["Type de cible"],
                    Team = ligne["Groupe d'affectation.Nom"],
                    DsAge = Double.Parse(ligne["Durée écoulée (Ouvrée)"], NumberStyles.Number)

                };
                System.Diagnostics.Debug.WriteLine(newSla.ToString());
                return newSla;

                

            }
            return null;
        }

        private int getLastData(string v, string sourcetool)
        {
            if (sourcetool.Equals("mantis", StringComparison.OrdinalIgnoreCase))
            {
                return 45;
            }else if (sourcetool.Equals("sm9", StringComparison.OrdinalIgnoreCase))
            {
                return 29;
            }else if (sourcetool.Equals("digiself", StringComparison.OrdinalIgnoreCase)){
                return v.Equals("sla")?14:28;
            }
            return -1;
        }

        private Tickets createNewTicket(Dictionary<string, string> ligne, string sourcetool)
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
                }); 


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
            else if (sourcetool.ToLower().Equals("digiself"))
            {
                DateTime tempDate;
                var dateSent = DateTime.TryParse(ligne["Date/Heure de création"],out tempDate)?
                    tempDate.ToString("dd/MM/yyyy"):string.Empty;
                var dateClosed = DateTime.TryParse(ligne["Solved time"], out tempDate) ?
                    tempDate.ToString("dd/MM/yyyy") : string.Empty;
                var dateResolved = DateTime.TryParse(ligne["Date/Heure de résolution"], out tempDate) ?
                    tempDate.ToString("dd/MM/yyyy") : string.Empty; ;
                

                var digiselfStatus = DigislefStatusParams.StatusParams();

                
                var dsFormattedStatus = digiselfStatus.ContainsKey(ligne["État"])?(digiselfStatus[ligne["État"]].Equals(DigislefStatusParams.PENDING)?
                    (ligne["Code Achèvement"].Equals(string.Empty)?DigislefStatusParams.PENDING:DigislefStatusParams.RESOLVED_WAIT_USER)
                    : digiselfStatus[ligne["État"]]):string.Empty;
                var dsFormattedIn = dateSent;
                var dsFormattedOut = (integrateColumn(ligne["SLA.Titre"], "Category").Equals(CategoryParams.SR)&& !dateClosed.Equals(string.Empty)?
                    dateClosed:dateResolved);
                var dsAge = (dateResolved.Equals(string.Empty)) ?
                    (DateTime.Today - DateTime.Parse(dsFormattedIn)).TotalDays:
                    (DateTime.Parse(dsFormattedOut) - DateTime.Parse(dsFormattedIn)).TotalDays;
                var isSharepoint = (ligne["Catégorie.Parent de 2e niveau"].Equals("Sharepoint", StringComparison.OrdinalIgnoreCase)) ?
                    true :
                    (ligne["Service.Libellé d'affichage"].Equals("Sharepoint", StringComparison.OrdinalIgnoreCase) ? true :
                    (ligne["Titre"].Contains("Sharepoint", StringComparison.OrdinalIgnoreCase) ?true:false)
                    );
                var yearIn = dsFormattedIn.Equals(string.Empty) ? " " : DateTime.Parse(dsFormattedIn).ToString("yyyy");
                var weekIn = dsFormattedIn.Equals(string.Empty) ? "" : CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                        DateTime.Parse(dsFormattedIn),
                        CalendarWeekRule.FirstDay,
                        DayOfWeek.Monday).ToString();
                var yearOut = dsFormattedOut.Equals(string.Empty) ? "" : DateTime.Parse(dsFormattedOut).ToString("yyyy");
                var weekOut = dsFormattedOut.Equals(string.Empty) ? "" : CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                        DateTime.Parse(dsFormattedOut),
                        CalendarWeekRule.FirstDay,
                        DayOfWeek.Monday).ToString();

                return new Tickets()
                {
                    TicketID = ligne["ID"],
                    SourceTool = sourcetool,
                    AssignedTo = ligne["Responsable.Nom"],
                    DateSent = dateSent,
                    YearIn = yearIn,
                    WeekIn = weekIn,
                    DateResolved = ligne["Date/Heure de résolution"],
                    DateClosed = dateClosed,
                    YearOut = yearOut,
                    WeekOut = weekOut,
                    Priority = integrateColumn(ligne["Priorité"], "Priority"),
                    Status = ligne["État"],
                    Description = ligne["Titre"],
                    Category = integrateColumn(ligne["SLA.Titre"], "Category"),
                    ResolutionDuration = ligne["Elapsed Time for resolution"],
                    Application = ligne["Catégorie.Titre"],
                    AssignedToService = AssignedToService.TEAL,
                    Sharepoint = isSharepoint,
                    // TypeCible = ligne["Type de cible"],
                    CreatedBy = ligne["Créé par.Nom"],
                    TicketEtat = ligne["ID de phase"],
                    Team = ligne["Groupe d'affectation.Nom"],
                    DsFormattedStatus = dsFormattedStatus,
                    DsFormattedInDay = dsFormattedIn,
                    DsFormattedOutDay = dsFormattedOut,
                    DsAge=dsAge
                };

            }
            else return null;

        }

        

        private string integrateColumn(string valueToCompare, string destination)
        {
            string finalVal = String.Empty;
            string ligneVal = valueToCompare;

            switch (destination)
            {
                case "Status":
                    finalVal = ligneVal.In("Fermée", "Abondonnée", "closed", "Clôturé", "RequestStatusRejected") ? StatusParams.ABANDONED
                                                : ligneVal.In("Nouvelle", "Accepté") ? StatusParams.NEW
                                                : ligneVal.In("Prise en charge retours tests", "A tester", "En attente du client", "Additional status") ? StatusParams.TO_BE_TESTED
                                                : ligneVal.In("ETUDE_A_VALIDER", "Queued", "Pending", "RequestStatusPending", "RequestStatusSuspended", "Suspended") ? StatusParams.QUEUED
                                                : ligneVal.In("Queued_first_TEAL", "Prise en charge/Etude de faisabilité SI", "A appliquer en PROD", "A appliquer en RECETTE") ? StatusParams.QUEUED_TEAL
                                                : ligneVal.In("A fermer", "Résolu", "Closed_c", "Resolved_c", "RequestStatusComplete") ? StatusParams.RESOLVED
                                                : ligneVal.In("") ? StatusParams.EMPTY
                                                : ligneVal.In("Travail en cours", "En cours chez le métier", "En cours DEV SI", "En Cours DEV SI", "En cours chez le prestataire", "Open_c", "RequestStatusAssigned_c", "RequestStatusReopened_c", "RequestStatusInProgress", "InProgress") ? StatusParams.IN_PROGRESS
                                                : StatusParams.NOT_CONFIGURED;


                    break;
                case "Category":
                    finalVal = ligneVal.In("incident", "Incident", "réclamation", "Anomalie", "TEAL RUN SERVICES Incident") ? CategoryParams.INCIDENT
                    : ligneVal.In("Demande d'extraction", "Request", "Demande d'information", "Demande d'accès", "TEAL RUN SERVICES Service request", "service request") ? CategoryParams.SR
                    : ligneVal.In("Evolution") ? CategoryParams.EVOLUTION : CategoryParams.NOT_CONFIGURED;
                    break;
                case "Priority":
                    finalVal = ligneVal.In("basse", "4 - Faible", "3 - Faible", "Faible", "LowPriority") ? "Faible"
                     : ligneVal.In("normale", "2 - Moyenne", "3 - Moyenne", "Moyenne", "MediumPriority") ? "Moyenne"
                     : ligneVal.In("élevée", "HighPriority") ? "Elevée"
                     : ligneVal.In("Critique/Elevée", "1 - Critique/Elevée", "urgente", "CriticalPriority") ? "Urgente" : "Priority not configured";
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
                    throw new DataIntegrationException(destination, new Exception());
            }


            //System.Diagnostics.Debug.WriteLine(ligneVal + " to " + finalVal);

            return finalVal;
        }

       }
}