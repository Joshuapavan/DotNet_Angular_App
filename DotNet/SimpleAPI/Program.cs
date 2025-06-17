using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;
using SimpleAPI.Interfaces;
using SimpleAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Database Configs
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=DatingApp.db"));


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();

// Adding our own services
builder.Services.AddScoped<ITokenService, TokenService>();


var app = builder.Build();

// Configure the HTTP request pipeline.

// MiddleWares
app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
app.MapControllers();

app.Run();