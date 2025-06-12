using Microsoft.EntityFrameworkCore;
using SimpleAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Database Configs
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=DatingApp.db"));


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.

// MiddleWares
app.UseHttpsRedirection();
app.MapControllers();

app.Run();