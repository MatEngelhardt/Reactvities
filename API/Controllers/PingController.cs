using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PingController:BaseApiController
    {
        public IActionResult Ping()
        {
            return Ok(true);
        }
        
    }
}