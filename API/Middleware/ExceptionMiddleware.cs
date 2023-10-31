using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private RequestDelegate _next;
        private ILogger<ExceptionMiddleware> _logger;
        private IHostEnvironment _hostEnvironment;
        

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment hostEnv)
        {
            this._next = next;
            this._logger = logger;
            this._hostEnvironment = hostEnv;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try{
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var msg = "Internal Server Error";
                var details = _hostEnvironment.IsDevelopment() ? ex.StackTrace : null;

                var error = new AppException(context.Response.StatusCode,msg,details);

                var options = new JsonSerializerOptions(){PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var strError = JsonSerializer.Serialize(error,options);
                await context.Response.WriteAsync(strError);

            }
        }
    }
}