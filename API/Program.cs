

using System.Reflection.Metadata.Ecma335;
using API;
using API.Middleware;
using Application.Core;
using Applications.Activities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistance;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scoped = app.Services.CreateScope();
var dbService = scoped.ServiceProvider.GetService<DataContext>();

if(dbService != null)
{
    await dbService.Database.MigrateAsync();
    await Seed.SeedData(dbService);
}


app.Run();
