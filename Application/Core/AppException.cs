using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details=null) 
        {
            this.Message = message;
            this.StatusCode = statusCode;
            this.Details = details;
        }
        
        public int StatusCode {get;set;}
        public string Message {get;set;}
        public string Details {get;set; }
    }
}