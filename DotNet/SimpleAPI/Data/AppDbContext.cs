
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Entities;

namespace SimpleAPI.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!;
    }
}