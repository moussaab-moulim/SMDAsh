using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMDAsh.Models
{
    public class SourceFile
    {
        public string SourceTool { get; set; }
        public IFormFile file  { get; set; }
    }
}
