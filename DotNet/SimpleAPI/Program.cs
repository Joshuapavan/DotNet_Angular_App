using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SimpleAPI.Data;
using SimpleAPI.Interfaces;
using SimpleAPI.Middlewares;
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

// Adding JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var tokenKey = builder.Configuration["TokenKey"] ?? throw new Exception("TokenKey not Found");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.

// MiddleWares
app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

// Autenticatiions and Authorizations
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();