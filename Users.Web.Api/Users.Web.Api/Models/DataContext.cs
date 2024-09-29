using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace Users.Web.Api.Models
{
    public class DataContext: DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Producto> Productos { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(c => c.Name).IsUnique();
            modelBuilder.Entity<Producto>().HasIndex(c => c.Name).IsUnique();
        }
    }
}
