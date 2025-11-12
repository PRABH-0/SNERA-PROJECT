using Microsoft.EntityFrameworkCore;
using Snera_Core.Entities;
using Snera_Core.Entities.PostEntities;

namespace Snera_Core.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<PostSkills> PostSkills { get; set; }
        public DbSet<UserPost> UserPost { get; set; }
        public DbSet<PostComments> PostComments { get; set; }
        public DbSet<UserPost_Details> UserPost_Details { get; set; }
        public DbSet<UserPost_Roles> UserPost_Roles { get; set; }
        public DbSet<UserPost_Skills> UserPost_Skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
