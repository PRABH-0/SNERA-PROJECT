using Microsoft.EntityFrameworkCore;
using Snera_Core.Entities;

namespace Snera_Core.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
    }
}
