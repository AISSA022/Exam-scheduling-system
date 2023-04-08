using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.Models.User;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ExamAttendanceSystemContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("dbcontext"))
            );
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options => options.AddPolicy(name: "ExamSchedOrigins",
  policy =>
  {
      policy.WithOrigins().AllowAnyMethod().AllowAnyHeader();
  }));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
