using Exam_sch_system_WebApi.Models;
using Exam_sch_system_WebApi.UtilityService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////EmailSend///////////////////////
builder.Services.AddScoped<IEmailServices, EmailService>();
////////////////////////////////////////////////////////////////////////////////////////////////////////
builder.Services.AddAuthentication(x => 
{
    x.DefaultAuthenticateScheme= JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme= JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => 
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretverysecret....")),
        ValidateAudience = false,
        ValidateIssuer=false
    };
});

////////////////////////////////////////////////////////////////////////////////////////////////////////

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());



app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
