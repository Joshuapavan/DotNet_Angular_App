
using Microsoft.EntityFrameworkCore;
using SimpleAPI.Entities;

namespace SimpleAPI.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserLike> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>()
                .HasKey(key => new { key.SourceUserId, key.TargetUserId });

            builder.Entity<UserLike>()
                .HasOne(source => source.SourceUser)
                .WithMany(like => like.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                .HasOne(source => source.TargetUser)
                .WithMany(like => like.LikedByUsers)
                .HasForeignKey(source => source.TargetUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}